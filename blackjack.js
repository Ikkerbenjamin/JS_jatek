const cards = ["English_pattern_2_of_clubs.svg",
    "English_pattern_2_of_diamonds.svg",
    "English_pattern_2_of_hearts.svg",
    "English_pattern_2_of_spades.svg",
    "English_pattern_3_of_clubs.svg",
    "English_pattern_4_of_clubs.svg",
    "English_pattern_5_of_clubs.svg",
    "English_pattern_6_of_clubs.svg",
    "English_pattern_7_of_clubs.svg",
    "English_pattern_8_of_clubs.svg",
    "English_pattern_9_of_clubs.svg",
    "English_pattern_10_of_clubs.svg",
    "English_pattern_jack_of_clubs.svg",
    "English_pattern_king_of_clubs.svg",
    "English_pattern_queen_of_clubs.svg",
    "English_pattern_ace_of_clubs.svg",
    "English_pattern_3_of_diamonds.svg",
    "English_pattern_4_of_diamonds.svg",
    "English_pattern_5_of_diamonds.svg",
    "English_pattern_6_of_diamonds.svg",
    "English_pattern_7_of_diamonds.svg",
    "English_pattern_8_of_diamonds.svg",
    "English_pattern_9_of_diamonds.svg",
    "English_pattern_10_of_diamonds.svg",
    "English_pattern_jack_of_diamonds.svg",
    "English_pattern_queen_of_diamonds.svg",
    "English_pattern_king_of_diamonds.svg",
    "English_pattern_ace_of_diamonds.svg",
    "English_pattern_3_of_hearts.svg",
    "English_pattern_4_of_hearts.svg",
    "English_pattern_5_of_hearts.svg",
    "English_pattern_6_of_hearts.svg",
    "English_pattern_7_of_hearts.svg",
    "English_pattern_8_of_hearts.svg",
    "English_pattern_9_of_hearts.svg",
    "English_pattern_10_of_hearts.svg",
    "English_pattern_jack_of_hearts.svg",
    "English_pattern_queen_of_hearts.svg",
    "English_pattern_king_of_hearts.svg",
    "English_pattern_ace_of_hearts.svg",
    "English_pattern_3_of_spades.svg",
    "English_pattern_4_of_spades.svg",
    "English_pattern_5_of_spades.svg",
    "English_pattern_6_of_spades.svg",
    "English_pattern_7_of_spades.svg",
    "English_pattern_8_of_spades.svg",
    "English_pattern_9_of_spades.svg",
    "English_pattern_10_of_spades.svg",
    "English_pattern_jack_of_spades.svg",
    "English_pattern_queen_of_spades.svg",
    "English_pattern_king_of_spades.svg",
    "English_pattern_ace_of_spades.svg",
]

let isStanding = false

let deck = [...cards]

let playerHand = []
let dealerHand = []

let money = sessionStorage.getItem("money") || 1000

function gameStart() {
    document.querySelector(".button-stand").addEventListener(onclick, stand)
    deck = [...cards]
    playerHand = []
    dealerHand = []
    document.querySelector(".player-hand").innerHTML = ""
    document.querySelector(".dealer-hand").innerHTML = ""
    playerDraw();
    dealerDrawFaceDown()
    dealerDraw();
    playerDraw();

}
function playerDraw() {
    if (!isStanding) {

        let points = Number(document.querySelector(".player-points").innerText)
        if (playerHand.length < 8 && points < 21) {
            let drawnCard = getRandomInt(deck.length);
            const newDiv = document.createElement("div");
            for (let index = 0; index < deck.length; index++) {
                if (drawnCard == index) {
                    if (deck[index] != 0) {
                        newContent = document.createElement("img");
                        newContent.src = "cards/" + deck[index];
                        const value = deck[index].split("_")
                        if (value[2] == "jack" || value[2] == "queen" || value[2] == "king") {
                            value[2] = 10
                        }
                        if (value[2] == "ace") {
                            value[2] = 11
                        }
                        newContent.className += "card-img "
                        newContent.className += value[2]

                        document.querySelector(".player-points").innerText = points + Number(value[2])

                        playerHand.push(cards[index])
                        deck.splice(index, 1)
                    }
                    else {
                        let drawnCard = getRandomInt(deck.length);
                    }
                }
            }
            const currentDiv = document.querySelector(".player-hand");
            newDiv.appendChild(newContent)
            currentDiv.appendChild(newDiv)
        }
    }
}
function dealerDraw() {
    if (shouldDealerDraw()) {

        let points = Number(document.querySelector(".dealer-points").innerText)
        if (dealerHand.length < 8 && points < 21) {
            let drawnCard = getRandomInt(deck.length);
            const newDiv = document.createElement("div");
            for (let index = 0; index < deck.length; index++) {
                if (drawnCard == index) {
                    if (deck[index] != 0) {
                        newContent = document.createElement("img");
                        newContent.src = "cards/" + deck[index];
                        const value = deck[index].split("_")
                        if (value[2] == "jack" || value[2] == "queen" || value[2] == "king") {
                            value[2] = 10
                        }
                        else
                            if (value[2] == "ace") {
                                value[2] = 11
                            }
                            else value[2] = Number(value[2])

                        newContent.className += "card-img "
                        newContent.className += value[2]

                        document.querySelector(".dealer-points").innerText = points + value[2]

                        dealerHand.push(cards[index])
                        deck.splice(index, 1)
                    }
                    else {
                        let drawnCard = getRandomInt(deck.length);
                    }
                }
            }
            const currentDiv = document.querySelector(".dealer-hand");
            newDiv.appendChild(newContent)
            currentDiv.appendChild(newDiv)
        }
    }

}

function dealerDrawFaceDown() {
    let drawnCard = getRandomInt(deck.length);
    const newDiv = document.createElement("div");
    for (let index = 0; index < deck.length; index++) {
        if (drawnCard == index) {
            if (deck[index] != 0) {
                newContent = document.createElement("img");
                newContent.src = "cards/Card_back_01.svg.png";
                const value = deck[index].split("_")
                if (value[2] == "jack" || value[2] == "queen" || value[2] == "king") {
                    value[2] = 10
                }
                if (value[2] == "ace") {
                    value[2] = 11
                }
                newContent.className += "card-img "
                newContent.className += value[2]
                newContent.className += " face-down"

                dealerHand.push(cards[index])
                deck.splice(index, 1)
            }
            else {
                let drawnCard = getRandomInt(deck.length);
            }
        }
    }
    const currentDiv = document.querySelector(".dealer-hand");
    newDiv.appendChild(newContent)
    currentDiv.appendChild(newDiv)
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function stand() {
    if (!isStanding) {
        for (let index = 0; index < 8; index++) {
            dealerDraw()
        }
        sessionStorage.setItem("money", money)
        isStanding = !isStanding
        let faceDownCard = document.querySelector(".face-down");
        let points = Number(document.querySelector(".dealer-points").innerText)
        document.querySelector(".dealer-points").innerText = points + Number(faceDownCard.classList[1])
        faceDownCard.src = "cards/" + dealerHand[0]
    }
}

function shouldDealerDraw() {
    let faceDownCardValue = Number(document.querySelector(".face-down").classList[1]);
    let dealerPoints = Number(document.querySelector(".dealer-points").innerText) + faceDownCardValue
    let playerPoints = Number(document.querySelector(".player-points").innerText)
    console.log(faceDownCardValue + dealerPoints)
    if (dealerPoints <= 17 || dealerPoints <= playerPoints) {
        return true
    }
    else {
        return false
    }
}