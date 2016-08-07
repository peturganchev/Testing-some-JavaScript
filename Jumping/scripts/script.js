var deltax = 8,
    deltay = -5,
    directionX = 1,
    directionY = -1,
    jumpHeight = 100,
    positionY,
    CanJump = true;

var stage = new Kinetic.Stage({
    container: 'mycanvas',
    width: 800,
    height: 600,
    border: '1px'
});

var layer = new Kinetic.Layer();
var bglayer = new Kinetic.Layer();

/* Background */
var floor = new Kinetic.Rect({
    x: 0,
    y: 550,
    width: 700,
    height: 50,
    fill: 'green'
})

/* Main hero */
var skoklio = new Kinetic.Circle({
    x: 10,
    y: 540,
    radius: 10,
    fill: 'blue'
});
bglayer.add(floor);
layer.add(skoklio);
stage.add(layer);
stage.add(bglayer);

/* Move Left & Right */
function move() {
    skoklio.setX(skoklio.getX() + (deltax * directionX));
    layer.draw();
}

/* Jumping */
function jumpSkoklio(finishedCallback) {
    if (positionY - jumpHeight > skoklio.getY()) {
        deltay *= -1;
    }
    skoklio.setY(skoklio.getY() + (deltay));
    skoklio.setX(skoklio.getX() + (deltax * directionX)/5);
    layer.draw();
    if (positionY > skoklio.getY()) {
        CanJump = false;
        requestAnimationFrame(jumpSkoklio);
    } else {
        CanJump = true;
        deltay *= -1;
        positionY = skoklio.getY();
    }
}

window.onkeydown = function(ev) {
    if (ev.keyCode === 68) {
        directionX = 1;
        move();
    } else if (ev.keyCode === 87 & CanJump) {
        positionY = skoklio.getY();
        jumpSkoklio();
    } else if (ev.keyCode === 65) {
        directionX = -1;
        move();
    }
};
