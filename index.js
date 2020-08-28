const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

app.use(cors());
app.use(bodyParser());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, HOST);
