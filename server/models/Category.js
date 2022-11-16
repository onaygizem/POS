const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  subcategories: [{
    type: Schema.Types.ObjectId,
    ref: "Subcategory"
  }],
});

const Category = model("Category", categorySchema);

module.exports = Category;
