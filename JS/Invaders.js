class Invaders{
    constructor(x, y, width, height, invasorPos){
        this.body = Bodies.rectangle(x, y, width, height);
        this.width = width;
        this.height = height;

        this.image = loadImage("./assets/1.png");
        this.InvasorPosition = invasorPos;
        World.add(world, this.body);
    }
       
      display() {
        var angle = this.body.angle;
        var pos = this.body.position;
    
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0, this.invasorPos, this.width, this.height);
        pop();
      }
}