
// Cursor and trail effect
const cursor = document.getElementById('cursor');
const canvas = document.getElementById('trailCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouseX = 0;
let mouseY = 0;
let trail = [];

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Update cursor position
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';

    // Add to trail
    trail.push({
        x: mouseX,
        y: mouseY,
        opacity: 1
    });

    // Keep trail length limited
    if (trail.length > 50) {
        trail.shift();
    }
});

document.addEventListener('click', (e) => {
    // Add glow effect
    cursor.classList.remove('glow');
    void cursor.offsetWidth; // Trigger reflow
    cursor.classList.add('glow');
});

// Animation loop for trail
function animate() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw trail line
    if (trail.length > 1) {
        for (let i = 0; i < trail.length - 1; i++) {
            const current = trail[i];
            const next = trail[i + 1];

            // Fade out the line
            current.opacity -= 0.02;

            ctx.strokeStyle = `rgba(100, 255, 218, ${current.opacity * 0.6})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(current.x, current.y);
            ctx.lineTo(next.x, next.y);
            ctx.stroke();
        }

        // Remove faded trail points
        trail = trail.filter(point => point.opacity > 0);
    }

    requestAnimationFrame(animate);
}

animate();

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

/* Connect Section Functionality */
const connectLink = document.getElementById('connectLink');
const connectModal = document.getElementById('connectModal');

connectLink.addEventListener('click', (e) => {
    e.preventDefault();
    connectModal.classList.toggle('show');
});

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target !== connectLink && e.target !== connectModal && !connectModal.contains(e.target)) {
        connectModal.classList.remove('show');
    }
});