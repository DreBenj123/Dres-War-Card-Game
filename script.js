import Deck from "./cards.js";
const CARD_VALUE_MAP = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};
const computerCardSlot = document.querySelector(".computer-card-slot");
const playerCardSlot = document.querySelector(".player-card-slot");
const computerDeckElement = document.querySelector(".computer-deck");
const playerDeckElement = document.querySelector(".player-deck");
const text = document.querySelector(".text");

let playerDeck, computerDeck, inPlay, stop;
var playerFaceUp, playerFaceDown, computerFaceUp, computerFaceDown;

document.addEventListener("click", () => {
  if (stop) {
    startGame();
    return;
  }
  if (inPlay) {
    newRound();
  } else {
    flipCards();
  }
});

startGame();
function startGame() {
  const deck = new Deck();
  deck.shuffle();

  //splitting the deck between players
  const deckMidpoint = Math.ceil(deck.numberOfCards / 2);
  playerDeck = new Deck(deck.cards.slice(0, deckMidpoint));
  computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards));
  inPlay = false;
  stop = false;

  newRound();
}

function newRound() {
  inPlay = false;
  computerCardSlot.innerHTML = "";
  playerCardSlot.innerHTML = "";
  text.innerText = "";
}
function flipCards() {
  inPlay = true;

  const playerCard = playerDeck.pop();
  const computerCard = computerDeck.pop();

  playerCardSlot.appendChild(playerCard.getHTML());
  computerCardSlot.appendChild(computerCard.getHTML());

  updateDeckCount();

  if (roundWinner(playerCard, computerCard)) {
    text.innerText = "Win!";
    playerDeck.push(playerCard);
    playerDeck.push(computerCard);
  } else if (roundWinner(computerCard, playerCard)) {
    text.innerText = "Lose!";
    computerDeck.push(playerCard);
    computerDeck.push(computerCard);
  } else if (roundDraw(playerCard, computerCard)) {
    text.innerText = "It's War!!";
    playerFaceDown = playerDeck.pop();
    computerFaceDown = computerDeck.pop();

    playerFaceUp = playerDeck.pop();
    computerFaceUp = computerDeck.pop();

    playerDeck.push(playerFaceDown);
    computerDeck.push(computerFaceDown);
    playerDeck.push(playerFaceUp);
    computerDeck.push(computerFaceUp);

    if (gameOver(playerDeck)) {
      text.innerText = "You Lose!!!";
      stop = true;
    } else if (gameOver(computerDeck)) {
      text.innerText = "You Win!!!";
      stop = true;
    }
  }
}

//function to count # of cards in deck
function updateDeckCount() {
  computerDeckElement.innerText = computerDeck.numberOfCards;
  playerDeckElement.innerText = playerDeck.numberOfCards;
}
//function for a winner
function roundWinner(cardOne, cardTwo) {
  return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value];
}
//function for game over
function gameOver(deck) {
  returndeck.numberOfCards === 0;
}
//function for round draw
function roundDraw(cardOne, cardTwo) {
  return CARD_VALUE_MAP[cardOne.value] == CARD_VALUE_MAP[cardTwo.value];
}
