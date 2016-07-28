var delta = 15,
    delta1 = 15;
var stage = new Kinetic.Stage({
    container: 'mycanvas',
    width: 500,
    height: 500,
    border: '1px'
});
var layer = new Kinetic.Layer();
var layer1 = new Kinetic.Layer();
var rect = new Kinetic.Rect({
    x: 50,
    y: 50,
    width: 75,
    height: 75,
    fill: 'blue',
    stroke: 'black'
});
var circle = new Kinetic.Circle({
    x: 110,
    y: 110,
    radius: 50,
    fill: 'red',
    stroke: 'purple'
});

function animFrame() {
    requestAnimationFrame(animFrame);
    if (circle.getX() >= 490 || circle.getX() <= 10) {
        delta = delta * -1;
    }
    circle.setX(circle.getX() + delta);
    layer1.draw();
    if (rect.getY() >= 480 || rect.getY() <= 20) {
        delta1 = delta1 * -1;
    }
    rect.setY(rect.getY() + delta1);
    layer.draw();
}
animFrame();
layer.add(rect);
layer1.add(circle);
stage.add(layer1);
stage.add(layer);
