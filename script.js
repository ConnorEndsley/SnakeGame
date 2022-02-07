let board = document.getElementById("board");
let startButton = document.getElementById("start");
let welcomeStatement = document.getElementById("welcomeStatement");
let score = document.getElementById("score");
let food = document.getElementsByClassName("food")[0];
let table = document.getElementsByTagName("table")[0];
let snake = document.getElementsByClassName("snake")[0]
let resetButton = document.getElementById("reset");
let losingComment = document.getElementById("gameComment")

let state = {
    food: [2,0], 
    x: 1,
    y: 1,
    snake:[[8,4],[7,4], [6,4]],
    score: 0,
};

console.log(state);

function initialState(){
        state = {
        food: [2,0], 
        x: 1,
        y: 1,
        snake:[[4,4],[4,5], [4,6]],
        score: 0
    };
    return state;
}

function createGrid()
{
    for(let j = 0; j < 20; j++){
    let row = document.createElement("tr");
    for(let i = 0; i < 20; i++)
    {
        let td = document.createElement("td");
        td.id = "row" + j + "column" + i;
        row.appendChild(td);
    }
    table.appendChild(row)
}
}
createGrid();

function setBorder(){
    const limit = state.snake[0];
    console.log(limit)
    const rowLimit = limit[0];
    console.log(rowLimit);
    const columnLimit = limit[1];
    if(rowLimit < 0 || columnLimit < 0 || rowLimit > 19 || columnLimit > 19){
    losingComment.innerText = "Sorry, you lose! Please restart!";
    stopInterval();
    } 
}
setBorder()

function renderSnake(){
    if(eatFood()){
    const popped = state.snake.pop();
    console.log(popped)
    let currPop = document.getElementById("row" + popped[1] + "column" + popped[0])
    currPop.classList.remove("snake");
    }
    // loop through the snake array
    for(let i = 0; i < state.snake.length; i++){
    let currentSnakePosition = state.snake[i];

    let currTd = document.getElementById("row" + currentSnakePosition[1] + "column" + currentSnakePosition[0])
    // add snake list to the class of snake
    currTd.classList.add("snake");
    }
}
renderSnake();



let foodX;
let foodY;
function setFoodCoordinates(){
    foodX = Math.floor(Math.random() * 20);
    foodY = Math.floor(Math.random() * 20);
}

function renderFood(){
    setFoodCoordinates()
    state.snake.forEach((body) => {
        if(foodX === body[1] && foodY === body[0]){
            setFoodCoordinates()
        }
    })
    state.food = [foodX, foodY]


    let currFoodPosition = state.food;

    let currFood = document.getElementById("row" + currFoodPosition[0] + "column" + currFoodPosition[1]);
    currFood.classList.add("food");

}
renderFood();



/**
 * Event function that tells which keys were pressed
 */
    let lastKeyHit = "";

window.addEventListener("keydown", function(event){
    event.preventDefault();
    if(event.key === 'ArrowLeft' && lastKeyHit !== "ArrowRight"){
        lastKeyHit = "ArrowLeft"

    } else if (event.key === 'ArrowRight' && lastKeyHit !== "ArrowLeft"){
        lastKeyHit = "ArrowRight";

    } else if (event.key === "ArrowUp" && lastKeyHit !== "ArrowDown"){
        lastKeyHit = "ArrowUp"

    } else if (event.key === "ArrowDown" && lastKeyHit !== "ArrowUp"){
        lastKeyHit = "ArrowDown"
        }
    });

    function increaseScore(){
            score.innerText = "Score: " + state.score;
        }

    function eatFood(){
        console.log(state.food, state.snake[0])

        if(state.food[0] === state.snake[0][1] && state.food[1] === state.snake[0][0]){
            let currFood = document.getElementById("row" + state.food[0] + "column" + state.food[1]);
            currFood.classList.remove("food");
            renderFood()
            state.score += 1;
            increaseScore();

            return false
        } else {return true}
    }

    function gameLoop(){
        setBorder();
        if(lastKeyHit === "ArrowLeft"){
            lastKeyHit = "ArrowLeft"
            state;
            const head = state.snake[0];
            const headX = head[0];
            const headY = head[1];
            const newHeadX = headX - state.x;
            const newSnakePosition = [newHeadX, headY]
            
            // Put new space on front
            state.snake.unshift(newSnakePosition);
            // Take last space off back
            console.log(state.snake)
    
            renderSnake();

    
        } else if (lastKeyHit === "ArrowRight"){
            lastKeyHit = "ArrowRight";
            const head = state.snake[0];
            const headX = head[0];
            const headY = head[1];
            const newHeadX = headX + state.x;
            const newSnakePosition = [newHeadX, headY]
       
            // Put new space on front
            state.snake.unshift(newSnakePosition);
            // Take last space off back
    
            renderSnake(); 

    
        } else if (lastKeyHit === "ArrowUp"){
            lastKeyHit = "ArrowUp"
            const head = state.snake[0];
            const headX = head[0];
            const headY = head[1];
            const newHeadY = headY - state.y;
            const newSnakePosition = [headX, newHeadY];
    
            // Put new space on front
            state.snake.unshift(newSnakePosition);
            // Take last space off back
    
            renderSnake(); 

    
        } else if (lastKeyHit === "ArrowDown"){
            lastKeyHit = "ArrowDown"
            const head = state.snake[0];
            const headX = head[0];
            const headY = head[1];
            const newHeadY = headY + state.y;
            const newSnakePosition = [headX, newHeadY]
    
            // Put new space on front
            state.snake.unshift(newSnakePosition);
            // Take last space off back
    
            renderSnake(); 
            }
}
const myInterval = setInterval(gameLoop, 100)

    function stopInterval(){
        clearInterval(myInterval)
    }