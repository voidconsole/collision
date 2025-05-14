const root = document.getElementById("canvas")
root.style.backgroundColor = "black"

var index = 0
function clear() {
    if (root.children.length > 1) {
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
    s.bottom = y + "px"
    s.borderRadius = "100%"
    s.backgroundColor = color
    root.appendChild(div)
}
class Vector {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    add(v) {
        this.x += v.x
        this.y += v.y
    }
    sub(v) {
        this.x -= v.x
        this.y -= v.y
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
        if (this.position.x > root.clientWidth || this.position.x < 0) {
            this.velocity.x = -this.velocity.x
        }
        if (this.position.y > root.clientHeight || this.position.y < 0) {
            this.velocity.y = -this.velocity.y
        }
        this.position.add(this.velocity)
    }
    collide(other) {
        if (dist(this, other) <= this.size / 2 + other.size / 2) {
            var normal = new Vector(
                (other.position.x - this.position.x) /
                    Math.hypot(
                        other.position.x - this.position.x,
                        other.position.y - this.position.y
                    ),
                (other.position.y - this.position.y) /
                    Math.hypot(
                        other.position.x - this.position.x,
                        other.position.y - this.position.y
                    )
            )
            var relative = new Vector(
                this.velocity.x - other.velocity.x,
                this.velocity.y - other.velocity.y
            )
            var influence = relative.x * normal.x + relative.y * normal.y

            var delta = new Vector(influence * normal.x, influence * normal.y)

            this.velocity.sub(delta)
            other.velocity.add(delta)
            console.log("Collide")
        }
    }
}

var triangulate = function (colliders) {
    for (let i = 0; i < colliders.length; i++) {
        colliders[i].display()
        colliders[i].move()
        if (i + 1 == colliders.length) {
            colliders[i].collide(colliders[0])
        } else {
            for (let j = i + 1; j < colliders.length; j++) {
                // if (dist(colliders[i], colliders[j]) <= colliders[i].size / 2 + colliders[j].size / 2) {
                colliders[i].collide(colliders[j])
                //     }
            }
        }
    }
}

function createParticle(size, position, velocity) {
    return new Particle(size, position, velocity)
}

const particles = []
for (let i = 0; i < 3; i++) {
    const size = 200
    var scale = 10
    const position = new Vector(
        Math.random() * root.clientWidth,
        Math.random() * root.clientHeight
    )
    const velocity = new Vector(
        Math.random() * scale * 2 - scale, 
        Math.random() * scale * 2 - scale
    )
    particles.push(createParticle(size, position, velocity))
}
draw = function () {
    background(0, 0, 0)
    triangulate(particles)
    background(0, 0, 0)
    index += 1
    index = index % 1000
    clear()
    requestAnimationFrame(draw)
}

draw()
