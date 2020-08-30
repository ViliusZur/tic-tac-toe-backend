const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import routes
const logs = require('./routes/logs');

// Constants
const PORT = 8080;

// App
const app = express();

// had to add credentials and origin in cors params, otherwise the cookie would not save in browser
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use('/api', logs);

app.listen(PORT);
