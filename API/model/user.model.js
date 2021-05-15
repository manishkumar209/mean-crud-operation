import mongoose from 'mongoose';
var Schema = mongoose.Schema({
    fname: String,
    lname: String,
    email: { type: String, unique: true},
    phone_number: Number,
    profile_image: String,
})
export default mongoose.model('User', Schema);