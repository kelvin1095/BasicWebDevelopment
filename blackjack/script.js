// Define card points
const cardValue = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 10,
  Q: 10,
  K: 10,
  A: 11,
};

// Define suit and rank, then combine to create a deck
const suits = ["Spades", "Hearts", "Clovers", "Diamonds"];
const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

// console.log(suits);
// console.log(ranks);

const deck = suits.flatMap((suit) => {
  return ranks.map((rank) => `${rank} of ${suit}`);
});

// console.log(deck);

// Function that shuffles a deck (https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)

// function shuffle(array) {
//   let currentIndex = array.length,
//     randomIndex;

//   // While there remain elements to shuffle.
//   while (currentIndex != 0) {
//     // Pick a remaining element.
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex--;

//     // And swap it with the current element.
//     [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
//   }

//   return array;
// }

// console.log(shuffle(deck));

// ATTEMPT AT MY OWN RANDOM FUNCTION
// 1. get n random numbers
// 2. sort the random numbers and take the randomised index
// 3. apply the randomised index to the original array i want to shuffle

function randomNumbers(length) {
  let random = [];
  for (let i = 0; i < deck.length; i++) {
    random[i] = Math.random();
  }
  return random;
}

function shuffleDeck(deck) {
  let random = [];
  for (let i = 0; i < deck.length; i++) {
    random[i] = Math.random();
  }

  let shuffledDeck = random
    .map((number, index) => ({ number, index }))
    .sort((a, b) => a.number - b.number)
    .map((item) => item.index)
    .map((index) => deck[index]);
  return shuffledDeck;
}

// testIndexed = test.map((number, index) => ({ number, index }));
// testIndexedSorted = testIndexed.sort((a, b) => a.number - b.number);
// randomIndex = testIndexedSorted.map((item) => item.index);
// shuffledDeck = randomIndex.map((index) => deck[index]);

let shuffledDeck = shuffleDeck(deck);

// Deal a card
function dealCard(shuffledDeck) {
  return shuffledDeck.pop();
}

// Need to be careful of the dealing order as well!!!

let npc1Hand = [];
npc1Hand[0] = dealCard(shuffledDeck);
npc1Hand[1] = dealCard(shuffledDeck);

let npc2Hand = [];
npc2Hand[0] = dealCard(shuffledDeck);
npc2Hand[1] = dealCard(shuffledDeck);

let npc3Hand = [];
npc3Hand[0] = dealCard(shuffledDeck);
npc3Hand[1] = dealCard(shuffledDeck);

let npc4Hand = [];
npc4Hand[0] = dealCard(shuffledDeck);
npc4Hand[1] = dealCard(shuffledDeck);

let playerHand = [];
playerHand[0] = dealCard(shuffledDeck);
playerHand[1] = dealCard(shuffledDeck);

let dealerHand = [];
dealerHand[0] = dealCard(shuffledDeck);
dealerHand[1] = dealCard(shuffledDeck);

console.log(playerHand);
console.log(shuffledDeck.length);

function point(hand) {
  let help = hand.map((card) => cardValue[card.substring(0, card.indexOf(" "))]);
  let help2 = help.reduce((accumulate, currentVal) => accumulate + currentVal, 0);
  console.log(help2);
}

point(playerHand);
