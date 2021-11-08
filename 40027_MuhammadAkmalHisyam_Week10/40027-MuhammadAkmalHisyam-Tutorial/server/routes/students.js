const express = require('express');
const studentControllers = require('../controllers/students');

const router = express.Router();

router.get('/', studentControllers.getAllStudents);
router.post('/', studentControllers.createStudent);

module.exports = router;
