const gameContainer = document.getElementById("game");
const timeDiv = document.getElementById("time");
const fastestTimeDiv = document.getElementById("fastest-time");

let finish = 0;

let previousCard;
//ID assignment when creating div
let newID = 1;
//Our boolean to check if we can click e.g. enough time has passed
let canClick = true;
let isPair = false;


let fastestTime = 0;
if (localStorage.getItem('isScore')){
    fastestTime = localStorage.getItem("isScore");
    fastestTimeDiv.innerText = `Fastest Time: ${fastestTime}`;
}
//start score counter
let time = 0;
const intervalID = setInterval(function() {
    time += 1;
    timeDiv.innerText = `Time: ${time}`;
}, 1000);

//Array of our gifs to use as cards
const imgArray = [
    "https://media.giphy.com/media/QAsBwSjx9zVKoGp9nr/giphy.gif",
    "https://media.giphy.com/media/6pJNYBYSMFod2/giphy.gif",
    "https://media.giphy.com/media/8Iv5lqKwKsZ2g/giphy.gif",
    "https://media.giphy.com/media/4pMX5rJ4PYAEM/giphy.gif",
    "https://media.giphy.com/media/zPOErRpLtHWbm/giphy.gif",
    "https://media.giphy.com/media/QAsBwSjx9zVKoGp9nr/giphy.gif",
    "https://media.giphy.com/media/6pJNYBYSMFod2/giphy.gif",
    "https://media.giphy.com/media/8Iv5lqKwKsZ2g/giphy.gif",
    "https://media.giphy.com/media/4pMX5rJ4PYAEM/giphy.gif",
    "https://media.giphy.com/media/zPOErRpLtHWbm/giphy.gif"
];


//FisherYates like shuffle algorithm
function fisherYatesShuffle(array)
{
    let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

//Our shuffled array
let shuffledImages = fisherYatesShuffle(imgArray);


//Create our cards
function divCreation(shuffledArray){
    for(let img of shuffledArray){
        //new div
        const newDiv = document.createElement("div");
        const blankImage = document.createElement("img");
        //Give class attribute. This will be the whole url so we can math them.
        newDiv.classList.add(img);
        console.log(newDiv.classList);

        //Add id to div. This will be used to check if we clicked the same card or not. NO CHEATING!
        newDiv.setAttribute("id", newID);

        //Allow them to be clicked
        newDiv.addEventListener("click", handleCardClick);

        //Add blank img element to our card
        newDiv.appendChild(blankImage);

        //append div to game
        gameContainer.append(newDiv);
        newID++
    }
}

function handleCardClick(e){
    console.log(canClick);
    //Check if we are allowed to click
    if(canClick === true){
        
        //console.log(previousCard);
        //console.log("You clicked", e.target);
        if (e.target.parentNode.id == "game"){
            canClick = false;
            const image = e.target.querySelector("img")
            const divClass = e.target.classList.value;
            image.src = divClass;
            //Check if we are the first of the attempted pair or not.
            if(previousCard != undefined){
                //Check if we match
                if(previousCard.classList.value == divClass){
                    finish += 1;
                    previousCard = undefined;
                    //Check if we won
                    if (finish == 5){
                        //Checks for a high score
                        if(fastestTime < time){
                            alert(`You finished in ${time} seconds! That's a high score!`);
                            localStorage.setItem("isScore", fastestTime);
                            canClick = false;
                            return;
                        } else{
                            alert(`You finished in ${time} seconds!`);
                            canClick = false;
                            return;
                        }
                        
                        
                    }
                    canClick = true;
                } else {
                        setTimeout(function(){
                        const prevImage = previousCard.querySelector("img");
                        clearImage(image);
                        clearImage(prevImage);
                        //canClick = true;
                        previousCard = undefined;
                        console.log(canClick);
                        setTimeout(function(){
                            canClick = true;
                        }, 75);
                        }, 2000);
                    }
                } else {
                    canClick = true;
                    previousCard = e.target;
                }
        console.log(canClick);
        } else{
            setTimeout(function(){
                canClick = true;
            }, 75);
        }

    }
console.log(canClick);
}


//Display score and time
divCreation(shuffledImages);
function clearImage(image){
    console.log(image);
    image.src = "";
}