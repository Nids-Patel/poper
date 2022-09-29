const rolesSchema = require('../../Schema/v1/roles');

class Results {

    // Retrieve all roles
    async list() {
       return await rolesSchema.find();
    }

    // Create new role
    async add(data) {
        return await rolesSchema.create(data);
    }

    // Retrieve a single role with id
    async findOne(request_id) {
        return await rolesSchema.findById(request_id)
    }

    // Update a role with id
    async update(request_id, data) {
        return await rolesSchema.findByIdAndUpdate(request_id, data,
            {
                new: true 
            })
    }

    // Delete a role with id
    async delete(request_id) {
        return await rolesSchema.findByIdAndRemove(request_id)
    }

}

module.exports = Results;


