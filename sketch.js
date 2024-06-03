const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;

var canvas, angle, tower, ground, cannon;
var score = 0;

var balls = [];
var invaders = [];




function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);
  angle = 15;

  var options = {
    isStatic: true
  }

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  tower = Bodies.rectangle(160, 360, 160, 310, options);
  World.add(world, tower);

  cannon = new Cannon(190, 140, 130, 100, angle);
  cannonBall = new CannonBall(cannon.x, cannon.y);

}

function draw() {

  image(backgroundImg, 0, 0, width, height);
  Engine.update(engine);

  showInvaders();
  
  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i]);
  }

  cannon.display();
  rect(ground.position.x, ground.position.y, width * 2, 1);
  push();
  imageMode(CENTER);
  image(towerImage, tower.position.x, tower.position.y, 160, 310);
  pop();


}

function showInvaders() {
  if (invaders.length > 0) {
    if (invaders[invaders.length - 1] === undefined ||
      invaders[invaders.length - 1].body.position.x < width - 300) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var invader = new Invaders(width - 79, height - 60, 70, 90, position);
      invaders.push(invader);
    }
    for (var i = 0; i < invaders.length; i++) {
      if (invaders[i]) {
        Matter.Body.setVelocity(invaders[i].body, {
          x: -0.9,
          y: 0
        });

        invaders[i].display();
      }
    }
  } else {
    var invader = new Invaders(width - 79, height - 60, 70, 90, -80);
    invaders.push(invader);
  }
}

function keyPressed() {
  if (keyCode == DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball) {
  if (ball) {
    ball.display();
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}