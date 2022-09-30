const mongoose = require("mongoose");

const UserDetailSchema = mongoose.Schema({
           
          user_id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User"
            },
          band_name:{
              type: String
          },
          instrument: {
            type: String
          }
        },
        {
            timestamps: true
        });

// Export the model
module.exports = mongoose.model('UserDetail', UserDetailSchema);
