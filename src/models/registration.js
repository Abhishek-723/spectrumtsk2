const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true, 
        unique: true
    },
    domain: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type:String,
        required: true
    }
});

const Registration = new mongoose.model("Registration", studentSchema);
module.exports= Registration;