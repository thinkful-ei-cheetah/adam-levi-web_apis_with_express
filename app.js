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
})

app.get('/cipher', (req, res) => {
    const text = req.query.text;
    const shift = Number(req.query.shift);

    const textL = text.toLowerCase();
    const textArr = textL.split('');
    let newShift = shift;
    while (newShift > 26) {
        newShift = newShift - 26
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
    })

    res.send(`${newTextArr.join('')} ${shift}`);
})

app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
});