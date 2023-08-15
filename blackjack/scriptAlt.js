// Define suit and rank, then combine to create a deck
const suits = ["Spades", "Hearts", "Clovers", "Diamonds"];
const ranks = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];

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

const deckAlt = suits.flatMap((suit) => {
  return ranks.map((rank) => ({
    name: `${rank} of ${suit}`,
    suit: suit,
    rank: rank,
    value: cardValue[rank],
  }));
});

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

playDeckAlt = shuffleDeck(deckAlt);

//////////////////////////////////////////////////

// var testHand = [];

// testHand[0] = playDeckAlt.pop();
// testHand[1] = playDeckAlt.pop();
// // testHand[2] = playDeckAlt.pop();
// // testHand[3] = playDeckAlt.pop();

// console.log(testHand);
// console.log(testHand.length);

// var points = testHand.reduce((accumulate, { value }) => accumulate + value, 0);
// var noOfAces = testHand.reduce((accumulate, { rank }) => accumulate + (rank == "Ace"), 0);
// console.log(points);
// console.log(noOfAces);

// const cardList = document.getElementById("NPC1Hand");
// testHand.forEach(({ name }) => {
//   const li = document.createElement("li");
//   li.textContent = name;
//   cardList.appendChild(li);
// });

// const point = document.getElementById("NPC1Point");
// point.innerHTML = "Current Point: " + points;

// // Blackjack Check
// var cards = testHand.map(({ rank }) => rank);
// isBlackJack =
//   cards.length == 2 &&
//   cards.includes("Ace") &&
//   (cards.includes("King") || cards.includes("Queen") || cards.includes("Jack") || cards.includes("10"));
// console.log(cards);
// console.log(isBlackJack);

//////////////////////////////////////////////////

// Deal a card
function dealCard(shuffledDeck) {
  return shuffledDeck.pop();
}

function hit(player) {
  player[player.length + 1] = dealCard(shuffledDeck);
}

function PlayerPropertiesAlt() {
  return {
    hand: [],
    noOfAces: 0,
    point: 0,
    action: ["Hit", "Stand"], // This will be split, double down, surrender or insurance option
    status: "Playing", // This will be Playing or Finished
    result: "", // This will be Bust, Blackjack or the score at stand
    idTag: "",
    updateHandStats: function () {
      // Count points
      this.point = this.hand.reduce((accumulate, { value }) => accumulate + value, 0);

      // Number of Aces
      this.noOfAces = this.hand.reduce((accumulate, { rank }) => accumulate + (rank == "Ace"), 0);

      // Account for scores higher than 21 with at least one ace
      while (this.point > 21 && this.noOfAces > 0) {
        this.point = this.point - 10;
        this.noOfAces = this.noOfAces - 1;
      }

      // Check for Blackjack
      var cards = this.hand.map(({ rank }) => rank);
      if (
        cards.length == 2 &&
        cards.includes("Ace") &&
        (cards.includes("King") || cards.includes("Queen") || cards.includes("Jack") || cards.includes("10"))
      ) {
        this.result = "Blackjack";
        this.status = "Finish";
      }

      // Update status if player bust
      if (this.point > 21) {
        this.result = "Bust";
        this.status = "Finish";
      }
    },
    displayCards: function () {
      // Display Cards as a list
      const cardList = document.getElementById(this.idTag + "Hand");
      this.hand.forEach(({ name }) => {
        const li = document.createElement("li");
        li.textContent = name;
        cardList.appendChild(li);
      });

      // Display Points
      const point = document.getElementById(this.idTag + "Point");
      if (this.status == "Playing") {
        point.innerHTML = "Current Point: " + this.point;
      } else {
        point.innerHTML = this.result;
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
    standFunction: function () {
      this.status = "Finish";
      this.result = "Final Score: " + this.point.toString();
    },
    resetPlayer: function () {
      this.status = "Playing";
      this.point = 0;
      this.noOfAces = 0;
      this.hand = [];
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
    resetPlayer: function () {
      this.status = "Playing";
      this.point = 0;
      this.noOfAces = 0;
      this.hand = [];
    },
  };
}

const npc1 = PlayerPropertiesAlt();
const npc2 = PlayerPropertiesAlt();
const npc3 = PlayerPropertiesAlt();
const npc4 = PlayerPropertiesAlt();
const player = PlayerPropertiesAlt();
const dealer = PlayerPropertiesAlt();

npc1.idTag = "NPC1";
npc2.idTag = "NPC2";
npc3.idTag = "NPC3";
npc4.idTag = "NPC4";
player.idTag = "Player";
dealer.idTag = "Dealer";

const allPlayers = [npc1, npc2, npc3, npc4, player, dealer];
const npcs = [npc1, npc2, npc3, npc4, player];

// Important Parameters
const delayTime = 1000;

async function dealCardWithDelay(player, deck, delayTime) {
  await delay(delayTime);
  player.hand.push(dealCard(deck));
  player.updateHandStats();
  player.clearDisplay();
  player.displayCards();
}

async function performNPCTurnWithDelay(npc, deck, delayTime) {
  await delay(delayTime);
  if (npc.hand.length < 5 && npc.point < 17) {
    npc.hitFunction(deck);
    npc.updateHandStats();
    npc.clearDisplay();
    npc.displayCards();
    await delay(delayTime);
  } else {
    npc.standFunction();
    npc.clearDisplay();
    npc.displayCards();
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const continueButton = document.getElementById("continueButton");
async function waitForUserInput() {
  return new Promise((resolve) => {
    continueButton.addEventListener("click", () => {
      resolve();
    });
  });
}

async function newGame() {
  const message = document.querySelector("#Message");
  const newGameButton = document.querySelector("#NewGameButton");

  // Clear display
  for (let player of allPlayers) {
    player.clearDisplay();
    player.resetPlayer();
  }

  newGameButton.innerHTML = "";

  // Shuffle the deck
  let shuffledDeck = shuffleDeck(deckAlt);

  console.log("players initialised with success");
  message.innerHTML = "Dealing out cards";

  // Deal initial two cards
  const initialDeal = 2;
  for (let i = 0; i < initialDeal; i++) {
    for (let player of allPlayers) {
      await dealCardWithDelay(player, shuffledDeck, delayTime);
    }
  }

  console.log("cards dealt with success");

  // Each NPC has their turn
  for (const npc of npcs) {
    message.innerHTML = `${npc.idTag}'s turn`;
    while (npc.status == "Playing") {
      await performNPCTurnWithDelay(npc, shuffledDeck, delayTime);
    }
  }

  console.log("all npcs completed turn with success");

  // Player's turn here

  message.innerHTML = `Dealer's turn`;
  await waitForUserInput();

  // Dealer has the final turn
  while (dealer.hand.length < 5 && dealer.point < 17) {
    dealer.hitFunction(shuffledDeck);
    console.log(dealer.hand);
    dealer.updateHandStats();
    dealer.clearDisplay();
    // dealer.displayCardsFinal();
    dealer.displayCards();
    await delay(1000);
  }

  // Check who has won goes here
  message.innerHTML = `Game is finished`;

  newGameButton.innerHTML = `<button onclick="newGame()" id="NewGame">New Game</button>`;
}
