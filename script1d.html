const root = document.getElementById("canvas")
root.style.backgroundColor = "black"
root.style.width = window.outerWidth + "px"
root.style.height = window.innerHeight + "px"
root.style.position = "relative"

var index = 0
function clear() {
    if (root.children.length > 2) {
        for (let i = 0; i < root.children.length; i++) {
            if (
                root.children[i].style.zIndex < index - 1 ||
                root.children[i].style.zIndex > index + 2
            ) {
                root.removeChild(root.children[i])
            }
        }
    }
}
function background(r, g, b) {
    let back = document.createElement("div")
    let s = back.style
    s.zIndex = index
    s.position = "absolute"
    s.width = "100%"
    s.height = "100%"
    s.backgroundColor = `rgb(${r},${g},${b})`
    root.appendChild(back)
}
function ellipse(x, y, lenx, leny, color) {
    let div = document.createElement("div")
    let s = div.style
    s.backgroundColor = "white"
    s.zIndex = index + 1
    s.width = lenx + "px"
    s.height = leny + "px"
    s.position = "absolute"
    s.left = x + "px"
    s.bottom = y + "px" // Flipped the Y-axis
    s.borderRadius = "100%"
    s.backgroundColor = color
    root.appendChild(div)
}
var triangulate = function (colliders) {
    for (let i = 0; i < colliders.length; i++) {
        colliders[i].display()
        colliders[i].move()
        if (i + 1 == colliders.length) {
            colliders[i].collide(colliders[0])
        } else {
            for (let j = i + 1; j < colliders.length; j++) {
                colliders[i].collide(colliders[j])
            }
        }
    }
}
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
        this.color =
            "#" +
            ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")
    }
    display() {
        ellipse(
            this.position.x,
            this.position.y,
            this.size,
            this.size,
            this.color
        )
    }

    move() {
        if (this.position.x > window.innerWidth || this.position.x < 0) {
            this.velocity.x = -this.velocity.x
        }
        if (this.position.y > window.innerHeight || this.position.y < 0) {
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
d2 = new Vector(400, 500)
p2 = new Particle(100, d2, v2)
v3 = new Vector(0, 0)
d3 = new Vector(600, 500)
p3 = new Particle(100, d3, v3)
v4 = new Vector(0, 0)
d4 = new Vector(900, 500)
p4 = new Particle(100, d4, v4)
v5 = new Vector(0, 0)
d5 = new Vector(1100, 500)
p5 = new Particle(100, d5, v5)
draw = function () {
    background(0, 0, 0)
    triangulate([p1, p2, p3, p4, p5])
    index += 1
    index = index % 1000
    clear()
}

setInterval(draw, 30)
