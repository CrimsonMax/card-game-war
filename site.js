import Deck from "./deck.js";

const CARD_VALUE_MAP = {
  'A': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10
}

const enemyCard = document.querySelector('.enemy-card')
const playerCard = document.querySelector('.player-card')
const enemyDeckElement = document.querySelector('.enemy-deck')
const playerDeckElement = document.querySelector('.player-deck')
const message = document.querySelector('.message')

let playerDeck, enemyDeck, round, stop

document.addEventListener('click', () => {
  if (stop) {
    alert('GAME OVER')
    return
  }

  if (round) {
    cleanTable()
  } else {
    flipCards()
  }
})

startGame()
function startGame() {
  const deck = new Deck()
  deck.shuffle()

  const deckSplit = Math.ceil(deck.numberOfCards / 2)
  playerDeck = new Deck(deck.cards.slice(0, deckSplit))
  enemyDeck = new Deck(deck.cards.slice(deckSplit, deck.numberOfCards))
  round = false
  stop = false

  cleanTable()
}

function cleanTable() {
  round = false
  enemyCard.innerHTML = ''
  playerCard.innerHTML = ''
  message.innerHTML = ''

  updateCount()
}

function flipCards() {
  round = true

  const playerWeapon = playerDeck.pop()
  const enemyWeapon = enemyDeck.pop()

  playerCard.appendChild(playerWeapon.getHTML())
  enemyCard.appendChild(enemyWeapon.getHTML())

  updateCount()


  if (theWinner(playerWeapon, enemyWeapon)) {
    message.innerText = "You Win!"
    playerDeck.push(enemyWeapon)
    playerDeck.push(playerWeapon)
  } else if (theWinner(enemyWeapon, playerWeapon)) {
    message.innerText = "Enemy Win!"
    enemyDeck.push(playerWeapon)
    enemyDeck.push(enemyWeapon)
  } else {
    message.innerText = "Draw!"
    enemyDeck.delete(enemyWeapon)
    playerDeck.delete(playerWeapon)
    console.log(enemyDeck)
    console.log(playerDeck)
  }

  if (gameOver(playerDeck)) {
    message.innerText = "You Lose!"
    stop = true
  } else if (gameOver(enemyDeck)) {
    message.innerText = "Enemy Lose!"
    stop = true
  }
}

function updateCount() {
  enemyDeckElement.innerText = enemyDeck.numberOfCards
  playerDeckElement.innerText = playerDeck.numberOfCards
}

function theWinner(cardOne, cardTwo) {
  CARD_VALUE_MAP.A = 1
  if (cardOne.value === "10" || cardTwo.value === "10") {
    CARD_VALUE_MAP.A = 11
  }
  return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]
}

function gameOver(deck) {
  return deck.numberOfCards === 0
}

