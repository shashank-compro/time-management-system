"use strict";

const router = require('express').Router();
const statusController = require('../controllers/status.controller');
const leavesController = require('../controllers/leave.controller');
const timeEntriesController = require('../controllers/time-entry.controller');
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');

// api routes
router.get('/status', statusController.checkStatus);

// auth api routes
router.post('/users/register' , userController.createUser);
router.post('/users/login', authController.login);
router.get('/users/:_id', userController.getUsersByUserId);
router.put('/users/:_id', userController.updateUserById);
router.delete('/users/:_id' , userController.deleteUserById);

//timeentry api routes
router.get('/timeentries', timeEntriesController.getTimeEntriesByUserId);
router.post('/timeentries', timeEntriesController.createTimeEntry);
router.put('/timeentries/:timeEntryId', timeEntriesController.updateTimeEntryById);

//Leave api routes
router.get('/leaves', leavesController.getLeavesByUserId);
router.post('/leaves', leavesController.createLeave);
router.put('/leaves/:leaveId', leavesController.updateLeaveById);
router.delete('/leaves/:leaveId', leavesController.deleteLeaveById);

module.exports = router;
