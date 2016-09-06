import  mongoose  from 'mongoose';

let userSchema = mongoose.Schema({
    first_name : { type : String},
    last_name : {type : String},
    contact_number: {type : String},
    email_address : { type : String, unique : true },
    blood_group : {type : String},
    objectId : {type : String, unique : true},
    link : {type : String}
});

// Create the model for users and expose it to the app
export default mongoose.model('User', userSchema);

