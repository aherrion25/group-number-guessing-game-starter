$(handleReady);

function handleReady() {
  console.log("jquery is loaded!")
  $('#submit-button').on('click', guessMade);
  getGuess();
  
} // End handleReady
let counter = 0;
function getGuess(){
  console.log('In getGuess');
  counter ++
  $('#guess-me').append(`
     ${counter}
  `)
  $.ajax({
    type: 'GET',
    url: '/guess'
  }).then(function(response){
    $('#game-history').empty();
    for(let guess of response){
      $('#game-history').append(`
        <ul>
          <li>Player One: ${guess.playerOne}</li>
          <li>Player Two: ${guess.playerTwo}</li>
          <li>Player Three: ${guess.playerThree}</li>
        </ul>
      `)
    }
  })
}

function guessMade(){
  
  console.log('in guessMade');
  $.ajax({
    type: 'POST',
    url: '/guess',
    data:{
      playerOne: $('#player-one').val(),
      playerTwo: $('#player-two').val(),
      playerThree: $('#player-three').val()
    }
  }).then(function(response){
    getGuess();
    $('#player-one').val('');
    $('#player-two').val('');
    $('#player-three').val('');
    counter ++
  });
} // End guessMade