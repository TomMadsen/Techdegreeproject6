/*---variables -----------*/
let $overlay = $('#overlay');
let $qwerty = $('#qwerty');
let $phrase = $('#phrase');
let $scoreboard = $('#scoreboard');
let $startButton = $('.btn__reset');
let $newButton = $('.newGame');
let letterFound = 0;
let missed = 0;

/*---content -------------*/
let phrases = [
    'in the service one must always choose the lesser of two weevils',
    'they have chosen their cake and must lie in it',
    'and there you have two birds in one bush',
    'tis an ill wind that spoils the broth',
    'a bird in the hand waits for no man',
    'I should never count the bears skin before it is hatched'
];


/*---functions -----------*/

function getRandomPhraseAsArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i++) {
        let li = document.createElement('li');
        li.append(arr[i]);
        $phrase.first().append(li);
        if (arr[i] !== " ") {
            li.className = "letter";
        } else {
            li.className = "space";
        }
        
    } $('li.space:eq(3), li.space:eq(6)').before(`<br>`);
}

function checkLetter(input) {
    $('.letter').each(function () {                       // checks each letter in the phrase...
        let value = $(this).text();
        let result = value.toLowerCase().indexOf(input);    // ...(lowercase) against the input button
        if (result > -1) {                                  // index -1 means the value wasn't in the index, so anything above this means a letterFound.
            $(this).addClass('show');                   // add show class to phrase letter
            letterFound += 1;
        }
    });
    if (letterFound == 0) {                                         // tests if there were any (multiple or singular) letterFounds and if not, it was a singular miss.
        missed += 1;
        $(`.tries:nth-child(${missed})`).toggle();
    }
    letterFound = 0;                                                // resets the letterFound count.
}

function checkWin() {
    function newScreen(result) {
        $overlay.addClass(result);
        $overlay.fadeToggle(2000);
        $overlay.children('a').text('Play Again?');
        $overlay.find('h2').text(`YOU ${result.toUpperCase()}!!!!`);
    }
    let revealed = $('.show').length;
    let board = $('.letter').length;
    if (board == revealed) {
        newScreen('win');
    } else if (missed >= 5) {
        newScreen('lose');
    }
}


/*---event listeners -----------*/
$startButton.on('click', function () {
    $('.keyrow button').removeClass('chosen')
    $('.keyrow button').each(function() {
        $(this).attr('disabled', false);
    })
    // $('.letter').removeClass('show');
    $('#phrase').html(`<ul></ul>`);
    $('.tries').show();
    missed = 0;
    let newPhrase = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(newPhrase);
    $overlay.toggle().removeClass('win').removeClass('lose');
});

$('.keyrow').on('click', 'button', (function (e) {
    let input = $(e.target).text();
    checkLetter(input);
    $(this).addClass('chosen');
    $(this).attr('disabled', true);
    checkWin();
})
);

$startButton.hover(function () { 
    $(this).css('cursor', 'pointer')
});
