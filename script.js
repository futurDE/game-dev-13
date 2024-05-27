const firstContainer = document.querySelector(".first-container");
let containerDOMRect = firstContainer.getBoundingClientRect();
let firstContainerPositionObject = {
    top: containerDOMRect.top,
    right: containerDOMRect.right,
    bottom: containerDOMRect.bottom,
    left: containerDOMRect.left,
};

const box = document.querySelector(".box");
let boxDOMRect = box.getBoundingClientRect();
let boxPositionObject = {
    top: boxDOMRect.top,
    right: boxDOMRect.right,
    bottom: boxDOMRect.bottom,
    left: boxDOMRect.left,
};

const initialDistanceOnAllSides = {
    topSide: boxPositionObject["top"] - firstContainerPositionObject["top"],
    rightSide: firstContainerPositionObject["right"] - boxPositionObject["right"],
    bottomSide: firstContainerPositionObject["bottom"] - boxPositionObject["bottom"],
    leftSide: boxPositionObject["left"] - firstContainerPositionObject["left"],
}

console.log(initialDistanceOnAllSides);

let boxTopPosition = boxPositionObject.top;
let boxRightPosition = boxPositionObject.right;
let boxBottomPosition = boxPositionObject.bottom;
let boxLeftPosition = boxPositionObject.left;

document.addEventListener("keydown", (event) => {
    if (event.key == "ArrowUp") {
        boxDOMRect = box.getBoundingClientRect();
        boxPositionObject = {
            top: boxDOMRect.top,
            right: boxDOMRect.right,
            bottom: boxDOMRect.bottom,
            left: boxDOMRect.left,
        }

        boxTopPosition -= 10;

        let newDistanceOnAllSides = {
            topSide: boxPositionObject["top"] - firstContainerPositionObject["top"],
            rightSide: firstContainerPositionObject["right"] - boxPositionObject["right"],
            bottomSide: firstContainerPositionObject["bottom"] - boxPositionObject["bottom"],
            leftSide: boxPositionObject["left"] - firstContainerPositionObject["left"],
        }

        box.style.top = `${boxTopPosition}px`;
        box.top = boxTopPosition;

        let initialDistanceArray = [];
        let newDistanceArray = [];

        for (x in initialDistanceOnAllSides) {
            initialDistanceArray.push(initialDistanceOnAllSides[x]);
        }

        for (x in newDistanceOnAllSides) {
            newDistanceArray.push(newDistanceOnAllSides[x]);
        }

        console.log(`This is the newDistanceArray: ${newDistanceArray}`);

        function findClosestDistance(arr) {
            let messageNumber = 0;
            let message = "";
            let smallest = arr[0];
            for (let i = 1; i < arr.length; i++) {
                if (arr[i] < smallest) {
                    message = i;
                    smallest = arr[i];
                }
            }
            console.log(`This is the smallest: ${smallest}`);
            console.log(`This is the message: ${messageNumber}`);
            switch (messageNumber) {
                case 0:
                    message = "top";
                    break;
                case 1:
                    message = "right";
                    break;
                case 2:
                    message = "bottom";
                    break;
                case 3:
                    message = "left";
                    break;
            }

            console.log(message);
        }
        findClosestDistance(newDistanceArray);
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key == "ArrowDown") {
        boxDOMRect = box.getBoundingClientRect();
        boxPositionObject = {
            top: boxDOMRect.top,
            right: boxDOMRect.right,
            bottom: boxDOMRect.bottom,
            left: boxDOMRect.left,
        }

        boxTopPosition += 10;

        let newDistanceOnAllSides = {
            topSide: boxPositionObject["top"] - firstContainerPositionObject["top"],
            rightSide: firstContainerPositionObject["right"] - boxPositionObject["right"],
            bottomSide: firstContainerPositionObject["bottom"] - boxPositionObject["bottom"],
            leftSide: boxPositionObject["left"] - firstContainerPositionObject["left"],
        }

        box.style.top = `${boxTopPosition}px`;
        box.top = boxTopPosition;

        let initialDistanceArray = [];
        let newDistanceArray = [];

        for (x in initialDistanceOnAllSides) {
            initialDistanceArray.push(initialDistanceOnAllSides[x]);
        }

        for (x in newDistanceOnAllSides) {
            newDistanceArray.push(newDistanceOnAllSides[x]);
        }

        console.log(`This is the newDistanceArray: ${newDistanceArray}`);

        function findClosestDistance(arr) {
            let messageNumber = 0;
            let message = "";
            let smallest = arr[0];
            for (let i = 1; i < arr.length; i++) {
                if (arr[i] < smallest) {
                    message = i;
                    smallest = arr[i];
                }
            }
            console.log(`This is the smallest: ${smallest}`);
            console.log(`This is the message: ${messageNumber}`);
            switch (messageNumber) {
                case 0:
                    message = "top";
                    break;
                case 1:
                    message = "right";
                    break;
                case 2:
                    message = "bottom";
                    break;
                case 3:
                    message = "left";
                    break;
            }

            console.log(message);
        }
        findClosestDistance(newDistanceArray);
    }
});