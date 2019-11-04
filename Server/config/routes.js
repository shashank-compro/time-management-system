"use strict";

const router = require('express').Router();
const statusController = require('../controllers/status.controller');
const leavesController = require('../controllers/leave.controller');
const timeEntriesController = require('../controllers/time-entry.controller');
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');

// api routes
router.get('/status', authController.protectedRequest);

// auth api routes
router.post('/users/register' , userController.createUser);
router.post('/users/login', authController.login);
router.get('/users/:userid', userController.getUserById);
router.put('/users/:userid', userController.updateUserById);
router.delete('/users/:userid' , userController.deleteUserById);

//timeentry api routes
router.get('/timeentries',[authController.protectedRequest],timeEntriesController.getTimeEntriesByUserId);
router.post('/timeentries',[authController.protectedRequest],timeEntriesController.createTimeEntry);
router.put('/timeentries/:timeEntryId',[authController.protectedRequest], timeEntriesController.updateTimeEntryById);

//Leave api routes
router.get('/leaves', [authController.protectedRequest],leavesController.getLeavesByUserId);
router.post('/leaves', [authController.protectedRequest], leavesController.createLeave);
router.put('/leaves/:leaveId',[authController.protectedRequest], leavesController.updateLeaveById);
router.delete('/leaves/:leaveId',[authController.protectedRequest], leavesController.deleteLeaveById);

module.exports = router;
