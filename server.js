const express = require('express');
const mongoose = require('mongoose');

const user = require('./routes/api/user');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// DB Configuration
const db = require('./config/keys').mongoURL;

//Connect to Mongo DB
mongoose.connect(db)
    .then(() => console.log('Successfully connected to Mongo database.'))
    .catch(error => console.log(error));

app.get('/', (req, res) => res.send('<h1>It works!</h1>'));

const port = process.env.PORT || 5000;

//Use Route Files
app.use('/api/user', user);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.listen(port, () => console.log(`Server running on port: ${port}.`));