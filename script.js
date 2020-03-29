let canvas = document.getElementById('myCanvas');
        let ctx = canvas.getContext("2d");
/*
        ctx.beginPath();
        ctx.rect(20, 40, 50, 50);
        ctx.fillStyle = "#FF0000";
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(240, 160, 20, 0, Math.PI * 2, false);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.rect(160, 10, 100, 40);
        ctx.strokeStyle = "rgba(0,0,255,0.5)";
        ctx.stroke();
        ctx.closePath();

        */

        let x = canvas.width/2;
        let y = canvas.height - 30;

        let dx = 2;
        let dy = -2;
        let ballRadius = 10;

        let paddleHeight = 10;
        let paddleWidth = 75;
        let paddleX = (canvas.width-paddleWidth) / 2;
        let paddleY = canvas.height-paddleHeight;

        let leftPressed = false;
        let rightPressed = false;

        drawBall = () => {
            ctx.beginPath();
            ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }

        drawPaddle = () => {
            ctx.beginPath();
            ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }

        draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            drawBall();

            x += dx;
            y += dy;

            if (y + dy > canvas.height-ballRadius || y + dy < ballRadius){
                dy = -dy;
            }
    
            if (x + dx > canvas.width-ballRadius || x + dx < ballRadius){
                dx = -dx;
            }
        }

        setInterval(draw, 10);