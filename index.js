const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import routes
const logs = require('./routes/logs');

// Constants
const PORT = 8080;

// App
const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(bodyParser());
app.use('/api', logs);

app.listen(PORT);
