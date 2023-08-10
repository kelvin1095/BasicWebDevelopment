// Define suit and rank, then combine to create a deck
const suits = ["Spades", "Hearts", "Clovers", "Diamonds"];
const ranks = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];

const deck = suits.flatMap((suit) => {
  return ranks.map((rank) => `${rank} of ${suit}`);
});

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
  Jack: 10,
  Queen: 10,
  King: 10,
  Ace: 11,
};

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

// Deal a card
function dealCard(shuffledDeck) {
  return shuffledDeck.pop();
}

function hit(player) {
  player[player.length + 1] = dealCard(shuffledDeck);
}

// let playingDeck = deck.concat(deck).concat(deck).concat(deck).concat(deck);
let playingDeck = deck;

function PlayerProperties() {
  return {
    hand: [],
    action: ["Hit", "Stand"],
    point: 0,
    status: "Playing",
    idTag: "",
    noOfAces: 0,
    updateHandStats: function () {
      this.point = this.hand
        .map((card) => cardValue[card.substring(0, card.indexOf(" "))])
        .reduce((accumulate, currentVal) => accumulate + currentVal, 0);

      let cardReduced = this.hand.map((card) => card.substring(0, card.indexOf(" ")));
      for (let i = 0; i < cardReduced.length; i++) {
        if (cardReduced[i] === "Ace") {
          this.noOfAces = this.noOfAces + 1;
        }
      }

      if (
        cardReduced.includes("Ace") &&
        (cardReduced.includes("King") ||
          cardReduced.includes("Queen") ||
          cardReduced.includes("Jack") ||
          cardReduced.includes("10"))
      ) {
        this.status = "Blackjack!";
      }

      if (this.point > 21) {
        this.status = "Bust";
      }
    },
    displayCards: function () {
      const cardList = document.getElementById(this.idTag + "Hand");
      this.hand.forEach((card) => {
        const li = document.createElement("li");
        li.textContent = card;
        cardList.appendChild(li);
      });
      const point = document.getElementById(this.idTag + "Point");
      if (this.status !== "Playing") {
        point.innerHTML = this.status;
      } else {
        point.innerHTML = "Current Point: " + this.point;
      }
    },
    clearDisplay: function () {
      const cardList = document.getElementById(this.idTag + "Hand");
      cardList.innerHTML = "";
      const point = document.getElementById(this.idTag + "Point");
      point.innerHTML = "";
    },
    hitFunction: function (deck) {
      this.hand.push(dealCard(deck));
    },
  };
}

function newGame() {
  const npc1 = PlayerProperties();
  const npc2 = PlayerProperties();
  const npc3 = PlayerProperties();
  const npc4 = PlayerProperties();
  const player = PlayerProperties();
  const dealer = PlayerProperties();

  npc1.idTag = "NPC1";
  npc2.idTag = "NPC2";
  npc3.idTag = "NPC3";
  npc4.idTag = "NPC4";
  player.idTag = "Player";
  dealer.idTag = "Dealer";

  npc1.clearDisplay();
  npc2.clearDisplay();
  npc3.clearDisplay();
  npc4.clearDisplay();
  player.clearDisplay();
  dealer.clearDisplay();

  let shuffledDeck = shuffleDeck(playingDeck);

  npc1.hand.push(dealCard(shuffledDeck));
  npc1.hand.push(dealCard(shuffledDeck));

  npc2.hand.push(dealCard(shuffledDeck));
  npc2.hand.push(dealCard(shuffledDeck));

  npc3.hand.push(dealCard(shuffledDeck));
  npc3.hand.push(dealCard(shuffledDeck));

  npc4.hand.push(dealCard(shuffledDeck));
  npc4.hand.push(dealCard(shuffledDeck));

  player.hand.push(dealCard(shuffledDeck));
  player.hand.push(dealCard(shuffledDeck));

  dealer.hand.push(dealCard(shuffledDeck));
  dealer.hand.push(dealCard(shuffledDeck));

  npc1.updateHandStats();
  npc2.updateHandStats();
  npc3.updateHandStats();
  npc4.updateHandStats();
  player.updateHandStats();
  dealer.updateHandStats();

  npc1.displayCards();
  npc2.displayCards();
  npc3.displayCards();
  npc4.displayCards();
  player.displayCards();
  dealer.displayCards();

  while (npc1.point < 19) {
    npc1.hitFunction(shuffledDeck);
    npc1.updateHandStats();
    npc1.clearDisplay();
    npc1.displayCards();
  }

  while (npc2.point < 19) {
    npc2.hitFunction(shuffledDeck);
    npc2.updateHandStats();
    npc2.clearDisplay();
    npc2.displayCards();
  }

  while (npc3.point < 19) {
    npc3.hitFunction(shuffledDeck);
    npc3.updateHandStats();
    npc3.clearDisplay();
    npc3.displayCards();
  }

  while (npc4.point < 19) {
    npc4.hitFunction(shuffledDeck);
    npc4.updateHandStats();
    npc4.clearDisplay();
    npc4.displayCards();
  }

  // Player's turn here

  // Dealer's turn here
  while (dealer.point < 17) {
    dealer.hitFunction(shuffledDeck);
    dealer.updateHandStats();
    dealer.clearDisplay();
    dealer.displayCards();
  }

  console.log("Deck count: " + shuffledDeck.length);
}

