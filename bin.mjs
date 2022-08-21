#!/usr/bin/env node

import Watcher from './index.js'

const file = process.argv[2]
const command = process.argv[3]

if (!file || !command) {
  printHelp()
}

const watcher = new Watcher()
await watcher.watch(file, undefined, command)

console.log('Watching ', file)

function printHelp () {
  console.log(`
Watch-and-run v.0.1.0

  Run shell command on file update.

  Usage:
  watch-and-run $file $command

`)
  process.exit(0)
}
