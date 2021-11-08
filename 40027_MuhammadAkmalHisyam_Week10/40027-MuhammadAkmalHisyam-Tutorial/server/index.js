const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const studentRoutes = require('./routes/students');

const app = express();
const PORT = 8101;

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('foto')
);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/students', studentRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`⚡️ Server is running on port ${PORT}`);
});
