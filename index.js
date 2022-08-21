const { EventEmitter } = require('events')
const { stat } = require('fs/promises')

module.exports = class Watcher extends EventEmitter {
  constructor (opts = {}) {
    super()
    this.watchInterval = opts.watchInterval || 100
    this.intervals = new Map()
    this.destroyed = false
  }

  async watch (file, lastMtimeMs, command) {
    if (this.destroyed) return
    const mtimeMs = (await stat(file)).mtimeMs
    if (mtimeMs > lastMtimeMs) {
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
