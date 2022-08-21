const { join } = require('path')
const { test } = require('brittle')
const Watcher = require('..')
const fs = require('fs/promises')

test('watch file', async ({ plan, teardown, pass }) => {
  plan(1)

  const file = join(__dirname, 'file.txt')
  await fs.writeFile(file, Buffer.alloc(32).toString('hex'))

  const watcher = new Watcher()
  await watcher.watch(file)

  teardown(async () => {
    watcher.destroy()
    await fs.unlink(file)
  })

  watcher.on('update', (f) => {
    pass()
  })

  setTimeout(async () => {
    await fs.appendFile(file, Buffer.alloc(32).toString('hex'))
  }, 100)
})

