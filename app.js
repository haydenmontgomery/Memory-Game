const gameContainer = document.getElementById("game");
const timeDiv = document.getElementById("time");
const fastestTimeDiv = document.getElementById("fastest-time");

let previousCard;
//ID assignment when creating div
let newID = 1;
//Our boolean to check if we can click e.g. enough time has passed
let canClick = true;
let isPair = false;


let fastestTime = 0;
if (localStorage.getItem('isScore')){
    fastestTime = localStorage.getItem("isScore");
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
    //Check if we are allowed to click
    if(canClick === true){
        canClick = false;
        previousCard = e.target.id;
        console.log(previousCard);
        //console.log("You clicked", e.target);
        const image = e.target.querySelector("img")
        if (image !== null){
            const divClass = e.target.classList.value;
            console.log(divClass + "This is divclass");

            image.src = divClass;
        }
        setTimeout(function(){
            canClick = true;
        }, 100);
    }

}


//Display score and time
divCreation(shuffledImages);