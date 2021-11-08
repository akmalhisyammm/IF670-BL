const express = require('express');
const memoryControllers = require('../controllers/memories');

const router = express.Router();

router.get('/', memoryControllers.getAllMemories);
router.post('/', memoryControllers.createMemory);

module.exports = router;
