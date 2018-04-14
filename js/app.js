/*
variables declarations
*/
$deck = $("#deck");
let shapeList = ["fa fa-diamond", "fa fa-paper-plane-o",
  "fa fa-anchor", "fa fa-bolt",
  "fa fa-cube", "fa fa-leaf",
  "fa fa-bicycle", "fa fa-bomb",
  "fa fa-diamond", "fa fa-paper-plane-o",
  "fa fa-anchor", "fa fa-bolt",
  "fa fa-cube", "fa fa-leaf",
  "fa fa-bicycle", "fa fa-bomb"
];

let firstClickedCard = null; //holds the first  card clicked

let currentClickedCard = null; //holds the current clicked card

let matchedCounter = 0; //counter for matched cards
let movesCounter = 0;
let starsCount = 0;
let starsList = ['<i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i>',
 '<i class="fa fa-star"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i>',
 '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-o"></i>',
 '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>'];


/*
strart and restart
*/

$(document).ready(function(){
  swal({
    text:"Match the cards with the same shape",
    confirmButtonText: "START",
    confirmButtonColor: '#8cd0e8'
  }).then((result) => {
    if (result.value) {
      startGame();
    }
  });
}); //----------add a "start button"

function startGame() {
  shapeList = shuffle(shapeList);
  let cardsList = [];
  for (let i = 0; i < 16; i++) {
    cardsList.push($("<li></li>").addClass("card").append($("<i></i>").addClass(shapeList[i]))); //create cards with their children and add  classes
  }
  $deck.append(cardsList);
  $(".moves").text(matchedCounter);

  $(".stars").append(starsList[starsCount]);

  swal({
    title:"Pay Attention!",
    showConfirmButton: false,
    timer: 1000,
  });
  $(".card").addClass("open show");
  setTimeout(function() {
    $(".card").removeClass("open show");
  }, 5000);
}

$(".restart").click(restartGame);

function restartGame(){
  matchedPairsCount=0; //reset matches counter
  matchedCounter=0; //reset moves counter
  starsCount = 0;
  $(".stars").empty();
  $deck.empty();

  startGame();
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

$(".restart").click(restartGame);

/*
game play
*/

$("#deck").click(function(e) {
  if (e.target.classList.contains("card")) {
    $(".moves").text(++movesCounter);
    console.log("in");
    currentClickedCard = e.target;
    console.log(currentClickedCard);
    console.log(currentClickedCard.className);
    if (currentClickedCard.className === 'card') {
      if (firstClickedCard === null) { //checking if a card is already clicked/open
        firstClickedCard = currentClickedCard;
        currentClickedCard.className = 'card open show';
      } else { //checking if a card is already clicked/open
        if (firstClickedCard.childNodes[0].className === currentClickedCard.childNodes[0].className) { //matched
          currentClickedCard.className = 'card match';
          firstClickedCard.className = 'card match';
          firstClickedCard = null; //reset clicked cards
          matchedCounter++;

          if (movesCounter/2<matchedCounter*(movesCounter*0.5)*(matchedCounter/movesCounter)){
            if(starsCount<3){
              starsCount++;
              $(".stars").empty();
              $(".stars").append(starsList[starsCount]);
            }
          }

          if(matchedCounter===8){
            swal({
              title: 'Congrats!',
              html: '<div style="font-size:40px; color:#c9d14d;">'+starsList[starsCount]+'</div><p>You finished the game in '+movesCounter+' moves',
              confirmButtonColor: '#8cd0e8',
              confirmButtonText: 'New Game'
            }).then((result) => {
              if (result.value) {
                restartGame();
              }
            });
          }
        } else { //not matched
          firstClickedCard.className = 'card wrong show'
          currentClickedCard.className = 'card wrong show';

          setTimeout(function setClass() {
            firstClickedCard.className = 'card';
            currentClickedCard.className = 'card';
            firstClickedCard = null; //reset clicked cards
          }, 500);
        }
      }
    }
  }
});




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
