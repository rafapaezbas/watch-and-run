const { join } = require('path')
const { test } = require('brittle')
const Watcher = require('..')
const fs = require('fs/promises')

test('watch and run', async ({ plan, teardown, pass, fail }) => {
  plan(1)

  const file = join(__dirname, 'file.txt')
  const expected = join(__dirname, 'result.txt')
  await fs.writeFile(file, Buffer.alloc(32).toString('hex'))

  const watcher = new Watcher()
  await watcher.watch(file, undefined, 'touch ' + expected)

  teardown(async () => {
    watcher.destroy()
    await fs.unlink(file)
    await fs.unlink(expected)
  })

  watcher.on('update', async (f) => {
    if (await fs.stat(expected)) {
      pass()
    } else {
      fail('File not created')
    }
  })

  setTimeout(async () => {
    await fs.appendFile(file, Buffer.alloc(32).toString('hex'))
  }, 100)
})
