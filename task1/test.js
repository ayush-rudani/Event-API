const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

var reso = [
    { id: 1, name: 'reso1' },
    { id: 2, name: 'reso2' },
    { id: 3, name: 'reso3' },
    { id: 4, name: 'reso4' },
];

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/reso', (req, res) => {
    res.send(reso);
});

app.get('/api/reso/:id', (req, res) => {
    // res.send(req.params.id);
    let r = reso.find(e => e.id === parseInt(req.params.id));
    // let r = reso.find(e => console.log(e.id));
    if (!r)
        res.status(404).send('Not found');
    res.send(r);
});

app.post('/api/reso', (req, res) => {

    const schema = {
        name: Joi.string().min(3).required()
    }
    const result = Joi.validate(req.body, schema);

    if (!req.body.name || req.body.name.length < 3) {
        res.status(400).send('Bad request');
    }

    const r = {
        id: reso.length + 1,
        name: req.body.name
    };
    reso.push(r);
    res.send(r);
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))