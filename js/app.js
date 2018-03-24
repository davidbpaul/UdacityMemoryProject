/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 // main function controlls program
 var last;
 var time = 0;
 var counter = 0;

 var minutesLabel = document.getElementById("minutes");
 var secondsLabel = document.getElementById("seconds");
 var totalSeconds = 0;
 setInterval(setTime, 1000);

 function setTime() {
   ++totalSeconds;
   secondsLabel.innerHTML = pad(totalSeconds % 60);
   minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
 }

 function pad(val) {
   var valString = val + "";
   if (valString.length < 2) {
     return "0" + valString;
   } else {
     return valString;
   }
 }

function main(){
  // get dom tags
  var deck = document.querySelector('.deck');
  var cardsDom = document.getElementsByClassName('card');
  var cards = Array.from(cardsDom)
  var restart = document.querySelector('.restart');
  var moves = document.querySelector('.moves');
  //build game
  buildGame(cards, cardsDom, deck, moves);

  //restart game on icon click
  restart.addEventListener('click',function() {
    resetGame(cards, cardsDom, deck, buildGame, moves);
  });
}



//build game
function buildGame(cards, dom, deck, moves){
  //get tags with star class
  var starsDom = document.getElementsByClassName('star');
  //hold pairs of variables
  var set = [];
  // hold moves counter
  moves.textContent = 0;
  counter = 0;
  //add stars
  starsDom[0].firstElementChild.classList.remove('fa-star-o');
  starsDom[1].firstElementChild.classList.remove('fa-star-o');
  starsDom[2].firstElementChild.classList.remove('fa-star-o');
  // remove old cards
  removeCards(dom);
  //add new shuffled cards
  addCards(shuffle(cards), deck, set, moves);
  totalSeconds = 0;
}

//add cards
function addCards(cards, deck, set, moves){
  var i;
  for(i = 0; i < cards.length; i++){
    cards[i].addEventListener('click', function(){
      flipCard(this, set, moves);
    })
    deck.appendChild(cards[i]);
  }
}
//remove cards
function removeCards(cards){
  while(cards[0]){
    cards[0].classList.remove("open");
    cards[0].classList.remove("show");
    cards[0].classList.remove("match");
    cards[0].parentNode.removeChild(cards[0]);
  };
}

// reset game
function resetGame(cards, dom, deck, build, moves){
  var flag = 1;
    if (confirm("Are you sure you want to reset game?") == true) {
      build(cards, dom, deck, moves)
    }
}

// flip card
function flipCard(card, set, moves){
  var id = card.getAttribute('id');
  if(!(time == 1)){
    if(last == undefined){
        console.log(last)
      last = id;
      card.classList.add("open");
      card.classList.add("show");
      //push card to array to pair
      set.push(card);
      //check if 2 el in array
      if(set.length == 2){
        //if 2 el check matches and add a move
        checkMatch(set, moves);
        countMoves(moves, countStars);
      }
    }else if(!(last == id)){
      //add classes to show cardsDom
        console.log(last)
      last = undefined;
      card.classList.add("open");
      card.classList.add("show");
      //push card to array to pair
      set.push(card);
      //check if 2 el in array
      if(set.length == 2){
        //if 2 el check matches and add a move
        checkMatch(set, moves);
        countMoves(moves, countStars);
      }
    }

  }

}

// check if cards in array match
function checkMatch(set, moves){
  var i;
  //compare classes in cards
  if(set[0].firstElementChild.classList.value == set[1].firstElementChild.classList.value){
    console.log("MATCH")
    match(set, moves);
    set.length = 0;
  }else{
    // show card in red
    set[0].classList.add("error");
    set[1].classList.add("error");
    // allow card to be red for set amount of time
    time = 1;
    setTimeout(function(){
      notMatch(set)
      set.length = 0;
      time = 0;
    }, 1000);
  }
}
function match(arr, moves){
  var i;
  // add match classes
  for(i = 0; i < arr.length; i++){
    arr[i].classList.remove("open");
    arr[i].classList.remove("show");
    arr[i].classList.add("match");
  }
  // add num to counter
  if( typeof match.counter == 'undefined' ) {
      match.counter = 0;
  }
  match.counter++;
  // if 8 matches game is complete
  if(match.counter == 8){
    hasWon(moves.textContent);
  }
}
// remove card from buffer array and remove classes showing card
function notMatch(arr){
  var i;
  for(i = 0; i < arr.length; i++){
    arr[i].classList.remove("open");
    arr[i].classList.remove("show");
    arr[i].classList.remove("error");
  }
}







// count users moves
function countMoves(moves, countStars){
    counter++;
    moves.textContent = counter;
    countStars(counter);
}
// determine user score by modifying stars
function countStars(moves){
  var starsDom = document.getElementsByClassName('star');
  switch(moves){
    case 10:
      starsDom[1].firstElementChild.classList.add('fa-star-o');
      break;
    case 5:
      starsDom[2].firstElementChild.classList.add('fa-star-o');
      break;
  }
}
// print score and moves with winner message
function hasWon(moves){
  var starsDom = document.getElementsByClassName('star');
  var score = document.querySelector('.container');
  var stars = 3;
  var i;
  for(i = 0; i < starsDom.length; i++){
    if(starsDom[i].firstElementChild.classList.contains('fa-star-o')){
      stars -= 1;
    }
  }

  // Get the modal
  var modal = document.getElementById('myModal');
  var span = document.getElementsByClassName("close")[0];
  var p = document.createElement("p");
  p.textContent = `You Have Won!\n Current Score Is ${stars} Stars\n Game Completed In ${moves} Moves\n. Time Taken: ${Math.floor(totalSeconds / 60)}:${(totalSeconds % 60)}`;
  modal.firstElementChild.appendChild(p);
  // open the modal
    modal.style.display = "block";

  // When the user clicks on x close the modal
  span.onclick = function() {
      modal.style.display = "none";
  }

  // close model on outside
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }
}





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
