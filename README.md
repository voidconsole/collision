# 🧪 Particle Collision (No Canvas!)

Welcome to a physics playground where classical collisions meet spooky side-effects—all without using `<canvas>`. Everything you see is built from scratch, using **vanilla JS**, pure **DOM manipulation**, and a sprinkle of vector math.

> *No libraries. No canvas. Just divs pretending to be particles. And somehow\... it works.*

---

## 🔬 What This Is

This repo contains a basic 2D particle simulator that visualizes **elastic collisions** between multiple spherical particles.

* Particles are rendered as `<div>` elements.
* All physics is done manually: **position**, **velocity**, and **collision response**—nothing from any graphics or physics library.
* A mysterious **Quantum Mode** exists, which seems to trigger bizarre, emergent behaviors like:

  * Multi-body gravity
  * Angular momentum
  * Entanglement-like effects
    ...despite no code being written for any of that. Yeah, I don’t get it either. Probably haunted.

---

## ⚙️ How It Works (The Classical Part)

### 🧮 Vector Math

A minimal `Vector` class handles 2D vector arithmetic:

```js
class Vector {
    constructor(x, y) { this.x = x; this.y = y; }
    add(v) { this.x += v.x; this.y += v.y; }
    sub(v) { this.x -= v.x; this.y -= v.y; }
}
```

Used for both position and velocity updates.

---

### 🧱 DOM-Based Rendering (No Canvas)

Instead of canvas, each particle is just a `<div>` styled into a circle:

```js
function ellipse(x, y, width, height, color) {
    const div = document.createElement("div");
    div.style = {
        position: "absolute",
        left: `${x}px`,
        bottom: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: color,
        borderRadius: "100%",
        zIndex: index + 1
    };
    root.appendChild(div);
}
```

This makes the simulation visible with pure HTML/CSS—perfect for environments that don’t support or allow canvas.

---

### 🧼 Memory Management (`clear()` function)

Since we’re creating hundreds of DOM nodes (divs) every second, we need to **clean them up** regularly or the DOM would choke.

```js
function clear() {
    for (let i = 0; i < root.children.length; i++) {
        const z = root.children[i].style.zIndex;
        if (z < index - 1 || z > index + 2) {
            root.removeChild(root.children[i]);
        }
    }
}
```

It removes `div` elements whose `z-index` is out of the current animation frame’s range. This keeps memory and DOM size under control.

---

### 🌀 Particle Movement and Bouncing

Particles bounce off the edges by inverting their velocity:

```js
if (this.position.x > width || this.position.x < 0) {
    this.velocity.x *= -1;
}
```

Then they move by updating position with velocity:

```js
this.position.add(this.velocity);
```

---

### 🎯 Collision Detection & Resolution

Distance between particles is computed via:

```js
function dist(a, b) {
    return Math.hypot(a.position.x - b.position.x, a.position.y - b.position.y);
}
```

If they collide (i.e., distance < sum of radii), we resolve it like a textbook **1D elastic collision along the normal**:

```js
// get unit normal vector
var normal = new Vector(...);
// get relative velocity
var relative = new Vector(this.velocity.x - other.velocity.x, ...);
// project relative velocity onto the normal
var influence = relative.x * normal.x + relative.y * normal.y;
// modify both velocities
var delta = new Vector(influence * normal.x, influence * normal.y);
this.velocity.sub(delta);
other.velocity.add(delta);
```

This adheres to conservation of momentum and kinetic energy—**true elastic collision behavior**.

---

### 🔁 `triangulate()` – The Core Loop

Each frame, we:

1. Display each particle.
2. Move it.
3. Check and resolve collisions with every other particle.

```js
for (let i = 0; i < colliders.length; i++) {
    colliders[i].display();
    colliders[i].move();
    for (let j = i + 1; j < colliders.length; j++) {
        colliders[i].collide(colliders[j]);
    }
}
```

Only upper triangle of combinations is checked (`i < j`), avoiding duplicate checks.

---

### 📽️ Drawing Loop

A `draw()` function runs every frame using `requestAnimationFrame`. It:

* Draws a background layer (just a black full-screen div),
* Runs `triangulate()` to move and render particles,
* Increments `zIndex` to manage layering,
* Calls `clear()` to remove old DOM elements.

```js
function draw() {
    background(0, 0, 0);
    triangulate(particles);
    background(0, 0, 0);
    index = (index + 1) % 1000;
    clear();
    requestAnimationFrame(draw);
}
```

---

## 🤯 Quantum Mode

When enabled via the checkbox toggle, it loads `scriptQ.js` instead of `script.js`. From the outside, it’s just this:

```js
loadScript(isQuantum ? 'scriptQ.js' : 'script.js');
```

Literally one line changed. No deeper rewrite. No nested changes. Just a different entry point. Check the code yourself if you don't trust me.

But somehow… that single switch causes:

* Spooky quantum entanglement–like syncing,
* Emergent angular momentum and stable orbits,
* Multi-body gravitational pull,
* Strange accuracy, as if it's **doing physics we didn’t even code**.

It’s **not** hardcoded behavior. The quantum version is just a different function being called from the outside—yet what it unleashes feels like simulation from another dimension. Emergence? Chaos? Glitch in the matrix? Who knows. But it’s *real weird* and *I didn't plan it*.

---

## 📦 File Structure

| File         | Purpose                        |
| ------------ | ------------------------------ |
| `index.html` | Setup, HTML UI, quantum toggle |
| `script.js`  | Core classical collision logic |
| `scriptQ.js` | Alternate "quantum" behavior   |

---

## 🚫 Requirements Met

* ❌ No Canvas
* ❌ No Libraries
* ✅ Pure JS + HTML
* ✅ Physically accurate elastic collisions
* ✅ Works in basic browser environments

---

## 🧠 Final Thoughts

This project is minimal and expressive. The core is real physics with manually managed DOM, yet when you enable Quantum Mode... something else takes over. Something that shouldn't work... but does. Perhaps, classic JavaScript magic.

> *Physics isn't just equations; it's magic that happens to work.*
