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

function PlayerProperties() {
  return {
    hand: [],
    action: ["Hit", "Stand"],
    point: 0,
    status: "Playing",
    idTag: "",
    noOfAces: 0,
    updateHandStats: function () {
      // Count points
      this.point = this.hand
        .map((card) => cardValue[card.substring(0, card.indexOf(" "))])
        .reduce((accumulate, currentVal) => accumulate + currentVal, 0);

      // Number of Aces
      let cardReduced = this.hand.map((card) => card.substring(0, card.indexOf(" ")));
      this.noOfAces = 0;
      for (let i = 0; i < cardReduced.length; i++) {
        if (cardReduced[i] === "Ace") {
          this.noOfAces = this.noOfAces + 1;
        }
      }

      // Account for aces if points are greater than 21
      while (this.point > 21 && this.noOfAces > 0) {
        this.point = this.point - 10;
        this.noOfAces = this.noOfAces - 1;
      }

      // Blackjack Check
      if (
        this.hand.length == 2 &&
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

function DealerProperties() {
  return {
    hand: [],
    action: ["Hit", "Stand"],
    point: 0,
    truePoint: 0,
    status: "Playing",
    idTag: "",
    noOfAces: 0,
    updateHandStats: function () {
      console.log(this.hand);
      // Count points
      this.truePoint = this.hand
        .map((card) => cardValue[card.substring(0, card.indexOf(" "))])
        .reduce((accumulate, currentVal) => accumulate + currentVal, 0);
      this.point = cardValue[this.hand[0].substring(0, this.hand[0].indexOf(" "))];

      // Number of Aces
      let cardReduced = this.hand.map((card) => card.substring(0, card.indexOf(" ")));
      this.noOfAces = 0;
      for (let i = 0; i < cardReduced.length; i++) {
        if (cardReduced[i] === "Ace") {
          this.noOfAces = this.noOfAces + 1;
        }
      }

      // Account for aces if points are greater than 21
      while (this.point > 21 && this.noOfAces > 0) {
        this.point = this.point - 10;
        this.noOfAces = this.noOfAces - 1;
      }

      // Blackjack Check. If dealer has blackjack, the game instantly ends.
      if (this.hand.length == 2 && cardReduced[0].includes("Ace")) {
        if (
          cardReduced.includes("King") ||
          cardReduced.includes("Queen") ||
          cardReduced.includes("Jack") ||
          cardReduced.includes("10")
        ) {
          this.Status = "Blackjack";
        }
      }

      if (this.truePoint > 21) {
        this.status = "Bust";
      }
    },
    displayCards: function () {
      const cardList = document.getElementById(this.idTag + "Hand");
      let li = document.createElement("li");
      li.textContent = this.hand[0];
      cardList.appendChild(li);

      const point = document.getElementById(this.idTag + "Point");
      if (this.status !== "Playing") {
        point.innerHTML = this.status;
      } else {
        point.innerHTML = "Current Point: " + this.point;
      }
    },
    displayCardsFinal: function () {
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
        point.innerHTML = "Current Point: " + this.truePoint;
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

// let playingDeck = deck.concat(deck).concat(deck).concat(deck).concat(deck);
// let playingDeck = deck.concat(deck).concat(deck);
let playingDeck = deck;

// function newGame() {
//   // Initialise Players and dealer
//   const npc1 = PlayerProperties();
//   const npc2 = PlayerProperties();
//   const npc3 = PlayerProperties();
//   const npc4 = PlayerProperties();
//   const player = PlayerProperties();
//   const dealer = DealerProperties();

//   npc1.idTag = "NPC1";
//   npc2.idTag = "NPC2";
//   npc3.idTag = "NPC3";
//   npc4.idTag = "NPC4";
//   player.idTag = "Player";
//   dealer.idTag = "Dealer";

//   const allPlayers = [npc1, npc2, npc3, npc4, player, dealer];
//   const npcs = [npc1, npc2, npc3, npc4, player];

//   // Shuffle the deck
//   let shuffledDeck = shuffleDeck(playingDeck);

//   const initialDeal = 2;
//   for (let i = 0; i < initialDeal; i++) {
//     for (let player of allPlayers) {
//       player.hand.push(dealCard(shuffledDeck));
//       player.updateHandStats();
//       player.clearDisplay();
//       player.displayCards();
//     }
//   }

//   function performNPCTurn(npc) {
//     const delay = 1000;

//     const intervalId = setInterval(() => {
//       if (npc.hand.length < 5 && npc.point < 17) {
//         npc.hitFunction(shuffledDeck);
//         npc.updateHandStats();
//         npc.clearDisplay();
//         npc.displayCards();
//       } else {
//         clearInterval(intervalId);
//         setTimeout(() => {
//           performNextNPCTurn();
//         });
//       }
//     }, delay);
//   }

//   let npcIndex = 0;
//   function performNextNPCTurn() {
//     if (npcIndex < npcs.length) {
//       const npc = npcs[npcIndex];
//       performNPCTurn(npc);
//       npcIndex++;
//     } else {
//       while (dealer.hand.length < 5 && dealer.truePoint < 17) {
//         dealer.hitFunction(shuffledDeck);
//         dealer.updateHandStats();
//         dealer.clearDisplay();
//         dealer.displayCardsFinal();
//       }
//     }
//   }

//   performNextNPCTurn();

//   console.log("Deck count: " + shuffledDeck.length);

//   // Final check of who won goes here
// }

async function newGame() {
  const message = document.querySelector("#Message");
  // Initialise Players and dealer
  const npc1 = PlayerProperties();
  const npc2 = PlayerProperties();
  const npc3 = PlayerProperties();
  const npc4 = PlayerProperties();
  const player = PlayerProperties();
  const dealer = DealerProperties();

  npc1.idTag = "NPC1";
  npc2.idTag = "NPC2";
  npc3.idTag = "NPC3";
  npc4.idTag = "NPC4";
  player.idTag = "Player";
  dealer.idTag = "Dealer";

  const allPlayers = [npc1, npc2, npc3, npc4, player, dealer];
  const npcs = [npc1, npc2, npc3, npc4, player];

  // Shuffle the deck
  let shuffledDeck = shuffleDeck(playingDeck);

  console.log("players initialised with success");
  console.log(shuffledDeck.length);
  message.innerHTML = "Dealing out cards";

  const initialDeal = 2;
  for (let i = 0; i < initialDeal; i++) {
    for (let player of allPlayers) {
      await dealCardWithDelay(player, shuffledDeck, 1000);
    }
  }

  console.log("cards dealt with success");
  console.log(shuffledDeck.length);

  // Each NPC has their turn
  for (const npc of npcs) {
    message.innerHTML = `${npc.idTag}'s turn`;
    await performNPCTurnWithDelay(npc, shuffledDeck, 1000);
  }

  console.log("npc completed turn with success");
  console.log(shuffledDeck.length);

  // Dealer has the final turn
  while (dealer.hand.length < 5 && dealer.truePoint < 17) {
    message.innerHTML = `Dealer's turn`;
    dealer.hitFunction(shuffledDeck);
    dealer.updateHandStats();
    dealer.clearDisplay();
    dealer.displayCardsFinal();
    await delay(1000);
  }

  // Check who has won goes here
}

async function dealCardWithDelay(player, deck, delayTime) {
  await delay(delayTime);
  player.hand.push(dealCard(deck));
  player.updateHandStats();
  player.clearDisplay();
  player.displayCards();
}

async function performNPCTurnWithDelay(npc, deck, delayTime) {
  await delay(delayTime);
  console.log(npc.idTag + " turn");
  while (npc.hand.length < 5 && npc.point < 17) {
    npc.hitFunction(deck);
    npc.updateHandStats();
    npc.clearDisplay();
    npc.displayCards();
    await delay(delayTime);
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
