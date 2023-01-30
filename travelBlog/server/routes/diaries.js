const router = require('express').Router();
const { request } = require('express');
const Diary = require('../models/Diary');

//create diary
router.post('/', async (req, res) => {
  const newDiary = new Diary(req.body);
  try {
    const savedDiary = await newDiary.save();
    res.status(200).json(savedDiary);
  } catch (error) {
    res.status(500).json(error);
  }
});

//update diary
router.put('/:id', async (req, res) => {
  try {
    const diary = await Diary.findById(req.params.id);
    if (diary.author === req.body.author) {
      try {
        const updatedDiary = await Diary.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true },
        );
        res.status(200).json(updatedDiary);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json('You can update only your post!');
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//Delete Diary

router.delete('/:id', async (req, res) => {
  try {
    const diary = await Diary.findById(req.params.id);
    if (diary.author === req.body.author) {
      try {
        await diary.delete();
        res.status(200).json('Diary has been deleted');
      } catch (error) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json('You can delete only your diary!');
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get Diary

router.get('/:id', async (req, res) => {
  try {
    const diary = await Diary.findById(req.params.id);
    res.status(200).json(diary);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get All Diaries

router.get('/', async (req, res) => {
  const author = req.query.author;
  try {
    let diaries;
    if (author) {
      diaries = await Diary.find({ author });
    } else {
      diaries = await Diary.find();
    }
    res.status(200).json(diaries);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '1800');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'PUT, POST, GET, DELETE, PATCH, OPTIONS',
  );
});

module.exports = router;
