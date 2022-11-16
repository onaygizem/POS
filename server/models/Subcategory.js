const { Schema, model } = require('mongoose');

const subcategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }],
});

const Subcategory = model("Subcategory", subcategorySchema);

module.exports = Subcategory;




