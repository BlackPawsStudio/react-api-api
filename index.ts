import * as bodyParser from 'body-parser';
import { addCard, deleteCard, getAllCards, getCardByTitle } from './functions';
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors('*'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = 3001;

export const cards = [];

app.get('/cards', getAllCards);

app.post('/card', addCard);

app.get('/search', getCardByTitle);

app.delete('/card', deleteCard);

app.listen(process.env.PORT || port, () => console.log(`Running on port ${port}`));
