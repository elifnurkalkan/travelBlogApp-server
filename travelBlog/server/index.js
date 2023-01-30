const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const diariesRoute = require('./routes/diaries');
const authorsRoute = require('./routes/authors');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
app.use(cors());
dotenv.config();
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '/images')));

mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: imageStorage });
app.post('/server/upload', upload.single('file'), (req, res) => {
  res.status(200).json('File has been uploaded');
});

app.use('/server/auth', authRoute);
app.use('/server/diaries', diariesRoute);
app.use('/server/authors', authorsRoute);

app.get('/', function (req, res) {
  res.writeHead(200);
  res.render('users', { users: users });
});

app.listen(8000, () => {
  console.log('Backend server running..');
});
