const express = require('express');
const router = express.Router();

const userAddressController = new (require('../../Controllers/v1/useradd'))();

// Retrieve all users
router.route('/').get(userAddressController.list);

// Create a new user with image
router.route('/').post(userAddressController.add);

// Retrieve a single user with id
router.route('/:id').get(userAddressController.findOne);

// Update a user with id
router.route('/:id').put(userAddressController.update);

// Delete a user with id
router.route('/:id').delete(userAddressController.delete);

// Retrieve all users with roles details
router.route('/userall/data').get(userAddressController.userAll);

module.exports = router