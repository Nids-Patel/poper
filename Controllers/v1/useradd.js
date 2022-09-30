const userAddressModel = new (require('../../Models/v1/useradd'))();

class UserAddressController {
    
    // Retrieve all users
    async list(req, res) {
        try {
            let data = await userAddressModel.list();
            res.status(200).send({
                message: "User Address List retrieved successfully!!",
                data: data 
            });
        } catch (error) {
            res.status(404).send(error);
        }
    }

    // Create new user
    async add(req, res) {
        try {
            if (!req.body) {
                return res.status(400).send({
                    message: "Please fill all required field"
                });
            } 
            
            let data = await userAddressModel.add(req.body);
            res.handler.created(data, 'User Address data inserted successfully');
        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // Retrieve a single user with id
    async findOne(req, res) {
        try {
            let data = await userAddressModel.findOne(req.params.id)
            res.handler.success(data, 'User Address data retrieved successfully.');
        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // Update a user with id
    async update(req, res) {
        try {
            let data = await userAddressModel.update(req.params.id, req.body)
            res.handler.success(data, 'User Address data updated successfully');
        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // Delete a user with id
    async delete(req, res) {
        try {
            let data = await userAddressModel.delete(req.params.id)
            res.handler.success(data, 'User Address data deleted successfully');
        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // Retrieve all users with roles details
    async userAll(req, res) {
        try {
            let data = await userAddressModel.userAll();
            res.handler.success(data, 'User Address data with Role retrieved successfully');
        } catch (error) {
            res.handler.serverError(error);
        }
    }

}   

module.exports = UserAddressController;
