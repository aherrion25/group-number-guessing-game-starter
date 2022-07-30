const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

let numberInputArray = [];

function generateRandomNumber() {
  function randomNumber(min, max){
    return Math.floor(Math.random() * (1 + max - min) + min);
}
  // return 8; // TODO: a random number
}
let answer = generateRandomNumber();

// GET & POST Routes go here
app.post('/reset', (req, res) => {
  console.log(answer);
  answer = generateRandomNumber();
  // Clear history...
  res.send(200);
});

app.get('/guess',(req, res) => {
  res.send(numberInputArray);
  
});

app.post('/guess', (req, res) => {
  const guessInput = req.body;
  console.log(req.body);
  numberInputArray.push(guessInput);
  res.sendStatus(200);
});



app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})
