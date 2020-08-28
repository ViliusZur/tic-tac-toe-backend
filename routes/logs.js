const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const logs = require('../models/logs');

const router = express.Router();

router.use(session({
  secret: 'sauce',
  saveUninitialized: true,
  resave: true,
  /*cookie: {
    secure: false,
    httpOnly: false,
    expires: new Date(253402300000000), // expires approximately Friday, 31 Dec 9999 23:59:59 GMT
  },*/
}));

let sess; // declare global session variable

router.get('/test', (req, res) => {
  sess = req.session;
  if (sess.views) {
    sess.views += 1;
  } else {
    sess.views = 1;
  }
  console.log(req.sessionID);
  res.send(`${sess.views} views`);
});

router.get('/getSession', (req, res) => {
  console.log(req.sessionID);
  res.send(req.session);
});

router.post('/log', bodyParser(), async (req, res) => {
  // log game event
  console.log(req.sessionID);
  sess = req.session;
  console.log(sess);
  const [square, value, newGame] = [req.body.square, req.body.value, req.body.newGame];

  if (newGame) {
    // if true, then append 'New Game' to log and nullify game squares
    sess.log.push('New Game');
    sess.squares = Array(9).fill(null);
    sess.winner = false;
    res.send('new game added to log and squares have been reset');
  } else {
    // else add data to game squares and add transformed data to log
    sess.squares[square] = value;
    sess.log.push(await logs.transformToReadableString(square, value));

    // check for winner
    const ans = await logs.checkForWinner(sess.squares);
    if (ans !== null) {
      sess.log.push(`${ans} won the game!`);
      sess.winner = ans;
    }
    // check if game finished without a winner
    if (!sess.squares.includes(null) && ans === null) {
      sess.log.push(`Nobody won the game`);
      sess.winner = null;
    }
    res.send('squares and log have been updated');
  }
});

router.get('/getLogs', async (req, res) => {
  // send back the session logs array and squares of the game
  sess = req.session;
  if (sess.log === undefined || sess.squares === undefined) {
    sess.log = [];
    sess.squares = Array(9).fill(null);
    sess.winner = false;
    console.log(sess);
    console.log(req.sessionID);
    res.send({ log: sess.log, squares: sess.squares, winner: sess.winner });
  } else {
    console.log(sess);
    console.log(req.sessionID);
    res.send({ log: sess.log, squares: sess.squares, winner: sess.winner });
  }
});

router.post('/closeSession', async (req, res) => {
  // terminates the session
  console.log(req.sessionID);
  req.session.destroy();
  res.sendStatus(200);
});

module.exports = router;
