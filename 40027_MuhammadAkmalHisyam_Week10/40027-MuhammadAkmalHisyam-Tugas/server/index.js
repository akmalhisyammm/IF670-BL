const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const memoryRoutes = require('./routes/memories');

const app = express();
const PORT = 8101;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(multer().single('photo'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/memories', memoryRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`⚡️ Server is running on port ${PORT}`);
});
