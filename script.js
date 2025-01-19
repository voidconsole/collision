
class Vector {
    constructor(x, y, m = 1) {
      this.x = x;
      this.y = y;
      this.m = m;
    }

    add(v, magX = 1, magY = 1) {
      this.x += v.x * this.m * magX;
      this.y += v.y * this.m * magY;
    }
    sub(v, magX = 1, magY =1) {
        this.x -= v.x * this.m * magX;
        this.y -= v.y * this.m * magY;
      }
  }


var programCode = function (processingInstance) {
  with (processingInstance) {
    size(window.innerWidth, window.innerHeight);
    frameRate(30);
    function dist(a,b){
        return Math.floor(((a.position.x-b.position.x)**2 + (a.position.y-b.position.y)**2)**(1/2))
    }
    class Particle {
      constructor(size, position, velocity) {
        this.size = size;
        this.position = position;
        this.velocity = velocity;
        this.reverseX = false;
        this.reverseY = false;

      }
      display() {
        // text(this.position.x, this.position.x,this.position.x)
        ellipse(this.position.x, this.position.y, this.size, this.size);
      }

      move() {
        if (this.position.x > 1000) {
            this.reverseX = true;
          } else if (this.position.x < 0) {
            this.reverseX = false;
          }
         let magX = this.reverseX ? -1 : 1;


          if (this.position.y > 1000) {
            this.reverseY = true;
          } else if (this.position.y < 0) {
            this.reverseY = false;
          }
          let magY = this.reverseY ? -1 : 1;
          this.position.add(this.velocity,magX, magY);
      }
      collide(other){
        // console.log(dist(this,other))
        if (dist(this, other) < this.size/2 + other.size/2){
            other.velocity.add(this.velocity);
            this.velocity.sub(other.velocity);
            console.log('bingo')
        }
      }
    }

    v1 = new Vector(10, 0);
    d1 = new Vector(100, 500);
    p1 = new Particle(100, d1, v1);
    v2 = new Vector(5, -2);
    d2 = new Vector(200, 700);
    p2 = new Particle(100, d2, v2);
    draw = function () {
      background(0, 0, 0);
      p1.display();
      p1.move();
      p2.display();
      p2.move();
      p1.collide(p2);
    };
  }
};

// Get the canvas that ProcessingJS will use
var canvas = document.getElementById("mycanvas");
// Pass the function to ProcessingJS constructor
var processingInstance = new Processing(canvas, programCode);
