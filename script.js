//Note: Work on barrier. Especially topBarrier.
//Select DOM elements
const outerSquare = document.querySelector(".outer-square");
const box = document.querySelector(".box");
const walls = document.querySelectorAll(".wall");

//Global variables
let boxTop; //top position of box. will be updated each time the box moves
let boxRight; //right position of box. will be updated each time the box moves
let boxBottom; //bottom position of box. will be updated each time the box moves
let boxLeft; //left position of box. will be updated each time the box moves

//Get box DOMRect
function getBoxDOMRect() {
    let getBoxDOMRect = box.getBoundingClientRect();
    boxTop = getBoxDOMRect.top;
    boxRight = getBoxDOMRect.right;
    boxBottom = getBoxDOMRect.bottom;
    boxLeft = getBoxDOMRect.left;
    console.log(`This is box top: ${getBoxDOMRect.top}, This is box right: ${getBoxDOMRect.right}, This is box bottom: ${getBoxDOMRect.bottom}, This is box left: ${getBoxDOMRect.left}`);
}
getBoxDOMRect();

//Global variables    --------> Add more comments here to make code more understandable

let conditionArraysHorizontal = []; //Stores the wallDOMRects of the walls where box is within the horizontal distance of the wall
let conditionArraysVertical = []; //Stores the wallDOMRects of the walls where box is within the vertical distance of the wall
let topBarrier = NaN; //Set the top barrier when box is moving up
let rightBarrier = NaN; //Set the right barrier when box is moving right
let leftBarrier = NaN; //Set the left barrier when box is moving left
let bottomBarrier = NaN; //Set the bottom barrier when box is moving down

//All the wall DOMRects
const wallDOMRects = {}; //Object to access all the wall DOMRects

let key = "wallDOMRect"; //Used to dynamically add keys to wallDOMRects object

walls.forEach((wall) => { //Dynamically add keys to wallDOMRects object
    wallDOMRects[key + wall.innerHTML] = wall.getBoundingClientRect();
});

//Function to check if box is within the horizontal distance of the walls

function checkHorizontalDistanceCondition() {
    conditionArraysHorizontal = [];
    for (let x in wallDOMRects) {
        if (boxLeft >= wallDOMRects[x].left && boxRight <= wallDOMRects[x].right) {
            conditionArraysHorizontal.push(x);
        }
    }

 //Make sure to revise the code to clean code

    let distanceFromWallsAboveBox = []; //Array to store the distances between box.top and wall.bottom
    let distanceFromWallsBelowBox = [];
    let positiveDistancesFromWallsAboveBox = []; //Only positive distances from distanceFromWallsAboveBox
    let positiveDistancesFromWallsBelowBox = [];
    for (let i = 0; i < conditionArraysHorizontal.length; i++) {
        distanceFromWallsAboveBox.push(boxTop - wallDOMRects[`${conditionArraysHorizontal[i]}`].bottom);
        distanceFromWallsBelowBox.push(wallDOMRects[`${conditionArraysHorizontal[i]}`].top - boxBottom);
    }

    for (let k = 0; k < distanceFromWallsAboveBox.length; k++) {
        if (distanceFromWallsAboveBox[k] >= 0) {
            positiveDistancesFromWallsAboveBox.push(distanceFromWallsAboveBox[k]);
        }
        if (distanceFromWallsBelowBox[k] >= 0) {
            positiveDistancesFromWallsBelowBox.push(distanceFromWallsBelowBox[k]);
        }
    }

    let minDistance = Math.min(...positiveDistancesFromWallsAboveBox);
    let minDistanceFromWallsBelowBox = Math.min(...positiveDistancesFromWallsBelowBox);
    for (let y in wallDOMRects) {
        if (boxTop - wallDOMRects[y].bottom == minDistance) {
            topBarrier = wallDOMRects[y].bottom;
        }
    }
    for (let c in wallDOMRects) {
        if (minDistanceFromWallsBelowBox == wallDOMRects[c].top - boxBottom) {
            bottomBarrier = wallDOMRects[c].top;
        }
    }
}

function checkVerticalDistanceCondition() {
    conditionArraysVertical = [];
    for (let x in wallDOMRects) {
        if (boxTop >= wallDOMRects[x].top && boxBottom <= wallDOMRects[x].bottom) {
            conditionArraysVertical.push(x);
        }
    }

    let distanceFromWallsLeftOfBox = [];
    let distanceFromWallsRightOfBox = [];
    let positiveDistanceFromWallsLeftOfBox = [];
    let positiveDistancesFromWallsRightOfBox = [];
    for (let i = 0; i < conditionArraysVertical.length; i++) {
        distanceFromWallsLeftOfBox.push(boxLeft - wallDOMRects[`${conditionArraysVertical[i]}`].right);
        distanceFromWallsRightOfBox.push(wallDOMRects[`${conditionArraysVertical[i]}`].left - boxRight);
    }

    for (let k = 0; k < distanceFromWallsLeftOfBox.length; k++) {
        if (distanceFromWallsLeftOfBox[k] >= 0) {
            positiveDistanceFromWallsLeftOfBox.push(distanceFromWallsLeftOfBox[k]);
        }
        if (distanceFromWallsRightOfBox[k] >= 0) {
            positiveDistancesFromWallsRightOfBox.push(distanceFromWallsRightOfBox[k]);
        }
    }

    let minDistanceFromWallsLeftOfBox = Math.min(...positiveDistanceFromWallsLeftOfBox);
    let minDistanceFromWallsRightOfBox = Math.min(...positiveDistancesFromWallsRightOfBox);
    for (let y in wallDOMRects) {
        if (minDistanceFromWallsLeftOfBox == boxLeft - wallDOMRects[y].right) {
            leftBarrier = wallDOMRects[y].right;
        }
    }
    for (let c in wallDOMRects) {
        if (wallDOMRects[c].left - boxRight == minDistanceFromWallsRightOfBox) {
            rightBarrier = wallDOMRects[c].left;
        }
    }
}

// Depending on the arrow key pressed, update the box's position:
// After each move, update the box's DOMRect and global position variables
document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            checkHorizontalDistanceCondition();
            moveBox();
            break;
        case "ArrowRight":
            checkVerticalDistanceCondition();
            moveBox();
            break;
        case "ArrowDown":
            checkHorizontalDistanceCondition();
            moveBox();
            break;
        case "ArrowLeft":
            checkVerticalDistanceCondition();
            moveBox();
            break;
        default:
    }
});

//Move box
function moveBox() {
    if (event.key == "ArrowUp") {
        if (boxTop > topBarrier) {
            console.log(`This is box top: ${boxTop}`);
            console.log(`Top barrier inside moveBox(): ${topBarrier}`);
            boxTop -= 1;
            box.style.top = `${boxTop}px`;
        }
        box.top = boxTop;
        getBoxDOMRect();
    } else if (event.key == "ArrowRight") {
        if (boxRight < rightBarrier) {
            boxLeft += 1;
            box.style.left = `${boxLeft}px`;
        }
        box.left = boxLeft;
        getBoxDOMRect();
    } else if (event.key == "ArrowDown") {
        if (boxBottom < bottomBarrier) {
            boxTop += 1;
            box.style.top = `${boxTop}px`;
        }
        box.top = boxTop;
        getBoxDOMRect();
    } else {
        if (boxLeft > leftBarrier) {
            boxLeft -= 1;
            box.style.left = `${boxLeft}px`;
        }
        box.left = boxLeft;
        getBoxDOMRect();
    }
}