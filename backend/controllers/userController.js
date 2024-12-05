const express = require("express"); 
const router = express.Router(); 
const User = require("../models/User"); 
const passport = require("passport") 
const bcrypt = require("bcrypt"); 

router.post('/register', async (req, res) => {
	const { username, email, password } = req.body;
	const hashedPassword = await bcrypt.hash(password, 10);
	console.log("Entered register")
	console.log(`Params: ${username}, ${password}, ${email}`)
	try {
	  const newUser = new User({ username, email, password: hashedPassword });
	  console.log(newUser)		
	  await newUser.save();
	  console.log("registered")
	  res.status(201).send('User registered successfully');
	} catch (err) {
		console.log("not registered")
	//   res.status(500).send('Error registering user');
		console.error(err)
		res.status(500).json({ message: 'Error registering user', error: err.message });
	}
});
  
router.post('/login', passport.authenticate('local', {
	successRedirect: '/profile',
	failureRedirect: '/login',
	failureFlash: true,
}));

router.get('/profile', (req, res) => {
	if (req.isAuthenticated()) {
		res.json({ user: req.user });
	} else {
		res.status(401).send('You are not authenticated');
	}
});

router.get('/logout', (req, res) => {
	req.logout((err) => {
		if (err) return res.status(500).send('Error logging out');
		res.redirect('/');
	});
});

module.exports = router; 
