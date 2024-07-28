import mongoose from 'mongoose';

let Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    address: {
        street: String,
        city: String,
        zipcode: String
    },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
});

export default userSchema