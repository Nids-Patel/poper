const userDetailModel = new (require('../../Models/v1/userdetail'))();

class UserDetailController {
    
    // Retrieve all users
    async list(req, res) {
        try {
            let data = await userDetailModel.list();
            res.status(200).send({
                message: "User Detail List retrieved successfully!!",
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
            
            let data = await userDetailModel.add(req.body);
            res.handler.created(data, 'User Detail data inserted successfully');
        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // Retrieve a single user with id
    async findOne(req, res) {
        try {
            let data = await userDetailModel.findOne(req.params.id)
            res.handler.success(data, 'User Detail data retrieved successfully.');
        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // Update a user with id
    async update(req, res) {
        try {
            let data = await userDetailModel.update(req.params.id, req.body)
            res.handler.success(data, 'User Detail data updated successfully');
        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // Delete a user with id
    async delete(req, res) {
        try {
            let data = await userDetailModel.delete(req.params.id)
            res.handler.success(data, 'User Detail data deleted successfully');
        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // Retrieve all users with roles details
    async userAll(req, res) {
        try {
            let data = await userDetailModel.userAll();
            res.handler.success(data, 'User Detail data with Role retrieved successfully');
        } catch (error) {
            res.handler.serverError(error);
        }
    }

}   

module.exports = UserDetailController;
