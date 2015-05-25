var defaults = require('defaults')
var ctx = require('audio-context')

module.exports = delay

function delay (input, options) {
  var leftDelay = ctx.createDelay()
  var rightDelay = ctx.createDelay()
  var feedback = ctx.createGain()
  var dryMix = ctx.createGain()
  var wetMix = ctx.createGain()
  var output = ctx.createGain()
  var merger = ctx.createChannelMerger(2)

  options = defaults(options, {
    time: 3/8,
    feedback: 0.5,
    wet: 1,
    dry: 1
    // TODO: implement mono
    // stereo: true
  })

  leftDelay.delayTime.value = options.time
  rightDelay.delayTime.value = options.time

  feedback.gain.value = options.feedback
  dryMix.gain.value = options.dry
  wetMix.gain.value = options.wet

  input.connect(dryMix)
  input.connect(feedback)

  feedback.connect(leftDelay)
  leftDelay.connect(rightDelay)
  rightDelay.connect(feedback)

  leftDelay.connect(merger, 0, 0)
  rightDelay.connect(merger, 0, 1)
  merger.connect(wetMix)

  dryMix.connect(output)
  wetMix.connect(output)

  return output
}
