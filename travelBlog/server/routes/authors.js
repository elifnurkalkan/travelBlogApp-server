const router = require('express').Router();
const Author = require('../models/Author');
const Diary = require('../models/Diary');
const bcrypt = require('bcrypt');

//Update Author

router.put('/:id', async (req, res) => {
  if (req.body.authorId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedAuthor = await Author.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true },
      );
      res.status(200).json(updatedAuthor);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json('You can update only your account!');
  }
});

//Delete Author

router.delete('/:id', async (req, res) => {
  if (req.body.authorId === req.params.id) {
    try {
      const author = await Author.findById(req.params.id);
      try {
        await Diary.deleteMany({ username: author.username });
        await Author.findByIdAndDelete(req.params.id);
        res.status(200).json('Author has been deleted..');
      } catch (error) {
        res.status(500).json(error);
      }
    } catch (error) {
      res.status(404).json('User not found!');
    }
  } else {
    res.status(401).json('You can delete only your account!');
  }
});

module.exports = router;
