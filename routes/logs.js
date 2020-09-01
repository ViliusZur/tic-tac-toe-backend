const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const logs = require('../models/logs/logs');

const router = express.Router();

router.use(session({
  secret: 'sauce',
  saveUninitialized: true,
  resave: true,
}));

let sess; // declare global session variable

router.post('/log', bodyParser.json(), async (req, res) => {
  // log game event
  sess = req.session;
  const [square, value, newGame] = [req.body.square, req.body.value, req.body.newGame];

  if (newGame) {
    // if true, then append 'New Game' to log and nullify game squares
    sess.log.unshift('New Game');
    sess.squares = Array(9).fill(null);
    sess.winner = false;
    res.send('new game added to log and squares have been reset');
  } else {
    // else add data to game squares and add transformed data to log
    sess.squares[square] = value;
    sess.log.unshift(await logs.transformToReadableString(square, value));
    // check for winner
    const ans = await logs.checkForWinner(sess.squares);
    if (ans !== null) {
      sess.log.unshift(`${ans} won the game!`);
      sess.winner = ans;
    }
    // check if game finished without a winner
    if (!sess.squares.includes(null) && ans === null) {
      sess.log.unshift('Nobody won the game');
      sess.winner = null;
    }
    res.send('squares and log have been updated');
  }
});

router.get('/getLogs', async (req, res) => {
  // send back the session logs array and squares of the game
  sess = req.session;
  if (sess.log === undefined || sess.squares === undefined) {
    // if the session is new - initiate log, squares, and winner variables
    sess.log = [];
    sess.squares = Array(9).fill(null);
    sess.winner = false;
    res.send({ log: sess.log, squares: sess.squares, winner: sess.winner });
  } else {
    res.send({ log: sess.log, squares: sess.squares, winner: sess.winner });
  }
});

router.post('/closeSession', async (req, res) => {
  // terminates the session
  req.session.destroy();
  res.sendStatus(200);
});

module.exports = router;
