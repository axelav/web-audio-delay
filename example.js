var ctx = require('audio-context')
var delay = require('./index.js')

var input = ctx.createGain()

// basic example

var processed = delay(input)

// more examples

// var processed = delay(input, {time: 1/8})
// var processed = delay(input, {time: 5/8, feedback: 0.2})
// var processed = delay(input, {time: 5/8, feedback: 0.9})
// var processed = delay(input, {dry: 0})

processed.connect(ctx.destination)

setInterval(function () {
  play(1/8, 12, 0.5)
  play(1/8, 0, 0.5)
  play(3/8, 7, 0.5)
  play(5/8, 3, 0.5)
}, 1000)

function play (start, pitch, duration) {
  var time = ctx.currentTime + start
  var oscillator = ctx.createOscillator()
  var envelope = ctx.createGain()

  oscillator.type = 'sine'
  oscillator.detune.value = pitch * 100

  oscillator.start(time)
  oscillator.stop(time + duration)

  envelope.gain.value = 0
  envelope.gain.setTargetAtTime(1, start, 0.1)
  envelope.gain.setTargetAtTime(0, time, 0.2)

  oscillator.connect(envelope)
  envelope.connect(input)
}
