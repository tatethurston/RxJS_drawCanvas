$(document).ready(() => {

  var canvas = $('canvas');
  var context = canvas[0].getContext("2d");

  var draw = function (from, to) {
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
  var mouseUp = Rx.Observable.fromEvent(document, 'mouseup')
    .map(() => null);
  var mouseMoves = Rx.Observable.fromEvent(canvas, "mousemove")
    .map((event) => [event.offsetX, event.offsetY]);


  var mouseDraw = mouseDown.selectMany(() => mouseMoves
      .takeUntil(mouseUp)
      //segment with null values
      .merge(mouseUp)
    )
    // this works but I don't like the side effect being tied to the observable
    // seems like an anti pattern

  // .reduce((last, current) => {
  //   console.log('last:', last, 'current', current);
  //   draw(last, current);
  //   return current;
  // });

  var from = null;
  mouseDraw.subscribe(to => {
    draw(from, to);
    from = to;
    console.log(to);
  });

});
