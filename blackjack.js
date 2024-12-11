const cards = [
    "English_pattern_2_of_clubs.svg",
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
let betAmount = 100
let deck = [...cards]
let playerHand = []
let dealerHand = []
let isBetSet = false
let playerAces = 0
let dealerAces = 0
let playerAcesUsed = 0
let dealerAcesUsed = 0
let money = Number(sessionStorage.getItem("money")) || 1000

function gameSetup() {
    if (betAmount > money) {
        betAmount = money
    }
    if (money == 0) {
        money = 100
        alert("Elfogyott a pénzed itt egy kicsi, hogy tudj játszani :)")
    }
    betAmount = Number(document.querySelector(".bet-amount").value)
    document.querySelector(".player-money").innerHTML = "Pénz: <br>" + money
    document.querySelector(".bet-counter").innerHTML = "Tét: <br>" + betAmount
    document.querySelector(".button-bet").style.display = "inline"
    document.querySelector(".dealer-status").innerText = ""
    document.querySelector(".player-status").innerText = ""
    isStanding = false
    deck = [...cards]
    document.querySelector(".button-new").style.display = "none"
    document.querySelector(".player-points").innerText = "0"
    document.querySelector(".dealer-points").innerText = "0"
    playerHand = []
    dealerHand = []
    document.querySelector(".player-hand").innerHTML = ""
    document.querySelector(".dealer-hand").innerHTML = ""
}

function gameStart() {
    document.querySelector(".player-money").innerHTML = "Pénz: <br>" + money
    document.querySelector(".bet-counter").innerHTML = "Tét: <br>" + betAmount
    if (isBetSet) {
        if (betAmount > money) {
            betAmount = money
        }
        if (money == 0) {
            money = 100
            alert("Elfogyott a pénzed itt egy kicsi, hogy tudj játszani :)")
        }
        document.querySelector(".button-bet").style.display = "hide"
        document.querySelector(".dealer-status").innerText = ""
        document.querySelector(".player-status").innerText = ""
        isStanding = false
        deck = [...cards]
        document.querySelector(".button-new").style.display = "none"
        document.querySelector(".player-points").innerText = "0"
        document.querySelector(".dealer-points").innerText = "0"
        playerHand = []
        dealerHand = []
        document.querySelector(".player-hand").innerHTML = ""
        document.querySelector(".dealer-hand").innerHTML = ""
        playerDraw();
        dealerDrawFaceDown()
        dealerDraw();
        playerDraw();
    }

}

function restartGame() {
    gameStart()
    resetMoney()
}

function playerDraw() {
    let points = Number(document.querySelector(".player-points").innerText)
    if (!isStanding && isBetSet && points < 21) {
        let drawnCard = getRandomInt(deck.length);
        const newDiv = document.createElement("div");
        newContent = document.createElement("img");
        newContent.src = "cards/" + deck[drawnCard];
        const value = deck[drawnCard].split("_")
        if (value[2] == "jack" || value[2] == "queen" || value[2] == "king") {
            value[2] = 10
        }
        else if (value[2] == "ace") {
            value[2] = 11
        }
        else value[2] = Number(value[2])
        newContent.className += "card-img-2 "
        newContent.className += value[2]
        playerHand.push(deck[drawnCard])
        document.querySelector(".player-points").innerText = points + Number(value[2])
        changeAceValue(playerHand, "player")
        deck.splice(drawnCard, 1)
        const currentDiv = document.querySelector(".player-hand");
        newDiv.appendChild(newContent)
        currentDiv.appendChild(newDiv)
    }
}

function dealerDraw() {
    let points = Number(document.querySelector(".dealer-points").innerText)
    if ((shouldDealerDraw() || dealerHand.length < 2) && isBetSet && points < 21) {
        let drawnCard = getRandomInt(deck.length);
        const newDiv = document.createElement("div");
        newContent = document.createElement("img");
        newContent.src = "cards/" + deck[drawnCard];
        const value = deck[drawnCard].split("_")
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
        dealerHand.push(deck[drawnCard])
        document.querySelector(".dealer-points").innerText = points + value[2]
        changeAceValue(dealerHand, "dealer")
        deck.splice(drawnCard, 1)
        const currentDiv = document.querySelector(".dealer-hand");
        newDiv.appendChild(newContent)
        currentDiv.appendChild(newDiv)
    }
}


function dealerDrawFaceDown() {
    let index = getRandomInt(deck.length);
    const newDiv = document.createElement("div");
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
    dealerHand.push(deck[index])
    deck.splice(index, 1)
    const currentDiv = document.querySelector(".dealer-hand");
    newDiv.appendChild(newContent)
    currentDiv.appendChild(newDiv)
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function stand() {
    changeAceValue(dealerHand, "dealer")
    if (!isStanding) {
        for (let index = 0; index < 8; index++) {
            dealerDraw()
        }
        isStanding = !isStanding
        let faceDownCard = document.querySelector(".face-down");
        let points = Number(document.querySelector(".dealer-points").innerText)
        document.querySelector(".dealer-points").innerText = points + Number(faceDownCard.classList[1])
        faceDownCard.src = "cards/" + dealerHand[0]
        document.querySelector(".button-new").style.display = "inline"
        winScreen(winner())
        sessionStorage.setItem("money", money)
        isBetSet = false
    }
}

function shouldDealerDraw() {
    let faceDownCardValue = Number(document.querySelector(".face-down").classList[1]);
    let dealerPoints = Number(document.querySelector(".dealer-points").innerText) + faceDownCardValue
    let playerPoints = Number(document.querySelector(".player-points").innerText)
    if (dealerPoints <= 17 && dealerPoints <= playerPoints && playerPoints < 22) {
        return true
    }
    else {
        return false

    }
}


function winner() {
    let dealerPoints = Number(document.querySelector(".dealer-points").innerText)
    let playerPoints = Number(document.querySelector(".player-points").innerText)
    if (((dealerPoints > playerPoints) && dealerPoints < 22) || playerPoints > 21) {

        return "lost"
    }
    if (dealerPoints == playerPoints || (dealerPoints > 21 && playerPoints > 21)) {

        return "draw"
    }
    if (((dealerPoints < playerPoints) && playerPoints < 22) || dealerPoints > 21) {

        return "win"
    }
}

function showBet() {
    document.querySelector(".bet-amount").style.display = "inline"
    document.querySelector(".bet-ok").style.display = "inline"
}

function hideBet() {
    document.querySelector(".bet-amount").style.display = "none"
    document.querySelector(".bet-ok").style.display = "none"
    document.querySelector(".button-bet").style.display = "none"
    isBetSet = true
}

function bet(input) {
    debugger
    sleep(20).then(() => {
        betAmount = Number(input.value)
        if (betAmount > money) {
            betAmount = money
            input.value = money
        }
        if (betAmount < 0) {
            betAmount = 0
            input.value = 0
        }
        document.querySelector(".bet-counter").innerHTML = "Bet: <br>" + betAmount
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function resetMoney() {
    money = 1000
    document.querySelector(".player-money").innerHTML = "Money: <br>" + money
}

function changeAceValue(hand, person) {
    debugger
    let points = Number(document.querySelector("." + person + "-points").innerText)
    for (let index = 0; index < hand.length; index++) {
        const element = hand[index];
        const value = element.split("_")
        if (value[2] == "ace") {
            if (person == "player") {
                playerAces += 1
            }
            else {
                dealerAces += 1
            }
        }
    }
    for (let index = 0; index < hand.length; index++) {
        const element = hand[index];
        const value = element.split("_")
        if (value[2] == "ace" && points > 21) {
            if (person == "player" && playerAcesUsed < playerAces) {

                document.querySelector("." + person + "-points").innerText = points - 10
                playerAcesUsed += 1
            }
            if (person == "dealer" && dealerAcesUsed < dealerAces) {
                playerAcesUsed += 1
                document.querySelector("." + person + "-points").innerText = points - 10
            }
        }
    }
}

function drawWinDecider() {
    if (dealerHand.length < playerHand.length) {
        return "lost"
    }
    if (dealerHand.length == playerHand.length) {
        document.querySelector(".dealer-status").innerText = "Döntetlen"
        document.querySelector(".dealer-status").style.color = "gray"
        document.querySelector(".player-status").innerText = "Döntetlen"
        document.querySelector(".player-status").style.color = "gray"
    }
    else {
        return "win"
    }
}


function winScreen(winner) {
    money = Number(money)
    if (winner == "win") {
        document.querySelector(".dealer-status").innerText = "Vesztett"
        document.querySelector(".dealer-status").style.color = "red"
        document.querySelector(".player-status").innerText = "Nyert"
        document.querySelector(".player-status").style.color = "green"
        money += betAmount
    }
    if (winner == "draw") {
        winScreen(drawWinDecider())
    }
    if (winner == "lost") {
        document.querySelector(".dealer-status").innerText = "Nyert"
        document.querySelector(".dealer-status").style.color = "green"
        document.querySelector(".player-status").innerText = "Vesztett"
        document.querySelector(".player-status").style.color = "red"
        money -= betAmount
    }
}