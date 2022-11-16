import { gql } from "@apollo/client";

export const ADD_ORDER = gql`
  mutation AddOrder($customerName: String!, $customerNumber: Float!, $total: Float!, $grandTotal: Float!, $tax: Float!, $paymentMode: String!, $products: [ProductInput!]) {
    addOrder(customerName: $customerName, customerNumber: $customerNumber, total: $total, grandTotal: $grandTotal, tax: $tax, paymentMode: $paymentMode, products: $products) {
      _id
    }
  }
`;

export const UPDATE_PRODUCT_STOCK = gql`
  mutation UpdateProduct($id: ID!, $price: Float!, $stock: Int!) {
    updateProduct(_id: $id, price: $price, stock: $stock) {
      _id
      price
      stock
    }
  }
`;

export const LOGIN = gql`
  mutation login($employeeId: String!, $password: String!) {
    login(employeeId: $employeeId, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($name: String!, $employeeId: String!, $password: String!) {
    addUser(name: $name, employeeId: $employeeId, password: $password) {
      token
      user {
        _id
        employeeId
        name
      }
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation AddCategory($name: String!) {
    addCategory(name: $name) {
      name
    }
  }
`;

export const REMOVE_CATEGORY = gql`
  mutation Mutation($categoryId: ID!) {
    removeCategory(categoryId: $categoryId) {
      _id
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation Mutation(
    $name: String!
    $stock: Int!
    $price: Float!
    $image: String
    $subcategory: ID
  ) {
    addProduct(
      name: $name
      stock: $stock
      price: $price
      image: $image
      subcategory: $subcategory
    ) {
      _id
      name
    }
  }
`;

export const REMOVE_PRODUCT = gql`
  mutation Mutation($productId: ID!) {
    removeProduct(productId: $productId) {
      _id
    }
  }
`;
