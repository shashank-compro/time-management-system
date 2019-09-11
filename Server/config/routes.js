"use strict";

const router = require('express').Router();
const statusController = require('../controllers/statusController');
const leavesController = require('../controllers/leavesController');

// Define the api routes
router.get('/status', statusController.checkStatus);
router.get('/leaves', leavesController.getLeavesByUserId);
router.post('/leaves', leavesController.addLeaves);
router.put('/leaves/:leaveId', leavesController.editLeave);
router.delete('/leaves/:leaveId', leavesController.deleteLeave);

module.exports = router;
