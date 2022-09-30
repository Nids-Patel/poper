const mongoose = require("mongoose");

const UserAddSchema = mongoose.Schema({
           
          user_id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User"
            },
          address:{
              type: [String]
          },
          city:{
            type: String
          }
        },
        {
            timestamps: true
        });

// Export the model
module.exports = mongoose.model('UserAdd', UserAddSchema);
