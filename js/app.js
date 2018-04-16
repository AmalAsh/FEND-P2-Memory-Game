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

let matchedCounter = 0;
let movesCounter = 0;
let starsCount = 0;
let gamePoints = 0; //to set the stars based on points

let starsList = ['<i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i>',
 '<i class="fa fa-star"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i>',
 '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-o"></i>',
 '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>'];

 let timer;
 let totalSec = 0;
 let m,s; //minutes and seconds

/*
strart and restart
*/

$(document).ready(function(){
  swal({ //start message
    text:"Match the cards with the same shape",
    confirmButtonText: "START",
    confirmButtonColor: '#8cd0e8'
  }).then((result) => {
    if (result.value) {
      startGame();
    }
  });
});

function startGame() {

  shapeList = shuffle(shapeList);
  let cardsList = [];
  for (let i = 0; i < 16; i++) {
    cardsList.push($("<li></li>").addClass("card").append($("<i></i>").addClass(shapeList[i]))); //create cards with their children and add  classes
  }
  $deck.append(cardsList);
  $(".moves").text(movesCounter+" Moves ");

  $(".stars").append(starsList[starsCount]);

  swal({
    title:"Pay Attention!",
    showConfirmButton: false,
    timer: 1000,
  });

  $(".card").addClass("open show"); // flip cards up
  $(".restart").hide();

  setTimeout(function() {
    swal({
      title:"START!",
      showConfirmButton: false,
      timer: 300,
    });
    $(".card").removeClass("open show"); // flip cards down
    $(".restart").show();
    totalSec = 0;
    timer = setInterval(gameTimer, 1000); //start timer
  }, 5000);
}


function gameTimer(){
  ++totalSec;
  m = Math.floor(totalSec/60);
  s = totalSec - (m*60);
  $(".timer").text(m+":"+s);
}


/*
restart the game
*/

$(".restart").click(restartGame);

function restartGame(){
  //reset time and counters
  clearInterval(timer);
  $(".timer").text("");
  movesCounter=0;
  matchedCounter=0;
  starsCount = 0;
  firstClickedCard = null;
  currentClickedCard = null;
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

/*
game play
*/

$("#deck").click(function(e) {
  currentClickedCard = e.target;
  if (currentClickedCard.className === 'card') {
    $(".moves").text(++movesCounter+" Moves ");
    currentClickedCard.className = 'card open show';

    if (firstClickedCard === null) { //checking if a card is already clicked/open
      firstClickedCard = currentClickedCard;
    } else { //checking if a card is already clicked/open

      starsCount=Math.floor(matchedCounter*2.5/(movesCounter+5)*5);
      if(starsCount<4){
        console.log("in");
        $(".stars").empty();
        $(".stars").append(starsList[starsCount]);
      }

      if (firstClickedCard.childNodes[0].className === currentClickedCard.childNodes[0].className) { //matched
        $(".open").effect("bounce", {times:1, distance:10}, 200 );
        currentClickedCard.className = 'card match';
        firstClickedCard.className = 'card match';
        firstClickedCard = null; //reset clicked cards
        matchedCounter++;

        if(matchedCounter===8){ //player won
          clearInterval(timer);
          swal({
            title: 'Congrats!',
            html: '<div style="font-size:40px; color:#c9d14d;">'+starsList[starsCount]+'</div><p>You finished the game in '+movesCounter+' moves <br> and '+totalSec+' seconds',
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
        $(".wrong").effect("shake", {times:2, distance:10}, 200);
        //currentClickedCard.effect( "shake" );
        setTimeout(function setClass() {
          firstClickedCard.className = 'card';
          currentClickedCard.className = 'card';
          firstClickedCard = null; //reset clicked cards
        }, 200);
      }
    }
  }
});
