const express = require('express');
const router = express.Router();

const rolesController = new (require('../../Controllers/v1/roles'))();

// Retrieve all roles
router.route('/').get(rolesController.list);

// Create a new role
router.route('/').post(rolesController.add);

// Retrieve a single role with id
router.route('/:id').get(rolesController.findOne);

// Update a role with id
router.route('/:id').put(rolesController.update);

// Delete a role with id
router.route('/:id').delete(rolesController.delete);

module.exports = router