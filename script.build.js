'use strict';

$(document).ready(function () {

  var canvas = $('canvas');
  var context = canvas[0].getContext("2d");

  var draw = function draw(from, to) {
    if (to === null || from === null) {
      return;
    }
    context.beginPath();
    context.moveTo(from[0], from[1]);
    context.lineTo(to[0], to[1]);
    context.stroke();
  };

  var mouseDown = Rx.Observable.fromEvent(canvas, 'mousedown');
  //return null to segment mouseDraw stream
  var mouseUp = Rx.Observable.fromEvent(document, 'mouseup').map(function () {
    return null;
  });
  var mouseMoves = Rx.Observable.fromEvent(canvas, "mousemove").map(function (event) {
    return [event.offsetX, event.offsetY];
  });

  var mouseDraw = mouseDown.selectMany(function () {
    return mouseMoves.takeUntil(mouseUp)
    //segment with null values
    .merge(mouseUp);
  });
  // this works but I don't like the side effect being tied to the observable
  // seems like an anti pattern

  // .reduce((last, current) => {
  //   console.log('last:', last, 'current', current);
  //   draw(last, current);
  //   return current;
  // });

  var from = null;
  mouseDraw.subscribe(function (to) {
    draw(from, to);
    from = to;
    console.log(to);
  });
});

