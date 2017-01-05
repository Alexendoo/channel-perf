'use strict'

function broadcastSimplexTx() {
  var worker = new Worker('workers/simplex.js')
  var bc = new BroadcastChannel('bst')

  worker.onmessage = function() {
    var start = performance.now()
    for (var i = 0; i < 10000; i++) {
      bc.postMessage('moo')
    }
    console.log(performance.now() - start)

    bc.onmessage = function(message) {
      console.log(performance.now() - start)
      bc.close()
    }
  }
}

function broadcastHalfDuplex() {
  var worker = new Worker('workers/broadcast-half-duplex.js')
  var bc = new BroadcastChannel('broadcast-half-duplex')
  var start

  worker.onmessage = function() {
    start = performance.now()
    bc.postMessage('moo')
  }

  var i = 0
  bc.onmessage = function() {
    if (++i >= 10000) {
      console.log(performance.now() - start)
      bc.close()
      worker.terminate()
      return
    }
    bc.postMessage('moo')
  }
}

function halfDuplex() {
  var worker = new Worker('workers/half-duplex.js')

  var start
  var i = 0
  worker.onmessage = function() {
    if (i++ === 0) {
      start = performance.now()
    }
    if (i >= 10000) {
      console.log(performance.now() - start)
      worker.terminate()
      return
    }
    worker.postMessage('moo')
  }
}
