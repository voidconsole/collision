class Vector {
    constructor(x, y, m = 1) {
        this.x = x
        this.y = y
        this.m = m
    }
    divi(v, magX = 1, magY = 1) {
        this.x = (this.x / v.x) * this.m * magX
        this.y = (this.y / v.y) * this.m * magY
    }
    add(v, magX = 1, magY = 1) {
        this.x += v.x * this.m * magX
        this.y += v.y * this.m * magY
    }
    sub(v, magX = 1, magY = 1) {
        this.x -= v.x * this.m * magX
        this.y -= v.y * this.m * magY
    }
    handleCollision(rel) {
        this.x = -(this.x - rel.x)
        this.y = -(this.y - rel.y)
    }
    inverse = () => new Vector(-this.x, -this.y, this.m)
    copy() {
        return new Vector(this.x, this.y, this.m)
    }
}

var programCode = function (processingInstance) {
    with (processingInstance) {
        size(window.innerWidth, window.innerHeight)
        frameRate(30)
        function dist(a, b) {
            return Math.floor(
                ((a.position.x - b.position.x) ** 2 +
                    (a.position.y - b.position.y) ** 2) **
                    (1 / 2)
            )
        }
        class Particle {
            constructor(size, position, velocity) {
                this.size = size
                this.position = position
                this.velocity = velocity
                this.color = color(random(255), random(255), random(255))
            }
            display() {
                // text(this.position.x, this.position.x,this.position.x)
                ellipse(this.position.x, this.position.y, this.size, this.size)
                fill(this.color)
            }

            move() {
                if (
                    this.position.x > window.innerWidth ||
                    this.position.x < 0
                ) {
                    this.velocity.x = -this.velocity.x
                }
                if (
                    this.position.y > window.innerHeight ||
                    this.position.y < 0
                ) {
                    this.velocity.y = -this.velocity.y
                }

                this.position.add(this.velocity)
            }
            collide(other) {
                if (dist(this, other) < this.size / 2 + other.size / 2) {
                    console.log("Collide")
                    console.log(
                        "Before:",
                        this.velocity.x,
                        other.velocity.x,
                        `net: ${this.velocity.x + other.velocity.x}`
                    )
                    let rel = {
                        x: this.velocity.x + other.velocity.x,
                        y: this.velocity.y + other.velocity.y,
                    }
                    this.velocity.handleCollision(rel)
                    other.velocity.handleCollision(rel)
                    console.log(
                        "After:",
                        this.velocity.x,
                        other.velocity.x,
                        `net: ${this.velocity.x + other.velocity.x}`
                    )
                }
            }
        }

        v1 = new Vector(15, 0)
        d1 = new Vector(100, 500)
        p1 = new Particle(100, d1, v1)
        v2 = new Vector(0, 0)
        d2 = new Vector(500, 500)
        p2 = new Particle(100, d2, v2)
        draw = function () {
            background(0, 0, 0)
            p1.display()
            p1.move()
            p2.display()
            p2.move()
            p1.collide(p2)
            //  p2.collide(p1)
        }
    }
}

// Get the canvas that ProcessingJS will use
var canvas = document.getElementById("mycanvas")
// Pass the function to ProcessingJS constructor
var processingInstance = new Processing(canvas, programCode)
