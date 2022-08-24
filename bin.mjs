#!/usr/bin/env node

import Watcher from './index.js'

const files = process.argv[2]
const command = process.argv[3]
const output = process.argv.find(a => a === '-o')

if (!files || !command) {
  printHelp()
}

const watcher = new Watcher({ output })

files.split(',').forEach(async (file) => {
  await watcher.watch(file, undefined, command)
  console.log('Watching ', file)
})

function printHelp () {
  console.log(`
Watch-and-run v.0.1.0

  Run shell command on file update.

  Usage:
  watch-and-run $file $command [-o]

  Options:
  -o: Print command output

`)
  process.exit(0)
}
