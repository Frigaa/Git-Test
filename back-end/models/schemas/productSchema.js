import mongoose from 'mongoose';

let Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    tags: [String],
    stock: { type: Number, required: true },
    stocked: { type: Boolean, default: function() { return this.stock > 0; } }
});

export default productSchema;


// Add a field into all products
// which is 'stocked' true or false (if stock > 0 true else)
// add to end point 
