# Collision Engine

A 2D particle collision simulator built without `<canvas>`. Particles are rendered as plain `<div>` elements, all physics is computed manually, and nothing from any graphics or physics library is used, just vanilla JS, DOM manipulation, and vector math.

---

## How It Works

### Vector Math

A minimal `Vector` class handles all 2D arithmetic used for both position and velocity:

```js
class Vector {
    constructor(x, y) { this.x = x; this.y = y; }
    add(v) { this.x += v.x; this.y += v.y; }
    sub(v) { this.x -= v.x; this.y -= v.y; }
}
```

### DOM-Based Rendering

Each particle is an absolutely-positioned `<div>` styled into a circle. Position is updated every frame by mutating `style.left` and `style.bottom` directly:

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

This works in any environment that can render HTML, including ones where `<canvas>` is restricted or unavailable.

### Memory Management

Since a new `<div>` is created per particle per frame, the DOM would grow unbounded without cleanup. The `clear()` function prunes stale nodes using `z-index` as a proxy for age, any element whose index falls outside the current frame's active range gets removed:

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

This keeps DOM size and memory usage stable over time.

### Movement and Boundary Collisions

Particles update position by adding velocity each frame, and bounce off walls by negating the relevant velocity component:

```js
if (this.position.x > width || this.position.x < 0) {
    this.velocity.x *= -1;
}

this.position.add(this.velocity);
```

### Elastic Collision Resolution

Distance between two particles is computed with `Math.hypot`. When that distance falls below the sum of their radii, a standard elastic collision is resolved along the collision normal:

```js
// unit normal vector between centers
var normal = new Vector(...);
// relative velocity of the two particles
var relative = new Vector(this.velocity.x - other.velocity.x, ...);
// project relative velocity onto the normal
var influence = relative.x * normal.x + relative.y * normal.y;
// apply equal and opposite impulse to both particles
var delta = new Vector(influence * normal.x, influence * normal.y);
this.velocity.sub(delta);
other.velocity.add(delta);
```

This conserves both momentum and kinetic energy, giving physically accurate elastic behavior.

### Core Loop

Each frame, `triangulate()` iterates all particles, displays and moves each one, then checks collisions against every subsequent particle. Using the upper triangle (`j > i`) avoids checking each pair twice:

```js
for (let i = 0; i < colliders.length; i++) {
    colliders[i].display();
    colliders[i].move();
    for (let j = i + 1; j < colliders.length; j++) {
        colliders[i].collide(colliders[j]);
    }
}
```

### Draw Loop

`draw()` runs every frame via `requestAnimationFrame`. It renders a background layer, runs `triangulate()`, increments the `z-index` counter for frame tracking, and calls `clear()`:

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

## Quantum Mode

The quantum toggle swaps `script.js` for `scriptQ.js` at runtime, that's the entire change:

```js
loadScript(isQuantum ? 'scriptQ.js' : 'script.js');
```

The alternate script produces noticeably different emergent behavior: what looks like multi-body gravity, stable orbits, and synchronized particle movement, none of which is explicitly implemented in the classical version. It's the same collision framework, different entry point. Worth exploring if you want to understand how small behavioral differences can produce dramatically different macroscopic results.

---
## Future updates

- To consider mass and size factors
- To take into account friction, inelasticity and drag
- To support collision of arbitary shapes
- To improve efficiency by drawing grids and checking for collision with particles only in the local box.
---

## Notes

- No dependencies, no build step, runs in any modern browser
- Physics assumes equal-mass particles; no friction or rotational dynamics
- Collision detection is O(n²), not designed for large particle counts
- No `<canvas>`, no libraries; pure JS and HTML throughout
