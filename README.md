# Watch-and-Run

Javascript utility to watch a file and run command on update.

### Installation

``` bash
npm install -g watch-and-run
``` 

### Usage

``` bash
npm install -g watch-and-run
watch-and-run help
: '
Watch-and-run v.0.1.0

  Run shell command on file update.

  Usage:
  watch-and-run $file $command [-o]

  Options:
  -o: Print command output
'
watch-and-run index.html 'echo "updated"' -o
```

### Test

``` bash
npm test
``` 

