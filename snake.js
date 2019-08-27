const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// create the unit
const box = 32;

// load images

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

const assetsImg = new Image();
assetsImg.src = "img/money.png";

const dogImg = new Image();
dogImg.src = "img/dog.png";


// create the snake

let snake = [];

snake[0] = {
    x : 17 * box,
    y : 5 * box
};

// create the food

let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

let assets = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}
let dog = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}


// create the score var

let score = 0;

//control the snake

let d;

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 37){
        d = "LEFT";
    }else if(key == 38){
        d = "UP";
    }else if(key == 39){
        d = "RIGHT";
    }else if(key == 40){
        d = "DOWN";
    }
}

// cheack collision function
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

function collisionWalls(head){
    if((head.y<=6*box && head.y>=3*box && head.x==6*box)||(head.y<=5*box && head.y>=3*box && head.x==13*box) || (head.y>=9*box && head.y<=12*box && head.x==6*box) || (head.x>=2*box && head.x<=10*box && head.y==13*box)){
    return true;
    }
    return false;
}

// police move func
function dogMove(dog) {
let move = Math.floor(Math.random()*4);
   if(move == 1){
        dog.x -= box;
        if(dog.x<box || dog.x>17*box || collisionWalls(dog)){
            dog.x +=box;
            move++;
        }
   }
   if(move == 2){
        dog.y -= box;
        if(dog.y<3*box || dog.y>17*box || collisionWalls(dog)){
            dog.y +=box;
            move++;
        }

   }
   if(move == 3){
        dog.x += box;
        if(dog.x<box || dog.x>17*box || collisionWalls(dog)){
            dog.x -=box;
            move++;
        }
   }
   if(move == 4){
        dog.y += box;
        if(dog.y<3*box || dog.y>17*box || collisionWalls(dog)){
            dog.y -=box;
        }
    }
}

// draw everything to the canvas

function draw(){
    
    ctx.drawImage(ground,0,0);
    
    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "green" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    ctx.drawImage(foodImg, food.x, food.y);
    ctx.drawImage(assetsImg, assets.x, assets.y);
    ctx.drawImage(dogImg, dog.x, dog.y);
    
    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // dog position
    dogMove(dog);
    
    
    // which direction
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    
    // if the snake eats the food
    if(snakeX == food.x && snakeY == food.y){
        score++;
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        while(collisionWalls(food)){
            food = {
                x : Math.floor(Math.random()*17+1) * box,
                y : Math.floor(Math.random()*15+3) * box
            }
        }
        snake.pop();
        // we don't remove the tail
    }else{
        // remove the tail
        snake.pop();
    }
    
    // add new Head
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    // game over
 
    if((snakeX == 0 && snakeY == 15*box) || (snakeX == 0 &&snakeY == 16*box)){
        clearInterval(game);
        alert("you just get away!");
    }

    else if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake) || collisionWalls(newHead)){
        clearInterval(game);
    }


    
    
    snake.unshift(newHead);
    
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);
}

// call draw function every 190 ms

let game = setInterval(draw,190);
