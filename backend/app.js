const express = require('express');
const app = express();
const students = require('./routes/students');
const courses = require('./routes/courses');
const cors = require('cors');
const passport = require("passport"); 
const localStrategy = require("./passport.js"); 
const connectDB = require("./data/db"); 
const session = require("express-session"); 
require('dotenv').config()
const bcrypt = require("bcrypt"); 
const User = require("./models/User")
// const users = require('./routes/users.js')
const users = require('./controllers/userController.js')

connectDB();
app.use(cors({origin: 'http://localhost:3000', methods: 'GET,POST,PUT,DELETE', credentials: true}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

console.log(process.env.SECRET)

app.use( 
	session({ 
		secret: process.env.SECRET, 
		resave: false, 
		saveUninitialized: false, 
	}) 
); 

app.use(passport.initialize());
app.use(passport.session()); 
passport.serializeUser((user, done) => done(null, user.id)); 
passport.deserializeUser(async (id, done) => {
	try {
	  const user = await User.findById(id);
	  done(null, user);
	} catch (err) {
	  done(err, null);
	}
});

//routes
app.use(students)
app.use(courses)
app.use(users)

const port = 8000
app.listen(port, () => console.log(`Server started on port ${port}`))