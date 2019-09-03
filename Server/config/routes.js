"use strict";

const router = require('express').Router();
const statusController = require('../controllers/statusController');

// Define the api routes
router.get('/status', statusController.checkStatus);

module.exports = router;
