const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// BodyParser Middleware
app.use(bodyParser.json());

// Connect to MongoDB
const connectionString = process.env.MONGODB_URI;

mongoose.connect(connectionString)
    .then(() => console.log('Successfully connected to MongoDB.'))
    .catch(err => console.error('Connection error', err));

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Successfully connected to the database.");
});
  db.once('open', function() {
    // we're connected!
    console.log("We're connected to the database.");
  });

// Use routes for your collections
app.use('/api/users', require('./routes/users'));
app.use('/api/resources', require('./routes/resources'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));


