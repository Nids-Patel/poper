const mongoose = require("mongoose");

var lengthValidator = function(val) {
  if (val && val.length >= 5){
    return true;
  }
  return false;
};

var emailValidator = function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email));
}

const UserSchema = mongoose.Schema({
           
          first_name: {
            type : String,
            required : [true, 'Firstname is Required'],
            validate: [lengthValidator, 'Enter name with length greater than 5']
          },
          last_name: {
            type : String
          },
          email: {
            type : String,
            validate: [emailValidator, 'Enter proper email Id'],
            lowercase: true
          },
          password: {
            type : String
          },
          phone: {
            type : String,
            minLength : 10
          },
          role_id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Roles"
            },
          img:{
              type: String
          }
        },
        {
            timestamps: true
        });


    // Changing "_id" key to "id"
      UserSchema.virtual('id').get(function(){
          return this._id.toHexString();
      });

      UserSchema.set('toJSON',{
          virtuals: true
      });

// Export the model
module.exports = mongoose.model('User', UserSchema);
