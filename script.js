$(document).ready(() => {

  var canvas = $('canvas');
  var context = canvas[0].getContext("2d");

  var draw = function (from, to) {
    context.beginPath();
    context.moveTo(from[0], from[1]);
    context.lineTo(to[0], to[1]);
    context.stroke();
  };

  var mouseDown = Rx.Observable.fromEvent(canvas, 'mousedown');
  var mouseUp = Rx.Observable.fromEvent(document, 'mouseup');
  var mouseMoves = Rx.Observable.fromEvent(canvas, "mousemove")
    .map((event) => [event.offsetX, event.offsetY])
    .reduce((last, current) => {
      console.log(last, current);
      draw(last, current);
      return current;
    });

  var mouseDraw = mouseDown.map((mouseDown) => mouseMoves.takeUntil(mouseUp))

  mouseDraw.forEach(moveStream =>
    moveStream.subscribe(
      x => console.log('Next: '),
      err => console.log('Error: ' + err), () => console.log('Completed')
    )
  );

});
