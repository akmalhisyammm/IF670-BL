const db = require('../services/database');

exports.getAllStudents = async (req, res, next) => {
  try {
    const students = await db.query('SELECT * FROM students');
    res.status(200).json(students);
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.createStudent = async (req, res, next) => {
  const { nim, nama, prodi } = req.body;
  const foto = req.file?.path;

  if (nim && nama && prodi) {
    try {
      const student = await db.query(
        'INSERT INTO students (nim, nama, prodi, foto) VALUES (?, ?, ?, ?)',
        [nim, nama, prodi, foto ?? null]
      );
      res.status(201).json(student);
    } catch (err) {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    }
  } else {
    res.status(400).json({ message: 'Data yang dimasukkan tidak lengkap!' });
  }
};
