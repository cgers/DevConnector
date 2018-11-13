const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
const user = require('./routes/api/user');

const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// DB Configuration
const db = require('./config/keys').mongoURL;

//Connect to Mongo DB
mongoose.connect(db)
    .then(() => console.log('Successfully connected to Mongo database.'))
    .catch(error => console.log(error));

//app.get('/', (req, res) => res.send('<h1>It works!</h1>'));

//Passport middleware
app.use(passport.initialize());
//Passport configuration/strategy file
require('./config/passport')(passport);

const port = process.env.PORT || 5000;

//Use Route Files
app.use('/api/user', user);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.listen(port, () => console.log(`Server running on port: ${port}.`));