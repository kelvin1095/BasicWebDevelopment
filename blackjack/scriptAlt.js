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

// Important Parameters
const delayTime = 200;
const NPCPointThreshold = 17;
const initialCards = 2;
const maxCards = 5;
const maxPoints = 21;
const dealerThreshold = 16;

const deck = suits.flatMap((suit) => {
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

// Deal a card
function dealCard(shuffledDeck) {
  return shuffledDeck.pop();
}

function PlayerProperties(idTag) {
  return {
    hand: [],
    noOfAces: 0,
    point: 0,
    action: ["Hit", "Stand"], // This will be split, double down, surrender or insurance option
    status: "Playing", // This will be Playing or Finished
    result: "", // This will be Bust, Blackjack or the score at stand
    final: "", // This will be to indicate if a player win/lose/tie and how
    idTag: idTag,
    updateHandStats: function () {
      // Count points
      this.point = this.hand.reduce((accumulate, { value }) => accumulate + value, 0);

      // Number of Aces
      this.noOfAces = this.hand.reduce((accumulate, { rank }) => accumulate + (rank == "Ace"), 0);

      // Account for scores higher than 21 with at least one ace
      while (this.point > maxPoints && this.noOfAces > 0) {
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

      // Update status if player scores 21
      if (this.point == maxPoints && cards.length !== 2) {
        this.result = "Final Score: 21";
        this.status = "Finish";
      }

      // Update status if max card count
      if (cards.length == maxCards) {
        this.result = "Final Score: " + this.point;
        this.status = "Finish";
      }

      // Update status if player bust
      if (this.point > maxPoints) {
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
    finalFunction: function (dealerResult, dealerPoint) {
      if (dealerResult == "Blackjack" && this.result == "Blackjack") {
        this.final = "Tie, blackjack";
      } else if (dealerResult == "Blackjack") {
        this.final = "Lose, dealer blackjack";
      } else if (this.result == "Blackjack") {
        this.final = "Win, blackjack";
      } else if (this.result == "Bust") {
        this.final = "Lose, bust";
      } else if (dealerResult == "Bust" && this.result !== "Bust") {
        this.final = "Win, dealer bust";
      } else if (dealerPoint > this.point) {
        this.final = "Lose, points";
      } else if (dealerPoint < this.point) {
        this.final = "Win, points";
      } else if (dealerPoint == this.point) {
        this.final = "Tie, points";
      }
    },
    resetPlayer: function () {
      this.status = "Playing";
      this.result = "";
      this.point = 0;
      this.noOfAces = 0;
      this.hand = [];
    },
  };
}

function DealerProperties(idTag) {
  return {
    hand: [],
    noOfAces: 0,
    point: 0,
    displayPoint: 0,
    action: ["Hit", "Stand"], // This will be split, double down, surrender or insurance option
    status: "Playing", // This will be Playing or Finished
    result: "", // This will be Bust, Blackjack or the score at stand
    final: "", // This will be to indicate if a player win/lose/tie and how
    idTag: idTag,
    updateHandStats: function () {
      // Count points
      this.point = this.hand.reduce((accumulate, { value }) => accumulate + value, 0);
      this.displayPoint = this.hand[0].value;

      // Number of Aces
      this.noOfAces = this.hand.reduce((accumulate, { rank }) => accumulate + (rank == "Ace"), 0);

      // Account for scores higher than 21 with at least one ace
      while (this.point > maxPoints && this.noOfAces > 0) {
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

      // Update status if player scores 21
      if (this.point == maxPoints && cards.length !== initialCards) {
        this.result = "Final Score: 21";
        this.status = "Finish";
      }

      // Update status if max card count
      if (cards.length == maxCards) {
        this.result = "Final Score: " + this.point;
        this.status = "Finish";
      }

      // Update status if player bust
      if (this.point > maxPoints) {
        this.result = "Bust";
        this.status = "Finish";
      }
    },
    displayCards: function () {
      // Display Cards as a list
      const cardList = document.getElementById(this.idTag + "Hand");
      const li = document.createElement("li");
      li.textContent = this.hand[0].name;
      cardList.appendChild(li);

      // Display Points
      const point = document.getElementById(this.idTag + "Point");
      point.innerHTML = "Current Point: " + this.displayPoint;
    },
    displayCardsFinal: function () {
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
      this.result = "";
      this.point = 0;
      this.noOfAces = 0;
      this.hand = [];
    },
  };
}

const npc1 = PlayerProperties("NPC1");
const npc2 = PlayerProperties("NPC2");
const npc3 = PlayerProperties("NPC3");
const npc4 = PlayerProperties("NPC4");
const player = PlayerProperties("Player");
const dealer = DealerProperties("Dealer");

const allPlayers = [npc1, npc2, npc3, npc4, player, dealer];
const players = [npc1, npc2, npc3, npc4, player];
const npcs = [npc1, npc2, npc3, npc4];

function delay(ms) {
  // console.log(new Date());
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Deal Cards
async function dealCardWithDelay(player, deck, delayTime) {
  await delay(delayTime);
  player.hitFunction(deck);
  player.updateHandStats();
  player.clearDisplay();
  player.displayCards();
}

// NPC Turn
async function performNPCTurnWithDelay(npc, deck, delayTime, NPCPointThreshold) {
  await delay(delayTime);
  if (npc.hand.length < maxCards && npc.point < NPCPointThreshold) {
    npc.hitFunction(deck);
    npc.updateHandStats();
    npc.clearDisplay();
    npc.displayCards();
    // await delay(delayTime);
  } else {
    npc.standFunction();
    npc.clearDisplay();
    npc.displayCards();
  }
}

// Monitor the hit/stand button
const hitButton = document.getElementById("HitButton");
const standButton = document.getElementById("StandButton");

function onHitButtonClick() {
  onHitButtonClick.player.hitFunction(onHitButtonClick.deck);
  onHitButtonClick.player.updateHandStats();
  onHitButtonClick.player.clearDisplay();
  onHitButtonClick.player.displayCards();
  removeEventListeners();
  onHitButtonClick.resolve();
}

function onStandButtonClick() {
  onStandButtonClick.player.standFunction();
  onHitButtonClick.player.clearDisplay();
  onHitButtonClick.player.displayCards();
  removeEventListeners();
  onStandButtonClick.resolve();
}

function removeEventListeners() {
  hitButton.removeEventListener("click", onHitButtonClick);
  standButton.removeEventListener("click", onStandButtonClick);
}

async function waitForUserInput(player, deck) {
  return new Promise((resolve) => {
    onHitButtonClick.player = player;
    onHitButtonClick.deck = deck;
    onHitButtonClick.resolve = resolve;

    onStandButtonClick.player = player;
    onStandButtonClick.resolve = resolve;

    hitButton.addEventListener("click", onHitButtonClick);
    standButton.addEventListener("click", onStandButtonClick);
  });
}

// Game UI Elements
const message = document.querySelector("#Message");
const newGameButton = document.querySelector("#NewGameButton");
const resultDisplay = document.getElementById("ResultList");

// let playDeck = deck.concat(deck).concat(deck).concat(deck).concat(deck);
let playDeck = deck.concat(deck).concat(deck);
// let playDeck = deck;

async function newGame() {
  // Clear display
  for (let player of allPlayers) {
    player.clearDisplay();
    player.resetPlayer();
  }
  resultDisplay.innerHTML = "";
  newGameButton.innerHTML = "";

  // Shuffle the deck
  let shuffledDeck = shuffleDeck(playDeck);

  console.log("players initialised with success");
  message.innerHTML = "Dealing out cards";

  // Deal initial two cards
  const initialDeal = initialCards;
  for (let i = 0; i < initialDeal; i++) {
    for (let player of allPlayers) {
      await dealCardWithDelay(player, shuffledDeck, delayTime);
    }
  }

  // Dealer Blackjack Check
  console.log(dealer.hand[0].name, dealer.hand[1].name);
  if (dealer.result === "Blackjack") {
    message.innerHTML = "Dealer has Blackjack. Game Over!";
    dealer.clearDisplay();
    dealer.displayCardsFinal();
    // TODO - will need to do results here. If another player has blackjack then draw
    newGameButton.innerHTML = `<button onclick="newGame()" id="NewGame">New Game</button>`;
    return;
  }

  console.log("cards dealt with success");

  // Each NPC has their turn
  for (let npc of npcs) {
    await delay(delayTime);
    message.innerHTML = `${npc.idTag}'s turn`;
    while (npc.status == "Playing") {
      await performNPCTurnWithDelay(npc, shuffledDeck, delayTime, NPCPointThreshold);
    }
  }

  console.log("all npcs completed turn with success");
  await delay(delayTime);

  // Player's turn here
  message.innerHTML = `Your turn`;
  while (player.status == "Playing" && player.hand.length <= maxCards) {
    await waitForUserInput(player, shuffledDeck);
  }

  // Dealer has the final turn
  message.innerHTML = `Dealer's turn`;

  // Reveal hidden card
  await delay(delayTime);
  dealer.clearDisplay();
  dealer.displayCardsFinal();
  await delay(delayTime);

  // Loop through
  while (dealer.status == "Playing") {
    if (dealer.hand.length < maxCards && dealer.point <= dealerThreshold) {
      dealer.hitFunction(shuffledDeck);
      dealer.updateHandStats();
      dealer.clearDisplay();
      dealer.displayCardsFinal();
      await delay(delayTime);
    } else {
      dealer.standFunction();
    }
  }

  // Check who has won goes here
  message.innerHTML = `Game Over!`;
  let playerScores = [];
  let i = 0;
  for (let npc of players) {
    npc.finalFunction(dealer.result, dealer.point);
    playerScores[i] = { player: npc.idTag, result: npc.final };
    i++;
  }

  playerScores.forEach(({ player, result }) => {
    const li = document.createElement("li");
    li.textContent = `${player}: ${result}`;
    resultDisplay.appendChild(li);
  });

  newGameButton.innerHTML = `<button onclick="newGame()" id="NewGame">New Game</button>`;
}
