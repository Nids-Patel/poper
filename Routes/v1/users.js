const express = require('express');
const router = express.Router();

const usersController = new (require('../../Controllers/v1/users'))();
const fileManager = new(require('./../../Configs/fileManager'))();
// Retrieve all users
router.route('/').get(usersController.list);

// Create a new user with image
router.route('/').post(fileManager.upload().single('img'),usersController.add);

// Retrieve a single user with id
router.route('/:id').get(usersController.findOne);

// Update a user with id
router.route('/:id').put(fileManager.upload().single('img'),usersController.update);

// Delete a user with id
router.route('/:id').delete(usersController.delete);

// Retrieve all users with roles details
router.route('/roles/data').get(usersController.userRole);

// Login User
router.route('/login').post(usersController.login);

module.exports = router
