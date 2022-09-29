const usersModel = new (require('../../Models/v1/users'))();
const useraddressModel = new (require('../../Models/v1/useradd'))();
const userdetailModel = new (require('../../Models/v1/userdetail'))();
//const qr_code = require('qrcode');
const crypto = require('crypto-js');

class UsersController {
    
    // Retrieve all users
    async list(req, res) {
        try {
            let data = await usersModel.list();
            res.status(200).send({
                message: "User List retrieved successfully!!",
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

            const file = req.file;

            // check if image selected
            if(!file) {
                return res.status(400).send('No image selected');
            }

            // show image path
            const fileName = req.file.filename;
            const basepath = `${req.protocol}://${req.get('host')}/Assets/`;
            req.body.img = `${basepath}${fileName}`;

            // QR Code Generation
            // const url = req.body.email;
            // if(url){
                // Print the QR code to terminal
                /* qr_code.toString(url,{type:'terminal'},
                                    function (err, QRcode) {
                
                    if(err) return console.log("error occurred")
                    var file_path = "Assets/qrcode/"+ Date.now() +".png";
                    qr_code.toFile(file_path,url);
                    // Printing the generated code
                    console.log(QRcode)
                }) */
                // qr_code.toDataURL(url, (err, QRcode) => {
                //     if(err) return console.log("error occurred")
                //     var file_path = "Assets/qrcode/"+ Date.now() +".png";
                //     qr_code.toFile(file_path,url);
                //     // Printing the generated code
                //     console.log(QRcode)
                // });

            // }else{
            //     res.send('URL Not Set!');
            // }

            let data = await usersModel.add(req.body);
            req.body.user_id = data._id
            let useraddress = await useraddressModel.add(req.body);
            let userdetail = await userdetailModel.add(req.body);
            res.status(200).send({
                message: "User data inserted successfully!!",
                data: data 
            });
        } catch (error) {
            res.status(404).send(error);
        }
    }

    // Retrieve a single user with id
    async findOne(req, res) {
        try {
            let data = await usersModel.findOne(req.params.id)
            res.status(200).send({
                message: "User data retrieved successfully!!",
                data: data 
            });
            // Use of Session 
            // if(req.session.page_views){
            //     req.session.page_views++;
            //     res.handler.success(data, 'User data retrieved successfully. You visited this page '+ req.session.page_views + " times");
            //  } else {
            //     req.session.page_views = 1;
            //     res.handler.success(data,"User data retrieved successfully. Welcome to this page for the first time!");
            //  }  
            
        } catch (error) {
            res.status(404).send(error);
        }
    }

    // Update a user with id
    async update(req, res) {
        try {
            const file = req.file;

           // check if image selected and show image path
            if(file){
                const fileName = req.file.filename;
                const basepath = `${req.protocol}://${req.get('host')}/Assets/`;
                req.body.img = `${basepath}${fileName}`
            } 

            let data = await usersModel.update(req.params.id, req.body)
            res.handler.success(data, 'User data updated successfully');
        } catch (error) {
            res.status(404).send(error);
        }
    }

    // Delete a user with id
    async delete(req, res) {
        try {
            let data = await usersModel.delete(req.params.id)
            res.handler.success(data, 'User data deleted successfully');
        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // Retrieve all users with roles details
    async userRole(req, res) {
        try {
            let data = await usersModel.userRole();
            res.handler.success(data, 'User data with Role retrieved successfully');
        } catch (error) {
            res.status(404).send(error);
        }
    }

     // Login User
     async login(req, res) {
        try {
            const user = await usersModel.checkUser(req.body.email);
            if (!user) {
                return res.status(404).send({
                    message: "Email Id not found"
                });
            }

            // Decrypt password
            var decrypted = crypto.AES.decrypt(user.password, process.env.JWT_SECRET).toString(crypto.enc.Utf8)
            
            //Check password match
            if (req.body.password !== decrypted) {
                return res.status(404).send({
                    message: "Password mismatch"
                });
            }

            //Generate Token
            const token = await usersModel.generateAuthToken(user);
            user.tokens = user.tokens.concat({ token })
            await user.save();

            if(user.role == 0 && req.body.project_type == 'Admin'){
                res.handler.success({email: user.email, token: token, customer_id: user._id, username: user.first_name}, 'Admin is successfully logged in!!');
            }
            else if(user.role == 0 && req.body.project_type != 'Admin'){
                return res.status(404).send({
                    message: "User not found"
                });
            }

            else if(user.role == 1 && req.body.project_type == 'User'){
                res.handler.success({email: user.email, token: token, customer_id: user._id, username: user.first_name}, 'User is successfully logged in!!');
            }

            else if(user.role == 1 && req.body.project_type != 'User'){
                return res.status(404).send({
                    message: "Admin not found"
                });
            }
        } catch(error) {
            res.status(404).send(error);
        }
    }

}   

module.exports = UsersController;
