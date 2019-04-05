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


function generateCard(card) {
	return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
 }




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



function initGame() {
	const deck = document.querySelector('.deck');
	const cardHTML = shuffle(cards).map(function (card) {
		return generateCard(card);
		
	});

	// console.log(cardHTML);
	// cardHTML.join('');
	// console.log(cardHTML);
	deck.innerHTML = cardHTML.join('');
	// console.log(deck);
}

initGame();
//collect all cards in allCards
const allCards = document.querySelectorAll('.card');
//colecting open card in array
let openCards = [];
// Adding listener to every card and open it by click
allCards.forEach(function(card) {
	card.addEventListener('click', function(e) {
		if(!(card.classList.contains ('open')) && !(card.classList.contains('show')) && !(card.classList.contains('match'))){
			openCards.push(card);
			card.classList.add('open' , 'show', 'play');
			





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

					if(openCards[0].dataset.card == openCards[1].dataset.card) {
						openCards[0].classList.add('match');
						openCards[0].classList.remove('open');
						openCards[0].classList.remove('show');

						openCards[1].classList.add('match');
						openCards[1].classList.remove('open');
						openCards[1].classList.remove('show');
						openCards = [];
					}


					// if no match hide
					setTimeout(function () {
						openCards.forEach(function(card) {
							card.classList.remove('open', 'show',);
						});

						openCards=[];
					}, 200);
					
				}
		}	
	});
});