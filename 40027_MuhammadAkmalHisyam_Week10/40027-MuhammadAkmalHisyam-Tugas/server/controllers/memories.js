const db = require('../services/database');
const helper = require('../helpers/helper');

exports.getAllMemories = async (req, res, next) => {
  try {
    const memories = await db.query('SELECT * FROM memories');
    res.status(200).json(memories);
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.createMemory = async (req, res, next) => {
  const { title, type, photo, lat, lng } = req.body;

  const imageName = `${new Date().getTime()}.jpg`;
  helper.base64_decode(photo, imageName);

  if (title && type && lat && lng) {
    try {
      const memory = await db.query(
        'INSERT INTO memories (title, type, photo, lat, lng) VALUES (?, ?, ?, ?, ?)',
        [title, type, `uploads/${imageName}`, lat, lng]
      );
      res.status(201).json(memory);
    } catch (err) {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    }
  } else {
    res.status(400).json({ message: 'Data yang dimasukkan tidak lengkap!' });
  }
};
