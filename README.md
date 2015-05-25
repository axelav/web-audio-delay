# web audio delay

## usage

``` js
var ctx = require('audio-context')
var delay = require('./index.js')

var oscillator = ctx.createOscillator()
var processed = delay(oscillator, {time: 5/8, feedback: 0.7})

oscillator.start(ctx.currentTime)
oscillator.stop(ctx.currentTime + 0.5)

processed.connect(ctx.destination)
```
