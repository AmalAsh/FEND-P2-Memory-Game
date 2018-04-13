/*
 * Create a list that holds all of your cards
 */

 // let it all be open at first them turn it to card and start playing

const deck = document.getElementById("deck");

let cards = document.getElementsByClassName("card");

let matchCount = 0; //counter for matched cards

let firstClickedCard = null; //the shape of first card clicked
let currentClickedCard = null; //holds the current clicked card

$(document).ready(startGame); //----------add a "start button"

function startGame(){ 
  cards = shuffle(cards);
  $(".card").addClass("open show");
  setTimeout(function(){
    $(".card").removeClass("open show");
  },3000);
}

$(".card").click(
  function clickCard(){
    currentClickedCard=this;
    console.log(currentClickedCard.className);
    if(currentClickedCard.className==='card'){
      if (firstClickedCard===null){
        firstClickedCard = currentClickedCard;
        currentClickedCard.className='card open show';
      }else {
        if(firstClickedCard.childNodes[1].className===currentClickedCard.childNodes[1].className){ //matched
          currentClickedCard.className='card match';
          firstClickedCard.className='card match';
          firstClickedCard = null; //reset
        }else{
          currentClickedCard.className='card open show';
            setTimeout(function setClass(){
            firstClickedCard.className='card';
            currentClickedCard.className='card';
            firstClickedCard = null; //reset
          } ,1000);
        }
      }
    }
  });

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