//Print card as a list and points underneath
// function printAsList(array, id) {
//   const myList = document.getElementById(id);
//   array.forEach((item) => {
//     const li = document.createElement("li");
//     li.textContent = item;
//     myList.appendChild(li);
//   });

//   let point = array
//     .map((card) => cardValue[card.substring(0, card.indexOf(" "))])
//     .reduce((accumulate, currentVal) => accumulate + currentVal, 0);
//   myList.parentNode.prepend("Current Point: " + point);
// }

// function point(hand, id) {
//   const myList = document.getElementById(id);
//   let point = hand
//     .map((card) => cardValue[card.substring(0, card.indexOf(" "))])
//     .reduce((accumulate, currentVal) => accumulate + currentVal, 0);
//   myList.append(point);
// }

// Need to be careful of the dealing order!!!
// function newGame() {
//   let shuffledDeck = shuffleDeck(playingDeck);
//   document.getElementById("NPC1Hand").innerHTML = "";
//   document.getElementById("NPC1Hand").innerHTML = "";
//   document.getElementById("NPC2Hand").innerHTML = "";
//   document.getElementById("NPC3Hand").innerHTML = "";
//   document.getElementById("NPC4Hand").innerHTML = "";
//   document.getElementById("PlayerHand").innerHTML = "";
//   document.getElementById("DealerHand").innerHTML = "";

//   let npc1Hand = [];
//   npc1Hand[0] = dealCard(shuffledDeck);
//   npc1Hand[1] = dealCard(shuffledDeck);

//   let npc2Hand = [];
//   npc2Hand[0] = dealCard(shuffledDeck);
//   npc2Hand[1] = dealCard(shuffledDeck);

//   let npc3Hand = [];
//   npc3Hand[0] = dealCard(shuffledDeck);
//   npc3Hand[1] = dealCard(shuffledDeck);

//   let npc4Hand = [];
//   npc4Hand[0] = dealCard(shuffledDeck);
//   npc4Hand[1] = dealCard(shuffledDeck);

//   let playerHand = [];
//   playerHand[0] = dealCard(shuffledDeck);
//   playerHand[1] = dealCard(shuffledDeck);

//   let dealerHand = [];
//   dealerHand[0] = dealCard(shuffledDeck);
//   dealerHand[1] = dealCard(shuffledDeck);

//   printAsList(npc1Hand, "NPC1Hand");
//   // point(npc1Hand, "NPC1Hand");

//   printAsList(npc2Hand, "NPC2Hand");
//   printAsList(npc3Hand, "NPC3Hand");
//   printAsList(npc4Hand, "NPC4Hand");
//   printAsList(playerHand, "PlayerHand");
//   printAsList(dealerHand, "DealerHand");

//   console.log(shuffledDeck.length);
// }
