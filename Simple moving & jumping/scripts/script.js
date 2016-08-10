var deltax = 8,
    deltay = -5,
    directionX = 1,
    directionY = 1,
    jumpHeight = 100,
    positionY,
    CanJump = true,
    gravity = 5;

var stage = new Kinetic.Stage({
    container: 'mycanvas',
    width: 800,
    height: 600,
    border: '1px'
});

var layer = new Kinetic.Layer();
var floorslayer = new Kinetic.Layer();

/* Background */
floorslayer.add(new Kinetic.Rect({
        x: 0,
        y: 500,
        width: 400,
        height: 2,
        fill: 'green'
    }),
    new Kinetic.Rect({
        x: 350,
        y: 550,
        width: 550,
        height: 2,
        fill: 'green'
    }),
    new Kinetic.Rect({
        x: 0,
        y: 200,
        width: 400,
        height: 2,
        fill: 'green'
    }),
    new Kinetic.Rect({
        x: 250,
        y: 300,
        width: 500,
        height: 2,
        fill: 'green'
    }));

/* Main hero */
var skoklio = new Kinetic.Rect({
    x: 10,
    y: 100,
    width: 10,
    height: 10,
    fill: 'red'
});

layer.add(skoklio);
stage.add(layer);
stage.add(floorslayer);

/* Move Left & Right */
function move() {
    skoklio.setX(skoklio.getX() + (deltax * directionX));
    layer.draw();
    Gravitation();
}

var falling = false;
/* Jumping */
function jumpSkoklio() {
    if (directionY != 0) {
        if (positionY - jumpHeight > skoklio.getY()) {
            directionY *= -1;
            falling = true;
        }
        skoklio.setY(skoklio.getY() + (deltay * directionY));
        skoklio.setX(skoklio.getX() + (deltax * directionX) / 2);
        layer.draw();
        if (positionY > skoklio.getY()) {
            CanJump = false;
            requestAnimationFrame(jumpSkoklio);
            if (falling) {
                floorslayer.find('Rect').forEach(function(floor) {
                    if (collides(skoklio, floor) == 'bot') {
                        console.log('new floor');
                        directionY = 0;
                        falling = false;
                    }
                });
            }
            //  falling = false;
        } else {
            CanJump = true;
            //  deltay *= -1;
            positionY = skoklio.getY();
            Gravitation();
            falling = false;
        }
      //  console.log('falling = ' + falling);
    } else {
        CanJump = true;
    }
}

/* Controls */
window.onkeydown = function(ev) {
    if (ev.keyCode === 68 & CanJump) {
        directionX = 1;
        move();
    } else if (ev.keyCode === 87 & CanJump) {
        positionY = skoklio.getY();
        directionY = 1;
        jumpSkoklio();
    } else if (ev.keyCode === 65 & CanJump) {
        directionX = -1;
        move();
    }
};

/* Checks for coliding*/
function collides(a, b) {
    var aLeft = a.getX(),
        aRight = a.getX() + a.getWidth(),
        aTop = a.getY(),
        aBot = a.getY() + a.getHeight();

    var bLeft = b.getX(),
        bRight = b.getX() + b.getWidth(),
        bTop = b.getY(),
        bBot = b.getY() + b.getHeight();

    if (aBot == bTop) {
        if ((aLeft >= bLeft && aLeft <= bRight) || (aRight >= bLeft && aRight <= bRight)) {
            return "bot";
        }
    }

    if (aLeft >= bLeft && aLeft <= bRight) {
        if ((aBot >= bTop && aBot <= bBot) || (aTop >= bTop && aTop <= bBot)) {
            return "left";
        }
    }

    if (aRight >= bLeft && aRight <= bRight) {
        if ((aBot >= bTop && aBot <= bBot) || (aTop >= bTop && aTop <= bBot)) {
            return "right";
        }
    }
    return '';
}

/* Gravity simulation */
var onGround;

function Gravitation() {
    onGround = false;
    floorslayer.find('Rect').forEach(function(floor) {
        if (collides(skoklio, floor) == 'bot') {
            onGround = true;
            //  console.log(onGround);
            CanJump = true;
        }
    });
    if (!onGround) {
        //  console.log(onGround);
        skoklio.setY(skoklio.getY() + gravity);
        layer.draw();
        requestAnimationFrame(Gravitation);
        CanJump = false;
    }
}
Gravitation();

function checkForNewFloor(arguments) {

}

function reset() {
    if (skoklio.getY() > 800) {
        skoklio.setY(10);
        skoklio.setX(10);
    }
    layer.draw();
    requestAnimationFrame(reset);
}
reset();
