const cellSize = 30;
const SIZE = 50;
const fill = "#E0C3FC";

const lerp = (x, y, a) => x * (1 - a) + y * a;

let canvas;
let ctx;
let stage;
let output;

let numCirclesX;
let numCirclesY;
let circles;

let circle1;
let circle2;

let pointA;
let pointB;

function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    stage = new createjs.Stage("canvas");
    stage.enableMouseOver(10);
    // For mobile devices.
    createjs.Touch.enable(stage);
    // this lets our drag continue to track the mouse even when it leaves the canvas:
    // play with commenting this out to see the difference.
    stage.mouseMoveOutside = true;

    handleResize();
}

function addCircle(x, y, r, fill) {
    let circle = new createjs.Shape();
    circle.graphics.beginFill(fill).drawCircle(0, 0, r);
    circle.x = x;
    circle.y = y;
    circle.name = "circle";
    stage.addChild(circle);
    return circle;
}
function makeCircles() {
    circles = [];
    for (let i = 0; i < numCirclesY; i += 1) {
        for (let j = 0; j < numCirclesX; j += 1) {
            const circle = addCircle(
                j * cellSize + cellSize * 0.5,
                i * cellSize + cellSize * 0.5,
                2,
                fill
            );
            circles.push(circle);
        }
    }
}

function addControl(x, y) {
    let control = addCircle(x,y,10,"black");
    control.on("pressmove", drag);
    control.cursor = "grab";
    control.graphics.endFill();
    control.graphics.setStrokeStyle(1);
    control.graphics.beginStroke("#FFFFFF");
    control.graphics.drawCircle(0,0,10);
    return control;
}

function loop() {
    circles.forEach((circle) => {
        let p = new createjs.Point(circle.x, circle.y);
        let A = new createjs.Point(pointA.x, pointA.y);
        let B = new createjs.Point(pointB.x, pointB.y);
        
        let projection = project(p,A,B);

        let r = lerp(0,21,projection.t);
        
        circle.graphics.clear();
        circle.graphics.beginFill(fill).drawCircle(0, 0, r);
    });
}

function drag(evt) {
    // target will be the container that the event listener was added to
    evt.target.x = evt.stageX;
    evt.target.y = evt.stageY;

    loop();
    // make sure to redraw the stage to show the change
    stage.update();
}
function sizeCanvas() {
    // const dpr = window.devicePixelRatio || 1;
    // const canvasRect = canvas.getBoundingClientRect();
    // canvas.width = canvasRect.width * dpr;
    // canvas.height = canvasRect.height * dpr;
    // ctx.scale(dpr, dpr);
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;
}
function handleResize() {
    stage.removeAllChildren();
    sizeCanvas();
    numCirclesX = Math.ceil(innerWidth / cellSize);
    numCirclesY = Math.ceil(innerHeight / cellSize);
    makeCircles();
    pointA = addControl(canvas.width / 3, canvas.height / 5);
    pointB = addControl(2 * canvas.width / 3, 4 * canvas.height / 5);
    loop();
    stage.update();
}
window.addEventListener("resize", throttled(handleResize));

// USEFUL FUNCTIONS ----------
function throttled(fn) {
    let didRequest = false;
    return (param) => {
        if (!didRequest) {
            window.requestAnimationFrame(() => {
                fn(param);
                didRequest = false;
            });
            didRequest = true;
        }
    };
}
function project( p, a, b ) {
    
    var atob = { x: b.x - a.x, y: b.y - a.y };
    var atop = { x: p.x - a.x, y: p.y - a.y };
    var len = atob.x * atob.x + atob.y * atob.y;
    var dot = atop.x * atob.x + atop.y * atob.y;
    var t = Math.min( 1, Math.max( 0, dot / len ) );

    dot = ( b.x - a.x ) * ( p.y - a.y ) - ( b.y - a.y ) * ( p.x - a.x );
    
    return {
        point: {
            x: a.x + atob.x * t,
            y: a.y + atob.y * t
        },
        left: dot < 1,
        dot: dot,
        t: t
    };
}