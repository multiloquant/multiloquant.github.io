const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const nodes = [];
const edges = [];
const numNodes = 100;
const maxDistance = 100;

// Initialize nodes
for (let i = 0; i < numNodes; i++) {
    nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2
    });
}

// Create edges based on distance
function createEdges() {
    edges.length = 0;
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < maxDistance) {
                edges.push({from: i, to: j, distance});
            }
        }
    }
}

// Draw nodes and edges
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw edges
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    for (const edge of edges) {
        const from = nodes[edge.from];
        const to = nodes[edge.to];
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
    }

    // Draw nodes
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Update nodes position and handle bouncing
function updateNodes() {
    for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
    }
}

// Handle mouse interaction
canvas.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    for (const node of nodes) {
        const dx = node.x - mouseX;
        const dy = node.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
            node.vx += dx / distance * 0.1;
            node.vy += dy / distance * 0.1;
        }
    }
});

// Animation loop
function animate() {
    updateNodes();
    createEdges();
    draw();
    requestAnimationFrame(animate);
}

animate();
