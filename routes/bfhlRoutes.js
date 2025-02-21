const express = require('express');
const router = express.Router();
const { getBfhl, postBfhl } = require('../controllers/bfhlController');

router.get('/', getBfhl);
router.post('/', postBfhl);

module.exports = router; 