const express = require('express');
const router = express.Router();

const userDetailController = new (require('../../Controllers/v1/userdetail'))();

// Retrieve all users
router.route('/').get(userDetailController.list);

// Create a new user with image
router.route('/').post(userDetailController.add);

// Retrieve a single user with id
router.route('/:id').get(userDetailController.findOne);

// Update a user with id
router.route('/:id').put(userDetailController.update);

// Delete a user with id
router.route('/:id').delete(userDetailController.delete);

// Retrieve all users with roles details
router.route('/userall/data').get(userDetailController.userAll);

module.exports = router