const userAddressSchema = require('../../Schema/v1/useradd');

class Results {

    // Retrieve all users
    async list() {
            return await userAddressSchema.find();
    }

    // Create new user
    async add(data) {
        return await userAddressSchema.create(data);
    }

    // Retrieve a single user with id
    async findOne(request_id) {
            return await userAddressSchema.findById(request_id)
    }

    // Update a user with id
    async update(request_id, data) {
        return await userAddressSchema.findByIdAndUpdate(request_id, data,
            { 
                new: true 
            })
    }
    // Delete a user with id
    async delete(request_id) {
        return await userAddressSchema.findByIdAndRemove(request_id)
    }


    // Retrieve all users with roles details
    async userAll() {
        /* join useraddress => users and useraddress => roles */

        // return await userAddressSchema.aggregate([
        //     { "$lookup": {
        //           "from": "users",
        //           "localField": "user_id",
        //           "foreignField": "_id",
        //           "as": "user"
        //         }},
        //         { "$lookup": {
        //           "from": "roles",
        //           "localField": "roles_id",
        //           "foreignField": "_id",
        //           "as": "roles"
        //         }}
        // ]);

        /* join useraddress => users and users => roles */

        /* Method 1 */

        // return await userAddressSchema.aggregate([{
        //     $lookup: {
        //       from: "users",
        //       localField: "user_id",
        //       foreignField: "_id",
        //       as: "user"
        //     }
        //   }, {
        //     $unwind: {
        //       path: "$user",
        //       preserveNullAndEmptyArrays: true
        //     }
        //   }, {
        //     $lookup: {
        //       from: "roles",
        //       localField: "user.role_id",
        //       foreignField: "_id",
        //       as: "userroles",
        //     }
        //   },  {
        //     $project: {
        //       "_id": 1,
        //       "user.first_name": 1,
        //       "user.last_name": 1,
        //       "userroles.name" : 1,
        //       "address" : 1
        //     }
        //   }]);

         /* Method 2 */

        //  return await userAddressSchema.aggregate([
        //     { "$lookup": {
        //       "from": "users",
        //       "let": { "userId": "$user_id" },
        //       "pipeline": [
        //         { "$match": { "$expr": { "$eq": [ "$_id", "$$userId" ] } } },
        //         { "$lookup": {
        //           "from": "roles",
        //           "let": { "roleId": "$role_id" },
        //           "pipeline": [
        //             { "$match": { "$expr": { "$eq": [ "$_id", "$$roleId" ] } } },
        //           ],
        //           "as": "userroles"
        //         }},
        //         { "$unwind": "$userroles" }
        //       ],
        //       "as": "userdata"
        //     }},
        //     { "$unwind": "$userdata" }
        //   ])


         /* Method 3 */

        return await userAddressSchema.find().populate([{ path: 'user_id', select: ['first_name', 'last_name'], populate: { path: 'role_id', select: ['name'] }}])
    }
}

module.exports = Results;


