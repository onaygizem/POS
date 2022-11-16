const { User, Category, Subcategory, Product, Order } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { async } = require("rxjs");

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find({}).populate("subcategories").populate({
        path: "subcategories",
        populate: "products",
      });
    },

    subCategoriesById: async (parent, { _id }) => {
      return await Subcategory.findById(_id).populate("products");
    },

    subcategories: async () => {
      return await Subcategory.find({}).populate("products");
    },

    productById: async (parent, { _id }) => {
      return await Product.findById(_id);
    },

    products: async (parent, { subcategory, name }) => {
      const params = {};

      if (subcategory) {
        params.subcategory = subcategory;
      }

      if (name) {
        params.name = {
          $regex : new RegExp(name, "i"),
        };
      }
      return await Product.find(params);
    },
    orders: async () => {
      return await Order.find({}).sort({purchaseDate: 'desc'}).populate("products");
    },
    orderById: async (parent, { _id }) => {
      return await Order.findById(_id).populate("products");
    },
  },

  Mutation: {
    addProduct: async (parent, { name, price, stock, image, subcategory }) => {
      return Product.create({ name, price, stock, image, subcategory });
    },

    removeProduct: async (parent, { productId }) => {
      return Product.findOneAndDelete({ _id: productId });
    },

    updateProduct: async (parent, { _id, price, stock }) => {
      const stockNumber = Math.abs(stock)

      return await Product.findByIdAndUpdate(
        _id,
        { $set: { price: price, stock: stockNumber }},
        { new: true }
      );
    },

    addCategory: async (parent, { name }) => {
      return Category.create({ name });
    },

    removeCategory: async (parent, { categoryId }) => {
      return Category.findOneAndDelete({ _id: categoryId });
    },

    addSubcategory: async (parent, { name, category }) => {
      return Subcategory.create({ name, category });
    },

    removeSubcategory: async (parent, { subcategoryId }) => {
      return Subcategory.findOneAndDelete({ _id: subcategoryId });
    },

    addOrder: async (parent, { customerName, customerNumber, paymentMode, total, grandTotal, tax, products }) => {
      return await Order.create({ customerName, customerNumber, paymentMode, total, grandTotal, tax, products });
    },

    addUser: async (parent, { name, employeeId, password }) => {
      const user = await User.create({ name, employeeId, password });
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { employeeId, password }) => {
      const user = await User.findOne({ employeeId });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
