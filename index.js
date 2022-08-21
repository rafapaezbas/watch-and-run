const { EventEmitter } = require('events')
const { stat } = require('fs/promises')
const { exec } = require('child_process')
const { join, isAbsolute } = require('path')

module.exports = class Watcher extends EventEmitter {
  constructor (opts = {}) {
    super()
    this.watchInterval = opts.watchInterval || 1000
    this.destroyed = false
    this.output = !!opts.output
  }

  async watch (file, lastMtimeMs, command) {
    if (this.destroyed) return
    const path = isAbsolute(file) ? file : join(process.env.PWD, file)
    const mtimeMs = (await stat(path)).mtimeMs
    if (mtimeMs > lastMtimeMs) {
      exec(command, (err, stdout, stderr) => {
        if (!this.output) return
        if (err) console.log(err)
        if (stdout) console.log(stdout)
        if (stderr) console.log(stderr)
      })
      this.emit('update', file)
    }
    setTimeout(async () => await this.watch(file, mtimeMs, command), this.watchInterval)
  }

  destroy () {
    this.destroyed = true
  }
}
