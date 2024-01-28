const gameContainer = document.getElementById("game");
const timeDiv = document.getElementById("time");
const fastestTimeDiv = document.getElementById("fastest-time");

//Value used to increment. Game ends if finish == 5
let finish = 0;

let previousCard;

//Our boolean to check if we can click e.g. enough time has passed
let canClick = true;
let isPair = false;

console.log(localStorage.getItem('isScore'));
let fastestTime = 0;
if (localStorage.getItem('isScore')){
    fastestTime = parseInt(localStorage.getItem("isScore"));
    console.log(fastestTime + "Is this an int? " + typeof fastestTime);
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


        //Allow them to be clicked
        newDiv.addEventListener("click", handleCardClick);

        //Add blank img element to our card
        newDiv.appendChild(blankImage);

        //append div to game
        gameContainer.append(newDiv);
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
                        if(fastestTime > time){
                            //set new fastest time, end game.
                            localStorage.setItem("isScore", time);
                            canClick = false;
                            fastestTimeDiv.innerText = `Fastest Time: ${fastestTime}`;
                            setTimeout(function(){
                                alert(`You finished in ${time} seconds! That's a high score!`);
                            },100);
                            
                        } else{
                            alert(`You finished in ${time} seconds!`);
                            canClick = false;
                        }
                        
                        
                    }
                    canClick = true;
                } else {
                    //Give two seconds to see the images before clearing them
                    setTimeout(function(){
                        const prevImage = previousCard.querySelector("img");
                        clearImage(image);
                        clearImage(prevImage);
                        previousCard = undefined;
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

//Clear image function;
function clearImage(image){
    console.log(image);
    image.src = "";
}