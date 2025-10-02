import { getContext, FPS } from "./utils-module.js";

document.title = "A01 - App Graphics 2D";
document.addEventListener("DOMContentLoaded", main);

function main(ev) {
    const ctx = getContext("#myCanvas");

    const config = {
        width: 800,
        height: 600,
        bgColor: "white",
        debug: true,
    };

    ctx.canvas.width = config.width;
    ctx.canvas.height = config.height;

    const field = {
        x: 520,
        y: 350,
        width: 260,
        height: 200
    };

    const drops = [];
    for (let i = 0; i < 150; i++) {
        drops.push({
            x: Math.random() * config.width,
            y: Math.random() * config.height,
            speed: 1 + Math.random() * 1.5
        });
    }

    const ricePositions = [];
    const rows = 6;
    const cols = 4;
    const paddingX = 20;
    const paddingY = 20;
    const startX = field.x + paddingX;
    const startY = field.y + paddingY;
    const gapX = (field.width - paddingX * 2) / (cols - 1);
    const gapY = (field.height - paddingY * 2) / (rows - 1);

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            ricePositions.push({
                x: startX + col * gapX,
                y: startY + row * gapY,
                height: 15 + Math.random() * 10
            });
        }
    }

    //  เพิ่มเมฆ 
    const clouds = [];
    for (let i = 0; i < 5; i++) {
        clouds.push({
            x: Math.random() * config.width,
            y: 50 + Math.random() * 50,
            speed: 0.3 + Math.random() * 0.3
        });
    }

    function drawCloud(ctx, x, y) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.beginPath();
        ctx.arc(x, y, 20, Math.PI * 0.5, Math.PI * 1.5);
        ctx.arc(x + 25, y - 20, 25, Math.PI * 1, Math.PI * 2);
        ctx.arc(x + 55, y - 10, 20, Math.PI * 1.37, Math.PI * 1.91);
        ctx.arc(x + 45, y + 15, 25, Math.PI * 0.4, Math.PI * 1.4);
        ctx.closePath();
        ctx.fill();
    }
    // =======================

    function drawRice(ctx, x, y, height = 20, color = "#FFD700") {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y - height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x, y - height / 2);
        ctx.lineTo(x - 5, y - height + 5);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x, y - height / 2);
        ctx.lineTo(x + 5, y - height + 5);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x, y - height);
        ctx.lineTo(x - 3, y - height - 5);
        ctx.moveTo(x, y - height);
        ctx.lineTo(x + 3, y - height - 5);
        ctx.stroke();
    }

    function drawTree(ctx, x, y) {
        ctx.fillStyle = "#8B4513";
        ctx.fillRect(x, y, 15, 50);

        const colors = ["#2E8B57", "#3CB371", "#66CDAA"];
        for (let i = 0; i < colors.length; i++) {
            ctx.fillStyle = colors[i];
            ctx.beginPath();
            ctx.arc(x + 7, y - i * 10, 25 - i * 3, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function drawTractor(ctx, x, y) {
        ctx.fillStyle = "red";
        ctx.fillRect(x, y, 60, 30);
        ctx.fillStyle = "gray";
        ctx.fillRect(x + 40, y - 20, 20, 20);

        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(x + 15, y + 30, 10, 0, Math.PI * 2);
        ctx.arc(x + 45, y + 30, 10, 0, Math.PI * 2);
        ctx.fill();
    }

    function draw() {
        FPS.update();

        ctx.fillStyle = "skyblue";
        ctx.fillRect(0, 0, config.width, config.height);

        // ======= วาดเมฆและอัพเดตตำแหน่ง =======
        for (let cloud of clouds) {
            drawCloud(ctx, cloud.x, cloud.y);
            cloud.x += cloud.speed;
            if (cloud.x - 60 > config.width) {  // ขนาดเมฆประมาณ 60px
                cloud.x = -60;  // กลับไปซ้ายสุด
                cloud.y = 50 + Math.random() * 50;
                cloud.speed = 0.3 + Math.random() * 0.3;
            }
        }
        // =======================================

        ctx.beginPath();
        ctx.arc(650, 100, 50, 0, Math.PI * 2);
        ctx.fillStyle = "yellow";
        ctx.fill();

        ctx.strokeStyle = "orange";
        for (let i = 0; i < 36; i++) {
            let angle = (i * 10) * Math.PI / 180;
            let x1 = 650 + Math.cos(angle) * 60;
            let y1 = 100 + Math.sin(angle) * 60;
            let x2 = 650 + Math.cos(angle) * 80;
            let y2 = 100 + Math.sin(angle) * 80;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }

        // ภูเขา
        ctx.fillStyle = "limegreen";
        ctx.beginPath();
        ctx.moveTo(0, 300);
        ctx.lineTo(200, 150);
        ctx.lineTo(400, 300);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(300, 300);
        ctx.lineTo(600, 170);
        ctx.lineTo(800, 300);
        ctx.closePath();
        ctx.fill();

        // พื้นดิน (สีเขียวทั้งหมดด้านล่าง)
        ctx.fillStyle = "green";
        ctx.fillRect(0, 300, config.width, 300);

        // บ้าน
        ctx.fillStyle = "peru";
        ctx.fillRect(80, 380, 120, 100);

        ctx.fillStyle = "saddlebrown";
        ctx.beginPath();
        ctx.moveTo(70, 380);
        ctx.lineTo(140, 320);
        ctx.lineTo(210, 380);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "brown";
        ctx.fillRect(130, 430, 30, 50);

        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(155, 455, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "lightblue";
        ctx.fillRect(90, 400, 30, 30);
        ctx.fillRect(170, 400, 30, 30);

        // ต้นไม้ซ้าย
        drawTree(ctx, 40, 500);
        drawTree(ctx, 230, 460);

        // แม่น้ำ (ย้ายไปทางซ้าย)
        ctx.fillStyle = "#08edf5ff";
        ctx.beginPath();
        ctx.moveTo(280, 300);
        ctx.bezierCurveTo(300, 400, 260, 500, 330, 600);
        ctx.lineTo(430, 600);
        ctx.bezierCurveTo(360, 500, 400, 400, 380, 300);
        ctx.closePath();
        ctx.fill();

        // พื้นที่รอบทุ่งนา
        ctx.fillStyle = "#006400";
        ctx.fillRect(field.x - 10, field.y - 10, field.width + 20, field.height + 20);

        // ทุ่งนา
        ctx.fillStyle = "green";
        ctx.fillRect(field.x, field.y, field.width, field.height);

        ctx.strokeStyle = "#006400";
        ctx.lineWidth = 4;
        ctx.strokeRect(field.x, field.y, field.width, field.height);

        for (let pos of ricePositions) {
            drawRice(ctx, pos.x, pos.y, pos.height, "#ff7300ff");
        }

        // รถไถสีแดง
        drawTractor(ctx, field.x - 80, field.y + 200);

        // นก
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(200, 120);
        ctx.quadraticCurveTo(210, 100, 220, 120);
        ctx.moveTo(220, 120);
        ctx.quadraticCurveTo(230, 100, 240, 120);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(300, 100);
        ctx.quadraticCurveTo(310, 80, 320, 100);
        ctx.moveTo(320, 100);
        ctx.quadraticCurveTo(330, 80, 340, 100);
        ctx.stroke();

        // ฝน
        ctx.strokeStyle = "blue";
        for (let drop of drops) {
            ctx.beginPath();
            ctx.moveTo(drop.x, drop.y);
            ctx.lineTo(drop.x, drop.y + 5);
            ctx.stroke();

            drop.y += drop.speed;
            if (drop.y > config.height) {
                drop.y = 0;
                drop.x = Math.random() * config.width;
            }
        }

        if (config.debug) FPS.show(ctx, 10, 28);
        requestAnimationFrame(draw);
    }

    draw();
}
