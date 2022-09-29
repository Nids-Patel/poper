const mongoose = require('mongoose');

const RolesSchema = mongoose.Schema({
    name: {
        type : String,
        required : [true, 'Roles Name is required'],
        unique : true
    }
},
    {
        timestamps: true
    });

// Export the model
module.exports = mongoose.model('Roles', RolesSchema);