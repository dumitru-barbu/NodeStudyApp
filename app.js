const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/config');
const passportConfig = require('./config/passportConfig');

// Connect To Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
	console.log(`Connected to database ${config.database}`);
});

// On Error
mongoose.connection.on('error', (err) => {
	console.log('Database error: '+err);
});

const app = express();

// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

//register routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const shoppingListRoutes = require('./routes/shoppingListRoutes');
app.use('/', authRoutes);
app.use('/users', userRoutes);
app.use('/shoppingList', shoppingListRoutes);

// Index Route
app.get('/', (req, res) => {
	res.send('Invalid Endpoint');
});

app.use((err, req, res, next) => {
	console.log(err);
	res.statusCode(500).send('Internal Server error');
})
// Start Server
app.listen(port, () => {
	console.log('Server started on port '+port);
});
