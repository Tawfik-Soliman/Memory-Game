/*
 * Create a list that holds all of your cards
 */

const cards = ['fa-diamond','fa-diamond',
				'fa-paper-plane-o','fa-paper-plane-o',
				'fa-anchor','fa-anchor',
				'fa-bolt','fa-bolt',
				'fa-cube','fa-cube',
				'fa-leaf','fa-leaf',
				'fa-bicycle','fa-bicycle',
				'fa-bomb','fa-bomb'
			  ];

//generate Li to be shuffled then attached to the deck
function generateCard(card) {
	return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
 }


//Declaring the varaibles
const rating = document.querySelector('.stars');
const restart = document.querySelector('.restart')
let showResults = document.querySelector('.Modal-results');
let modalRating = document.querySelector('.Modal-rating');
let moves = 0;
let sec = 0;
let min = 0;
let clock;
let matches = 0;



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


// Generating cards dynamically
function initGame() {
	const deck = document.querySelector('.deck');
	const cardHTML = shuffle(cards).map(function (card) {
		return generateCard(card);
		
	});

	// console.log(cardHTML);
	// cardHTML.join('');
	// console.log(cardHTML);
	deck.innerHTML = cardHTML.join(''); //Put generated cards inside the deck after removing ,
	// console.log(deck);
}

// disable opening cards after opening two cards
function disable() {
	allCards.forEach(function(card) {
		card.classList.add('disable');
		});
}

// Enable opening cards again
function enable() {
	allCards.forEach(function(card) {
		card.classList.remove('disable');
		});
}


//  forming a timer which count seconds and minutes 
function timer() {
		clock = setInterval(function()  {
		let seconds = document.querySelector('.sec');
		sec ++;
		seconds.innerText = sec;
		if (sec == 60) {
			sec = 0;
			min ++;
			let minutes = document.querySelector('.min');
			seconds.innerText = sec;
			minutes.innerText = min;
		}
	},1000);
}

// stop the timer
function stopTimer() {
	clearInterval(clock);
}

// restart the game 
restart.addEventListener('click', function() {
	location.reload();
});

initGame();
//collect all cards in allCards
const allCards = document.querySelectorAll('.card');
//colecting open card in array
let openCards = [];
// Adding listener to card and open it by click
	allCards.forEach(function(card) {

		card.addEventListener('click', function(e) {
			if(!(card.classList.contains ('open')) && !(card.classList.contains('show')) && !(card.classList.contains('match')) && !(card.classList.contains('disable'))){
				openCards.push(card); //Adding opened card to openCards array
				
				card.classList.add('open' , 'show', 'play');
				if (openCards.length == 1) {
					if (min ===0 && sec === 0) { 
						
						timer(); //stating the timer with first move
					}
					
				}
				




				// if (openCards.length ===1){
				// 	let firstCardType = openCards[0].querySelector('i').classList.item(1);
				// 	console.log(firstCardType);
				// }

				// else if (openCards.length ===2){
				// 	let secondCardType = openCards[1].querySelector('i').classList.item(1);
				// 	console.log(secondCardType);
				// }

				// if (firstCardType === secondCardType) {
				// 	openCards.forEach(function(card) {
				// 				card.classList.add('match');
				// 				card.classList.remove('show');
				// 				openCards=[];
				// 			});
				// }

				// console.log('Open Cards:', openCards.length);
				
					if (openCards.length == 2)	 {
						
						//stop opening cards after opening two cards
						disable();
						//Increment moves counter
						moves += 1;
						
						// display # of moves on screen
						let move = document.querySelector('.moves');
						move.innerText = moves;
						

						if (moves === 12) {
							// rating.removeChild(rating.childNodes[0]);  
							rating.lastElementChild.remove(); //remove star from rating 
						}
						else if (moves === 20) {
							rating.lastElementChild.remove(); //remove star from rating
						}
						
							// check the two opened cards for a match
						if(openCards[0].dataset.card == openCards[1].dataset.card) {
							openCards[0].classList.add('match');
							openCards[0].classList.remove('open');
							openCards[0].classList.remove('show');

							openCards[1].classList.add('match');
							openCards[1].classList.remove('open');
							openCards[1].classList.remove('show');
							
							// empty openCards array for new cards
							openCards = [];
							//increment match
							matches ++;
							// gamed solved and all cards matched 
							if (matches == 8) {
								stopTimer();    
								finalScore();    // get final score
								toggleModal();   // display modal on screen
							}
							//Enable opening cards after match occured
							enable();
						}


						// if no match hide cards
						setTimeout(function () {
							openCards.forEach(function(card) {
								card.classList.remove('open', 'show',);
							});

							openCards=[];   //empty open cards array 
							
							//Enable opening cards after mis match 
							enable();

						}, 1000);

						
					}
			}	
		});
	});

// Declaring Modal
var modal = document.querySelector(".modal");
var closeButton = document.querySelector(".close-button");
closeButton.addEventListener("click", toggleModal);  //Adding listener to the modal close button


//get the final score and put it inside the modal
function finalScore() {
	showResults.innerHTML= ` ${moves} Moves <br>
	in <br>${min}min ${sec}sec`;
	modalRating.innerHTML = rating.innerHTML;

}

// show or hide modal on screen
function toggleModal() {
    modal.classList.toggle("show-modal");
}



