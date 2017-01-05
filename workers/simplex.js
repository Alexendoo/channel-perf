'use strict'

var bc = new BroadcastChannel('bst')

var i = 0

bc.onmessage = function(message) {
  if (++i === 10000) {
    bc.postMessage(null)
    close()
  }
}

postMessage(null)
