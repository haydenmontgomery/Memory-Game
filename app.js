const gameContainer = document.getElementById("game");
let score = 0;

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
    console.log("You clicked", e.target);
    var image = e.target.querySelector("img")
    var divClass = e.target.classList.value;
    console.log(divClass + "This is divclass");

    image.src = divClass;

}

divCreation(shuffledImages);