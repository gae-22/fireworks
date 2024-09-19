const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
const fireworksButton = document.getElementById('fireworksButton');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const socket = new WebSocket('ws://localhost:3000');

let fireworks = [];

class Firework {
    constructor(x, y, targetX, targetY) {
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.speed = 2;
        this.angle = Math.atan2(targetY - y, targetX - x);
        this.velocity = {
            x: Math.cos(this.angle) * this.speed,
            y: Math.sin(this.angle) * this.speed,
        };
        this.exploded = false;
        this.particles = [];
    }

    update() {
        if (!this.exploded) {
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            if (this.y <= this.targetY) {
                this.explode();
            }
        } else {
            for (let i = this.particles.length - 1; i >= 0; i--) {
                this.particles[i].update();
                if (this.particles[i].alpha <= 0) {
                    this.particles.splice(i, 1);
                }
            }
        }
    }

    draw() {
        if (!this.exploded) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
        } else {
            for (let particle of this.particles) {
                particle.draw();
            }
        }
    }

    explode() {
        this.exploded = true;
        for (let i = 0; i < 100; i++) {
            this.particles.push(new Particle(this.x, this.y));
        }
    }
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 2 + 1;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 3 + 1;
        this.velocity = {
            x: Math.cos(this.angle) * this.speed,
            y: Math.sin(this.angle) * this.speed,
        };
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.005;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    }

    update() {
        this.velocity.y += 0.05; // gravity
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= this.decay;
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function createFireworks() {
    let x = Math.random() * canvas.width;
    let y = canvas.height;
    let targetY = (Math.random() * canvas.height) / 2;
    fireworks.push(new Firework(x, y, x, targetY));
}

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
        fireworks[i].draw();

        if (fireworks[i].exploded && fireworks[i].particles.length === 0) {
            fireworks.splice(i, 1);
        }
    }

    requestAnimationFrame(animate);
}

fireworksButton.addEventListener('click', () => {
    socket.send('launchFireworks');
});

socket.onmessage = (event) => {
    if (event.data === 'launchFireworks') {
        createFireworks();
    }
};

animate();
