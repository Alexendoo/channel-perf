'use strict'

var bc = new BroadcastChannel('broadcast-half-duplex')

bc.onmessage = function() {
  bc.postMessage('moo')
}

postMessage(null)
