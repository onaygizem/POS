const mongoose = require("mongoose");

const { Schema } = mongoose;

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

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now,
    get: timeStamp,
  },
  customerName: {
    type: String,
    required: true,
  },
  customerNumber: {
    type: Number,
    required: true,
  },
  paymentMode: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  grandTotal: {
    type: Number,
    required: true,
  },
  tax: {
    type: Number,
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
