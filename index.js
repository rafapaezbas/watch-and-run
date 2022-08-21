const { EventEmitter } = require('events')
const { stat } = require('fs/promises')
const { exec } = require('child_process')
const { join, isAbsolute } = require('path')

module.exports = class Watcher extends EventEmitter {
  constructor (opts = {}) {
    super()
    this.watchInterval = opts.watchInterval || 100
    this.intervals = new Map()
    this.destroyed = false
  }

  async watch (file, lastMtimeMs, command) {
    if (this.destroyed) return
    const path = isAbsolute(file) ? file : join(process.env.PWD, file)
    const mtimeMs = (await stat(path)).mtimeMs
    if (mtimeMs > lastMtimeMs) {
      exec(command)
      this.emit('update', file)
    }
    this.intervals.set(file, setTimeout(async () =>
      await this.watch(file, mtimeMs, command), this.watchInterval))
  }

  destroy () {
    this.destroyed = true
    if (this.interval) clearInterval(this.interval)
  }
}
