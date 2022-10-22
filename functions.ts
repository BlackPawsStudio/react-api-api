import * as express from 'express';
import { cards } from './index';

export const sortArrayByParam = (arr, param, isAsc) => {
  arr.sort((a, b) => (a[param] > b[param] ? (isAsc ? 1 : -1) : isAsc ? -1 : 1));
  return arr;
};

export const getLowestId = (id, arr) =>
  typeof arr.find((el) => el === id) === 'number' ? getLowestId(++id, arr) : id;

export const getAllCards = (_, res) => {
  res.send(cards);
};

export const getCardByTitle = (req, res) => {
  const searchTitle = req.query.title;
  const searchCard = cards.find((el) => el.title === searchTitle);
  if (searchCard) {
    res.send(searchCard);
  } else {
    res.status(404).send('Not found');
  }
};

export const addCard = (req: express.Request, res) => {
  const data = req.body;
  data.id = getLowestId(0, cards);
  cards.push(data);
  sortArrayByParam(cards, 'id', true);
  res.status(201).send('Created');
};

export const deleteCard = (req, res) => {
  const card = cards.find((el) => el.id === req.query.id);
  const cardId = cards.indexOf(card);
  cards.splice(cardId, 1);
  res.status(202).send('Deleted');
};
