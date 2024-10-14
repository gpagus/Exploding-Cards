import { Card } from "./card.js";
import { CARD_TYPES, MAX_NUM_CARDS_BOMB, MAX_NUM_CARDS_DEFUSE, MAX_NUM_CARDS_NOPE, MAX_NUM_CARDS_SKIPTURN, MAX_NUM_CARDS_POINTS } from "./constants.js";

const bodyElement = document.querySelector("#main");
const divCardElement = document.getElementById("card");
divCardElement.style.display = 'none';

let typeCardElements = document.querySelectorAll("h3");
let valueCardElements = document.querySelectorAll("p");

let warningElement = document.createElement("h2");
bodyElement.append(warningElement);

const drawElement = document.createElement("button");
drawElement.textContent = "Play";
bodyElement.append(drawElement);

const restartElement = document.createElement("button");
restartElement.textContent = "Restart";
bodyElement.append(restartElement);
restartElement.setAttribute("style", "display: none;");



let deck = [];
let originalDeck = [];

createShuffledDeck(deck, originalDeck);

// Function when we try to draw a card by clicking the button
drawElement.addEventListener("click", function () {
    drawElement.textContent = "Draw card";


    if (deck.length === 0) {
        divCardElement.style.display = 'none';

        warningElement.textContent = 'No more cards in the deck!';

        drawElement.style.display = 'none';

        restartElement.style.display = 'block';

    } else {

        divCardElement.classList.remove('bomb', 'defuse', 'skip-turn', 'nope', 'points');
        divCardElement.style.display = 'flex';

        let cardDrawed = deck.shift();
        let normalizedClass = cardDrawed.type.toLowerCase().replace(/\s+/g, '-'); // syntax that changes spacing to a '-' (for the skip turn type) and makes letters lowercase
        divCardElement.classList.add(normalizedClass);


        typeCardElements.forEach((typeCardElement) => {
            typeCardElement.textContent = `${cardDrawed.type}`;
        });
        valueCardElements.forEach((valueCardElement) => {
            if (cardDrawed.value != null) {
                valueCardElement.textContent = `Value: ${cardDrawed.value}`;
            } else {
                valueCardElement.textContent = "";
            }
        });
        console.log(deck);
    }


});


restartElement.addEventListener("click", function () {
    warningElement.textContent = '';
    drawElement.style.display = 'block';
    restartElement.style.display = 'none';


    typeCardElements.forEach((typeCardElement) => {
        typeCardElement.textContent = "";
    });
    valueCardElements.forEach((valueCardElement) => {
        valueCardElement.textContent = "";
    });

    createShuffledDeck(deck, originalDeck);
});


// adds the cards of the type passed by parameter
function addCardsToDeck(deck, cardType, numCards, value = null) {
    for (let i = 0; i < numCards; i++) {
        if (cardType === CARD_TYPES.POINTS) {
            value = Math.floor(Math.random() * 10) + 1;
        }
        deck.push(new Card(cardType, value));
    }
}


// Shuffle the cards with the Fisher-Yates algorithm
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let k = deck[j];
        deck[j] = deck[i];
        deck[i] = k;
    }
}

// Create the shuffled deck with the 60 cards
function createShuffledDeck(deck, originalDeck) {
    addCardsToDeck(deck, CARD_TYPES.BOMB, MAX_NUM_CARDS_BOMB);
    addCardsToDeck(deck, CARD_TYPES.DEFUSE, MAX_NUM_CARDS_DEFUSE);
    addCardsToDeck(deck, CARD_TYPES.SKIP, MAX_NUM_CARDS_SKIPTURN);
    addCardsToDeck(deck, CARD_TYPES.NOPE, MAX_NUM_CARDS_NOPE);
    addCardsToDeck(deck, CARD_TYPES.POINTS, MAX_NUM_CARDS_POINTS);
    originalDeck = [...deck];
    console.log("Deck NOT shuffled: ", originalDeck);

    shuffleDeck(deck);
    console.log("Deck shuffled: ", deck);
}
