const rolesModel = new (require('../../Models/v1/roles'))();

class RolesController {
    
    // Retrieve all roles
    async list(req, res) {
        try {
            let data = await rolesModel.list();
            res.status(200).send({
                message: "Role List retrieved successfully!!",
                data: data 
            });
        }
        catch (error) {
            res.status(404).send(error);
        }
    }

    // Create new role
    async add(req, res) {
        try {
            if(req.body.name == ""){
                res.status(200).send({
                    message: "Role data is required!!"
                });
            }
            else{
                let data = await rolesModel.add(req.body);
                res.status(200).send({
                    message: "Role data inserted successfully!!",
                    data: data 
                });
            }
        } 
        catch (error) {
            res.status(404).send({message: "Role already exist!!"});
        }
    }

    // Retrieve a single role with id
    async findOne(req, res) {
        try {
            let data = await rolesModel.findOne(req.params.id)
            res.status(200).send({
                message: "Role data retrieved successfully!!",
                data: data 
            });
        } catch (error) {
            res.status(404).send(error);
        }
    }

    // Update a role with id
    async update(req, res) {
        try {
            if(req.body.name == ""){
                res.status(200).send({
                    message: "Role data is required!!"
                });
            }
            else{
                let data = await rolesModel.update(req.params.id, req.body);
                res.status(200).send({
                    message: "Role data updated successfully!!",
                    data: data 
                });
            }
        } catch (error) {
            res.status(404).send({message: "Role already exist!!"});
        }
    }

    // Delete a role with id
    async delete(req, res) {
        try {
            let data = await rolesModel.delete(req.params.id);
            res.status(200).send({
                message: "Role data deleted successfully!!",
                data: data 
            });
        } catch (error) {
            res.status(404).send(error);
        }
    }

}

module.exports = RolesController;
