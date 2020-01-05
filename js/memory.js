/**
 * Memory puzzle logic. It manipulates the index.html page.
 * 
 * Tiago Franco de Goes Teles
 * December 25th, 2019
 * 
 * Note: all images used in this game are of public domain, and they were
 * downloaded from: https://www.publicdomainpictures.net/en/
 */

 // Variables declaration
let card1 = - 1; // Variable used to alternate the cards from covered, uncovered, and checked
let card2 = -1; // index of second card chosen to be turned
let win = 0; // Variable used as part of game's score, number of hits
let lost = 0; // Variable used as part of game's score, number of misses


$(document).ready(function(){

    $("#help_content").hide(); // to hide the instructions by default

    // Event listener to start the game by clicking the start button
    $("#start_button").click(function(){
        pairs = $("#pairs").val();
        let valid = true; // Boolean variable used to validate user input
        // Number of pairs validation
        if (pairs < 2 || pairs >15 || isNaN(pairs)) {
            valid = false;
            $("#alert").html("Choose the numbers of pairs " +
            "<span>*Must be between 2 and 15</span>");
        } 
        if (valid) newGame(); // if all input valid, buid the game screen
    });

    // Event listener to show the game instructions by clicking help butthon
    $("#show_help").click(function(){
        $("#help_content").show();
        $(this).hide();
    });
    // Event listener to hide the game instructions by clicking close butthon
    $("#close_help").click(function(){
        $("#help_content").hide();
        $("#show_help").show();
    });

    // Event listeners to be fired when the player click on a card
    $("#card1").click(function(){turnCard(0);});
    $("#card2").click(function(){turnCard(1);});
    $("#card3").click(function(){turnCard(2);});
    $("#card4").click(function(){turnCard(3);});
    $("#card5").click(function(){turnCard(4);});
    $("#card6").click(function(){turnCard(5);});
    $("#card7").click(function(){turnCard(6);});
    $("#card8").click(function(){turnCard(7);});
    $("#card9").click(function(){turnCard(8);});
    $("#card10").click(function(){turnCard(9);});
    $("#card11").click(function(){turnCard(10);});
    $("#card12").click(function(){turnCard(11);});
    $("#card13").click(function(){turnCard(12);});
    $("#card14").click(function(){turnCard(13);});
    $("#card15").click(function(){turnCard(14);});
    $("#card16").click(function(){turnCard(15);});
    $("#card17").click(function(){turnCard(16);});
    $("#card18").click(function(){turnCard(17);});
    $("#card19").click(function(){turnCard(18);});
    $("#card20").click(function(){turnCard(19);});
    $("#card21").click(function(){turnCard(20);});
    $("#card22").click(function(){turnCard(21);});
    $("#card23").click(function(){turnCard(22);});
    $("#card24").click(function(){turnCard(23);});
    $("#card25").click(function(){turnCard(24);});
    $("#card26").click(function(){turnCard(25);});
    $("#card27").click(function(){turnCard(26);});
    $("#card28").click(function(){turnCard(27);});
    $("#card29").click(function(){turnCard(28);});
    $("#card30").click(function(){turnCard(29);});

});

/**
 * Card class to create Card objects to store the images for covered and
 * uncovered card, to turn over the cards, and to indicate the card status.
 */
class Card {
    /**
     * Card object constructor
     * @param {string} imgUncover relative path to uncovered image
     * @param {integer} index card index within the table array with cards
     * @param {string} imgCover relative path to covered image
     * @param {integer} isCovered indicates the card status:
     * isCovered = 1 => the card is covered
     * isCovered = 0 => the card is uncovered
     * isCovered = -1 => the card is checked
     */
    constructor(imgUncover, index, imgCover="image/einstein.jpg", isCovered = 1) {
        this.imgUncover = imgUncover;
        this.index = index;
        this.imgCover = imgCover;
        this.isCovered = isCovered;
    }
    
    /**
     * This method turns over the card and update the card status
     */
    changeImage() {
        if (this.isCovered === 0) {
            this.isCovered = 1;
            $("#card" + (this.index + 1) + " img").attr("src", this.imgCover);
        }
        else if (this.isCovered === 1) {
            this.isCovered = 0;
            $("#card" + (this.index + 1) + " img").attr("src", this.imgUncover, 2000);
        }
    }

