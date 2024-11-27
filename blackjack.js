let cards = ["English_pattern_2_of_clubs.svg",
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

function gameStart() {
    document.querySelector(".player-hand").innerHTML = ""
    document.querySelector(".dealer-hand").innerHTML = ""
    playerDraw();

    let drawnCard = getRandomInt(cards.length);
    const newDiv = document.createElement("div");
    newContent = document.createElement("img");
    newContent.src = "cards/Card_back_01.svg.png";
    newContent.className += "card-img"

    const currentDiv = document.querySelector(".dealer-hand");
    newDiv.appendChild(newContent)
    currentDiv.appendChild(newDiv)

    dealerDraw();
    playerDraw();

}
function playerDraw() {
    let drawnCard = getRandomInt(cards.length);
    const newDiv = document.createElement("div");
    for (let index = 0; index < cards.length; index++) {
        if (drawnCard == index) {
            if (cards[index] != 0) {
                newContent = document.createElement("img");
                newContent.src = "cards/" + cards[index];
                const value = cards[index].split("_")
                if (value[2] == "jack"|| value[2] == "queen"|| value[2] == "king") {
                    value[2] = 10
                }
                if (value[2] == "ace") {
                    value[2] = 11
                }
                newContent.className += "card-img "
                newContent.className += value[2]


                cards.splice(index, 1)
            }
            else {
                let drawnCard = getRandomInt(cards.length);
            }
        }
    }
    const currentDiv = document.querySelector(".player-hand");
    newDiv.appendChild(newContent)
    currentDiv.appendChild(newDiv)
}
function dealerDraw() {
    let drawnCard = getRandomInt(cards.length);
    const newDiv = document.createElement("div");
    for (let index = 0; index < cards.length; index++) {
        if (drawnCard == index) {
            if (cards[index] != 0) {
                newContent = document.createElement("img");
                newContent.src = "cards/" + cards[index];
                newContent.className += "card-img"
                cards.splice(index, 1)
            }
            else {
                let drawnCard = getRandomInt(cards.length);
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