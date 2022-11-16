const { Schema, model } = require("mongoose");

//function to set timestamp
function timeStamp(createdAt) {
  return (
    [
      createdAt.getDate(),
      createdAt.getMonth() + 1,
      createdAt.getFullYear(),
    ].join("/") +
    " " +
    [createdAt.getHours(), createdAt.getMinutes(), createdAt.getSeconds()].join(
      ":"
    )
  );
}

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    soldAt: {
      type: Date,
      required: false,
    },
    created: {
      type: Date,
      default: Date.now,
      get: timeStamp,
    },
    totalSold: {
      type: Number,
      required: false,
    },
  },
  {
    toJSON: {
      //Mongoose will not include virtuals by default, so add a `virtuals` property and set it's value to true
      virtuals: true,
    },
    id: false,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;
