'use strict';
const express = require('express');
const morgan = require('morgan');

const app = express();

// This is middleware that requests pass through
// on their way to the final handler
app.use(morgan('dev'));

//This is the final request handler
app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.get('/sum', (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);

  res.send(`The sum of ${a} and ${b} is ${a+b}`);
});

app.get('/cipher', (req, res) => {
  const text = req.query.text;
  const shift = Number(req.query.shift);

  const textL = text.toLowerCase();
  const textArr = textL.split('');
  let newShift = shift;
  while (newShift > 26) {
    newShift = newShift - 26;
  }

  const newTextArr = textArr.map(char => {
    let newPosition;
    const pos = char.charCodeAt(0) + newShift;
    if (pos < 97) {
      newPosition = pos + 26;
    } else if (pos > 122) {
      newPosition = pos - 26;
    }
    else {
      newPosition = pos;
    }
    return String.fromCharCode(newPosition);
  });
  res.send(`${newTextArr.join('')} ${shift}`);
});

app.get('/lotto', (req, res) => {
  const arr = req.query.arr;
  let numbers= arr.map(num => Number(num));
  let lottoArray = [];
  let error = false;

  if(numbers.length < 6 || numbers.length > 6){
    res.status(401).send('accepts only 6 numbers');
  }
    
  for(let i= 0; i< numbers.length; i++){
    if(numbers[i] < 1 || numbers[i] > 20){
      error = true;
    }else {
      error = false;
    }
  }
  if(error){
    res.status(401).send('only accepts numbers 1-20');
  }
  for (let i=0; i < 6; i++){
    lottoArray.push(Math.floor(Math.random()*(20 - 1)) + 1);
  }
    
  console.log(lottoArray);
  let match = lottoArray.filter(num => numbers.includes(num));
  console.log(match);
  if (match.length === 6){
    res.send('Wow! Unbelievable! You could have won the mega millions!');   
  }else if (match.length === 5){
    res.send('Congratulations! You win $100!');
  }else if(match.length === 4){
    res.send('Congratulations, you win a free ticket');
  }else{
    res.send('Sorry, you lose');
  }
   
});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});