    /**
     * Accessor method to imgUncover instance variable
     * @returns string with uncovered relative path image
     */
    getFileName() {
        return this.imgUncover;
    }

    /**
     * Method to set the card status
     * @param {integer} status 
     */
    setCovered(status) {
        this.isCovered = status;
    }

    /**
     * Accessor method to isCovered instance variable
     */
    getCovered() {
        return this.isCovered;
    }
}

/**
 * Function to turn over the card at cardIndex position, and verify
 * the consequences: if it is the first card to be turned over, if match,
 * and if the game is over with win or lost.
 * @param {integer} cardIndex card position within the table
 */
function turnCard(cardIndex) {
    if (table[cardIndex].getCovered() == 1) {
        if (card1 === -1) {
            card1 = cardIndex;
            table[cardIndex].changeImage();
        }
        else if (card2 === -1) {
            card2 = cardIndex;
            table[cardIndex].changeImage();
            if (table[card1].getFileName() === table[card2].getFileName()) {
                win++;
                table[card1].setCovered(-1);
                table[card2].setCovered(-1);
                let checked = "<img src='image/rainbow-checkmark.jpg' style='opacity:1;'>";
                $("#card" + (card1 + 1)).html(checked);
                $("#card" + (card2 + 1)).html(checked);
            }
            else lost++;
            upDateResult();
        }
        else {
            table[card1].changeImage();
            table[card2].changeImage();
            table[cardIndex].changeImage();
            card1 = cardIndex;
            card2 = -1;
        }
        if (lost > pairs) {
            gameOver();
            $("#alert").html("<span>Game Over! Try Again</span>");
        }
        else if (win == pairs) {
            gameOver();
            $("#alert").html("<span>Congratulations!</span>");
        }
    }
    
}

/**
 * Funciton to build a new table based on the number of pairs chosen by the player
 */
function newGame() {
    card1 = -1;
    card2 = -1;
    for (let i = 1; i <= 2 * pairs; i++) 
        $("#card" + i).html("<img src='image/einstein.jpg'>").show();
    for (let i = 2 * pairs + 1; i <= 30; i++) $("#card" + i).hide();
    win = 0; // initial score
    lost = 0; // initial score
    $("#alert").html("");
    upDateResult();
    let deck = new Array(15); // deck of card with the total of 15
    deck[0] = ["image/blueberry.jpg"];
    deck[1] = ["image/chips.jpg"];
    deck[2] = ["image/coffee.jpg"];
    deck[3] = ["image/dots.jpg"];
    deck[4] = ["image/film.jpg"];
    deck[5] = ["image/halloween.jpg"];
    deck[6] = ["image/keyboard.jpg"];
    deck[7] = ["image/laptop.jpg"];
    deck[8] = ["image/maple.jpg"];
    deck[9] = ["image/popcorn.jpg"];
    deck[10] = ["image/smoke.jpg"];
    deck[11] = ["image/storm.jpg"];
    deck[12] = ["image/telephone.jpg"];
    deck[13] = ["image/tropical.jpg"];
    deck[14] = ["image/winter.jpg"];
    deck = shuffle(deck);
    let cards = deck.slice(0, pairs);
    cards = cards.concat(cards);
    cards = shuffle(cards);
    table = new Array(2 * pairs);
    for (let i = 0; i < 2 * pairs; i++) {
        table[i] = new Card(cards[i], i);
    }
}

/**
 * Function to shuffle the cards
 * @param {array of strings} arra1 array to be shuffle
 */
function shuffle(arra1) {
    let ctr = arra1.length;
    let temp;
    let index;
    // While there are elements in the array
     while (ctr > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * ctr);
        // Decrease ctr by 1
        ctr--;
        // And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}

/**
 * Function to set the card status to checked to all cards, in order to
 * end the game
 */
function gameOver() {
    for (let i = 0; i < 2 * pairs; i++) table[i].setCovered(-1);
}

/**
 * Function to update the game score with new values of hits and misses
 */
function upDateResult() {
    $("#result").html("Hits: " + win + " | Misses: " + lost);
}
