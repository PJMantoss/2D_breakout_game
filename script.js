let canvas = document.getElementById('myCanvas');
        //variable to store the 2D rendering context
        let ctx = canvas.getContext("2d");

        let x = canvas.width / 2;
        let y = canvas.height - 30;

        let dx = 2;
        let dy = -2;
        let ballRadius = 10;

        let paddleHeight = 10;
        let paddleWidth = 75;
        let paddleX = (canvas.width - paddleWidth) / 2;

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

        //variable for recording score
        let score = 0;

        //Variable to store the number of lives for a player
        let lives = 3;

        /*
        A 2D array to hold our bricks. Brick column(c) holds brick rows (r)
        which in turn holds an object containing positions (x & y) for painting
        our bricks on the screen.
        */
        let bricks = [];
        for (let c = 0; c < brickColumnCount; c++){
            bricks[c] = [];

            for (let r = 0; r < brickRowCount; r++){
                bricks[c][r] = { x: 0, y: 0, status: 1 };
            }
        }
        //Code above will loop through rows and columns to create bricks on the screen

        //Listening for key presses
        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);
        //Listening for mouse movement
        document.addEventListener("mousemove", mouseMoveHandler, false);

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

        //Anchoring the paddle movement to the mouse movement
        function mouseMoveHandler(e){
            let relativeX = e.clientX - canvas.offsetLeft;
            if (relativeX > 0 && relativeX < canvas.width-paddleWidth/2){
                paddleX = relativeX - paddleWidth / 2;
            }
        }

        /* Collision detection function 
        that will loop through bricks & compare 
        bricks position with ball's coordinates*/
        
        function collisionDetection(){
            for (let c = 0; c < brickColumnCount; c++){
                
                for (let r = 0; r < brickRowCount; r++){
                    let b = bricks[c][r]; //status property to each brick obj
                    
                    //Tracking & updating brick status
                    if(b.status == 1){
                        if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
                            dy = -dy;
                            b.status = 0;
                            score++;

                            /*Displaying a winning message after 
                            all bricks have been destroyed*/
                            if(score == brickRowCount * brickColumnCount){
                                alert("YOU WIN, CONGRATULATIONS! YOUR SCORE: " + score);
                                document.location.reload();
                                //clearInterval(interval);
                            }
                        }
                    }
                }
            }
        }

        //function to create and update score display
        function drawScore(){
            ctx.font = "16px Arial";
            ctx.fillStyle = "#0095DD";
            ctx.fillText("Score: " + score, 8, 20);
        }

        //Giving the player some lives
        function drawLives(){
            ctx.font = "16px Arial";
            ctx.fillStyle = "#0095DD";
            ctx.fillText("Lives: " + lives, canvas.width-65, 20);
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

        // drawBricks() loops through all the bricks and draw them on the screen
        function drawBricks(){
            for (let c = 0; c < brickColumnCount; c++){
                for (let r = 0; r < brickRowCount; r++){

                    /*
                    Check value of each brick's status property.
                    If staus == 1 then draw brick, buf it's 0, then
                    it means brick was hit by ball, therefore
                    take it off the screen
                    */
                    if(bricks[c][r].status == 1){
                        // x and y positions of each brick
                    let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                    let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;

                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;

                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = "#0095DD";
                    ctx.fill();
                    ctx.closePath()
                    }
                }
            }
        } 

        draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            drawBricks();
            drawBall();
            drawPaddle();
            drawScore();
            drawLives();
            collisionDetection();

            if (x + dx > canvas.width - ballRadius || x + dx < ballRadius){
                dx = -dx;
            }

            if (y + dy < ballRadius){
                dy = -dy;
            } 
            else if (y + dy > canvas.height - ballRadius){
                if(x > paddleX && x < paddleX + paddleWidth){
                    if(y = y - paddleHeight){
                        dy = -dy;
                    }
                }
                else{
                    lives--;
                    if(!lives){
                        alert("GAME OVER");
                        document.location.reload();
                        //clearInterval(interval); //For Chrome to end game
                    }
                    else{
                        x = canvas.width / 2;
                        y = canvas.height - 30;
                        dx = 2;
                        dy = -2;
                        paddleX = (canvas.width - paddleWidth) / 2;
                    }
                }
            }
    
 

            if (rightPressed && paddleX < canvas.width - paddleWidth){
                paddleX += 3;
                
            }
            else if (leftPressed && paddleX > 0){
                paddleX -= 3;
            }

            x += dx;
            y += dy;

            requestAnimationFrame(draw);
        }

        //let interval = setInterval(draw, 10);
        draw();

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