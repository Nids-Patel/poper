const usersSchema = require('../../Schema/v1/users');
const jwt = require('jsonwebtoken');

class Results {

    // Retrieve all users
    async list() {
            return await usersSchema.find().populate('userdetail', "instrument");
    }

    // Create new user
    async add(data) {
        return await usersSchema.create(data);
    }

    // Retrieve a single user with id
    async findOne(request_id) {
            return await usersSchema.findById(request_id)
    }

    // Update a user with id
    async update(request_id, data) {
        return await usersSchema.findByIdAndUpdate(request_id, data,
            { 
                new: true 
            })
    }

    // Update documents in user details
    async updatedoc(request_id, data) {
        return await usersSchema.findByIdAndUpdate(request_id, data,
            { 
                new: true 
            })
    }
    // Delete a user with id
    async delete(request_id) {
        return await usersSchema.findByIdAndRemove(request_id)
    }


    // Retrieve all users with roles details
    async userRole() {
       /* return await usersSchema.aggregate([
            {
                $lookup:{ 
                    from: 'roles', 
                    localField:'role_id', 
                    foreignField:'_id',
                    as:'userRole'
                }
            },
        ]) */

       return await usersSchema.find().populate('role_id', 'name -_id')
    }

    // Check user already exist
    async checkUser(req_email) {
        return await usersSchema.findOne({email : req_email})
    }

    // generate jwt token
    async generateAuthToken(user) {
        const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
        return token
    }

}

module.exports = Results;


