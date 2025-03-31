// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
});

// Canvas Animation Setup
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('hero-canvas');
    const ctx = canvas.getContext('2d');
    let nodes = [];
    let dataBlocks = [];
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Node class for blockchain visualization
    class Node {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = 4;
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = (Math.random() * 30) + 1;
            this.angle = Math.random() * 2 * Math.PI;
            this.speed = 0.01 + Math.random() * 0.02;
            this.radius = 100 + Math.random() * 100; // Orbit radius
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = '#4a90e2';
            ctx.fill();
            ctx.strokeStyle = 'rgba(74, 144, 226, 0.3)';
            ctx.stroke();
        }

        update() {
            // Circular motion
            this.angle += this.speed;
            this.x = this.baseX + Math.cos(this.angle) * this.radius;
            this.y = this.baseY + Math.sin(this.angle) * this.radius;
        }
    }

    // DataBlock class for moving data visualization
    class DataBlock {
        constructor() {
            this.reset();
            this.size = 2;
            this.speed = 2 + Math.random() * 2;
        }

        reset() {
            this.x = 0;
            this.y = Math.random() * canvas.height;
            this.distance = 0;
            this.targetNode = nodes[Math.floor(Math.random() * nodes.length)];
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = '#00ff00';
            ctx.fill();
        }

        update() {
            if (this.targetNode) {
                const dx = this.targetNode.x - this.x;
                const dy = this.targetNode.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 5) {
                    // Find new target node
                    const currentIndex = nodes.indexOf(this.targetNode);
                    const nextIndex = (currentIndex + 1) % nodes.length;
                    this.targetNode = nodes[nextIndex];
                } else {
                    // Move towards target
                    this.x += (dx / distance) * this.speed;
                    this.y += (dy / distance) * this.speed;
                }
            }
        }
    }

    // Create nodes and data blocks
    function init() {
        nodes = [];
        dataBlocks = [];
        
        // Create nodes in a circular pattern
        const numNodes = 15;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(canvas.width, canvas.height) / 4;

        for (let i = 0; i < numNodes; i++) {
            const node = new Node();
            node.baseX = centerX + radius * Math.cos((i / numNodes) * Math.PI * 2);
            node.baseY = centerY + radius * Math.sin((i / numNodes) * Math.PI * 2);
            node.x = node.baseX;
            node.y = node.baseY;
            nodes.push(node);
        }

        // Create data blocks
        for (let i = 0; i < 20; i++) {
            dataBlocks.push(new DataBlock());
        }
    }

    // Connect nodes with lines
    function connectNodes() {
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 200) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(74, 144, 226, ${0.2 * (1 - distance/200)})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animation function
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Create dark gradient background
        let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#0f1624');
        gradient.addColorStop(1, '#1a2332');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Update and draw nodes
        connectNodes();
        nodes.forEach(node => {
            node.update();
            node.draw();
        });

        // Update and draw data blocks
        dataBlocks.forEach(block => {
            block.update();
            block.draw();
        });

        // Add glow effect
        ctx.globalCompositeOperation = 'lighter';
        nodes.forEach(node => {
            const gradient = ctx.createRadialGradient(
                node.x, node.y, 0,
                node.x, node.y, 20
            );
            gradient.addColorStop(0, 'rgba(74, 144, 226, 0.3)');
            gradient.addColorStop(1, 'rgba(74, 144, 226, 0)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalCompositeOperation = 'source-over';

        requestAnimationFrame(animate);
    }

    init();
    animate();
});

// [Rest of your existing code for navigation, scroll behavior, etc. remains the same]
document.addEventListener("DOMContentLoaded", function () {
    const burger = document.querySelector(".burger");
    const mobileNav = document.querySelector(".mobile-nav");

    // Toggle Mobile Menu
    burger.addEventListener("mouseenter", () => {
        mobileNav.classList.add("active");
    });

    mobileNav.addEventListener("mouseleave", () => {
        mobileNav.classList.remove("active");
    });
});
