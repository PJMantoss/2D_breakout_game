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
        let paddleX = (canvas.width-paddleWidth)/2;
        //let paddleY = canvas.height-paddleHeight;

        let rightPressed = false;
        let leftPressed = false;

        // Define Information about bricks
        let brickRowCount = 3; //Number of rows and columns of bricks
        let brickColumnCount = 5;
        let brickWidth = 75; //Width and height of bricks
        let brickHeight = 20;
        let brickPadding = 10; //Padding between bricks so they won't be touching each other
        let brickOffsetTop = 30;
        let brickOffsetLeft = 30; //A top and left offset so they won't start from the edge of the canvas

        /*
        A 2D array to hold our bricks. Brick column(c) holds brick rows (r)
        which in turn holds an object containing positions (x & y) for painting
        our bricks on the screen.
        */
        let bricks = [];
        for (let c = 0; c < brickColumnCount; c++){
            bricks[c] = [];

            for (let r = 0; r < brickRowCount; r++){
                bricks[c][r] = {x: 0, y: 0};
            }
        }
        //Code above will loop through rows and columns to create bricks on the screen

        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);

        function keyDownHandler(e){
            if(e.key == "Right" || e.key == "ArrowRight"){
                rightPressed = true;
            }
            else if (e.key == "Left" || e.key == "ArrowLeft"){
                leftPressed = true;
            }
        }

        function keyUpHandler(e){
            if (e.key == "Right" || e.key == "ArrowRight"){
                rightPressed = false;
            } 
            else if(e.key == "Left" || e.key == "ArrowLeft"){
                leftPressed = false;
            }
        }

        drawBall = () => {
            ctx.beginPath();
            ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }

        drawPaddle = () => {
            ctx.beginPath();
            ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }

        function drawBricks(){
            for (let c = 0; c < brickColumnCount; c++){
                for (let r = 0; r < brickRowCount; r++){
                    bricks[c][r].x = 0;
                    bricks[c][r].y = 0;

                    ctx.beginPath();
                    ctx.rect(0, 0, brickWidth, brickHeight);
                    ctx.fillStyle = "#0095DD";
                    ctx.fill();
                    ctx.closePath()
                }
            }
        }

        draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            drawBall();
            drawPaddle();

            if (y + dy < ballRadius){
                dy = -dy;
            } else if (y + dy > canvas.height-ballRadius){
                if(x > paddleX && x < paddleX + paddleWidth){
                    dy = -dy;
                }else{
                    alert("GAME OVER");
                    document.location.reload();
                    clearInterval(interval); // For Chrome to end game
                }
            }
    
            if (x + dx > canvas.width-ballRadius || x + dx < ballRadius){
                dx = -dx;
            }

            if (rightPressed){
                paddleX += 2;
                if (paddleX + paddleWidth > canvas.width){
                    paddleX = canvas.width - paddleWidth;
                }
            }
            else if (leftPressed){
                paddleX -= 2;
                if(paddleX < 0){
                    paddleX = 0;
                }
            }

            x += dx;
            y += dy;
        }

        let interval = setInterval(draw, 10);