'use strict';

$(document).ready(function () {

  var canvas = $('canvas');
  var context = canvas[0].getContext("2d");

  var draw = function draw(from, to) {
    context.beginPath();
    context.moveTo(from[0], from[1]);
    context.lineTo(to[0], to[1]);
    context.stroke();
  };

  var mouseDown = Rx.Observable.fromEvent(canvas, 'mousedown');
  var mouseUp = Rx.Observable.fromEvent(document, 'mouseup');
  var mouseMoves = Rx.Observable.fromEvent(canvas, "mousemove").map(function (event) {
    return [event.offsetX, event.offsetY];
  }).reduce(function (last, current) {
    console.log(last, current);
    draw(last, current);
    return current;
  });

  var mouseDraw = mouseDown.map(function (mouseDown) {
    return mouseMoves.takeUntil(mouseUp);
  });

  mouseDraw.forEach(function (moveStream) {
    return moveStream.subscribe(function (x) {
      return console.log('Next: ');
    }, function (err) {
      return console.log('Error: ' + err);
    }, function () {
      return console.log('Completed');
    });
  });
});

