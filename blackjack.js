$(document).ready(function () {

    $('#restart').hide();

    $("button").hover(function () {
        $(this).attr("class", "btn-hover");
    }, function () {
        $(this).attr("class", "btn");
    });

    //Card images taken from https://github.com/ImKennyYip/black-jack/tree/master/cards
    let deck = ['2-C', '2-D', '2-H', '2-S', '3-C', '3-D', '3-H', '3-S',
        '4-C', '4-D', '4-H', '4-S', '5-C', '5-D', '5-H', '5-S',
        '6-C', '6-D', '6-H', '6-S', '7-C', '7-D', '7-H', '7-S',
        '8-C', '8-D', '8-H', '8-S', '9-C', '9-D', '9-H', '9-S',
        '10-C', '10-D', '10-H', '10-S', 'J-C', 'J-D', 'J-H', 'J-S',
        'Q-C', 'Q-D', 'Q-H', 'Q-S', 'K-C', 'K-D', 'K-H', 'K-S',
        'A-C', 'A-D', 'A-H', 'A-S'];

    let player = [];
    let aces = [];
    let dealer = [];
    hidden = '';

    function drawCard(turn) {

        //remove card from the deck
        card = deck.splice(Math.floor(Math.random() * deck.length), 1)[0];

        //score card
        cardScore = parseInt(card) ? parseInt(card) :
            card[0] === 'A' ? 11 : 10;

        //save scores
        if (turn === 'player') {
            player.push(cardScore);
            card[0] === 'A' ? aces.push(player.length - 1) : card = card;
        } else {
            dealer.push(cardScore);
        }

        //show card on screen
        if (deck.length === 50) {
            $(`#${turn}`).prepend("<img id='hidden' src='cards/BACK.png' class='rounded mx-auto d-block m-2'>")
            hidden = card;
        } else {
            $(`#${turn}`).prepend(`<img src='cards/${card}.png' class='rounded mx-auto d-block m-2'>`)
        }


    }

    function checkState() {
        //player bust, dealer bust, player win, dealer win, blackjack
        if (parseInt($('#p-score').text()) > 21) {
            $('#hit').prop('disabled', true);
            $('#stand').prop('disabled', true);
            $('#result').text('Bust!');
            $('#restart').show();
        } else if (parseInt($('#d-score').text()) > 21 || parseInt($('#p-score').text()) > parseInt($('#d-score').text())) {
            $('#hit').prop('disabled', true);
            $('#stand').prop('disabled', true);
            $('#result').text('You Win!');
            $('#restart').show();
        } else if (parseInt($('#p-score').text()) < parseInt($('#d-score').text())) {
            $('#hit').prop('disabled', true);
            $('#stand').prop('disabled', true);
            $('#result').text('Dealer Wins!');
            $('#restart').show();
        } else if (parseInt($('#p-score').text()) === 21) {
            $('#hit').prop('disabled', true);
            $('#stand').prop('disabled', true);
            $('#result').text('Blackjack!');
            $('#restart').show();
        } else if (parseInt($('#p-score').text()) === parseInt($('#d-score').text())) {
            $('#hit').prop('disabled', true);
            $('#stand').prop('disabled', true);
            $('#result').text('Tie!');
            $('#restart').show();
        } else {
            $('#hit').prop('disabled', false);
            $('#stand').prop('disabled', false);
            $('#result').text('');
            $('#restart').hide();
        }
    }

    function updateScore(arr) {
        /*I'd prefer this function, but I don't yet know how to add the ace logic to it
        score = arr.reduce(function(i, score) {
          return i + score;
        });
        */
        aces = [];
        score = 0;
        for (let i = 0; i < arr.length; i++) {
            score += arr[i];
            arr[i] === 11 ? aces.push(i) : score += 0;
        }

        //if ace(s) in hand and score > 21, subtract 10 from score from aces until < 21;
        x = 0;
        if (score > 21 && aces.length !== 0) {
            while (score > 21) {
                player[aces[x]] -= 10;
                score = 0;
                for (let i = 0; i < arr.length; i++) {
                    score += arr[i];
                }
                x++;
            }
        }

        if (arr === player) {
            $('#p-score').text(score);
        } else {
            $('#d-score').text(score);
        }

        checkState();

    }

    drawCard('player');
    drawCard('dealer');
    drawCard('player');
    drawCard('dealer');
    updateScore(player);

    $('#hit').click(function () {
        drawCard('player');
        updateScore(player);
    });

    $('#stand').click(function () {

        score = dealer.reduce(function (i, score) {
            return i + score;
        });

        while (score < 17) {
            drawCard('dealer');
            score = dealer.reduce(function (i, score) {
                return i + score;
            });
        }

        $('#hidden').attr('src', `cards/${hidden}.png`);
        updateScore(dealer);

        $('#hit').prop('disabled', true);
        $('#stand').prop('disabled', true);

    });

    $('#restart').click(function () {
        //Reset scores, empty hands, hide game and show start
        $('#p-score').text('--');
        $('#d-score').text('--');
        $('#restart').hide();
        $('#hit').prop('disabled', false);
        $('#stand').prop('disabled', false);
        $('#result').text('');
        $('#player').html('<div id="player"></div>');
        $('#dealer').html('<div id="dealer"></div>');

        deck = ['2-C', '2-D', '2-H', '2-S', '3-C', '3-D', '3-H', '3-S',
            '4-C', '4-D', '4-H', '4-S', '5-C', '5-D', '5-H', '5-S',
            '6-C', '6-D', '6-H', '6-S', '7-C', '7-D', '7-H', '7-S',
            '8-C', '8-D', '8-H', '8-S', '9-C', '9-D', '9-H', '9-S',
            '10-C', '10-D', '10-H', '10-S', 'J-C', 'J-D', 'J-H', 'J-S',
            'Q-C', 'Q-D', 'Q-H', 'Q-S', 'K-C', 'K-D', 'K-H', 'K-S',
            'A-C', 'A-D', 'A-H', 'A-S'];
        player = [];
        aces = [];
        dealer = [];
        hidden = '';

        drawCard('player');
        drawCard('dealer');
        drawCard('player');
        drawCard('dealer');
        updateScore(player);

    });

});