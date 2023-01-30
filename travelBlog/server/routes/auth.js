const router = require('express').Router();
const User = require('../models/Author');
const bcrypt = require('bcrypt');

//Register

router.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
});

//Login

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(400).json('Wrong credentials');

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json('Wrong credentials');

    const { password, ...others } = user._doc;
    return res.status(200).json(others);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
