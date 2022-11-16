import { gql } from "@apollo/client";

export const QUERY_CAT_SUBCAT_PRODUCT = gql`
  query Categories {
    categories {
      name
      _id
      subcategories {
        _id
        name
        products {
          image
          name
          price
          stock
          _id
        }
      }
    }
  }
`;


export const QUERY_PRODUCT_BY_NAME = gql`
  query Product($name: String) {
    products(name: $name) {
      price
      stock
      name
      _id
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  query Categories {
    categories {
      _id
      name
    }
  }
`;

export const SUB_CATEGORIES_BY_CATEGORY = gql`
  query SubCategoriesById($category: ID) {
    subCategoriesById(category: $category) {
      _id
      name
    }
  }
`;

export const PRODUCT_BY_SUBCATEGORY = gql`
  query ProductById($subcategory: ID) {
    productById(subcategory: $subcategory) {
      name
      _id
    }
  }
`;

export const PRODUCTS_SUBCAT_CAT = gql`
  query Products {
    products {
      name
      subcategory {
        name
        _id
        category {
          name
          _id
        }
      }
    }
  }
`;

export const QUERY_PRODUCTS = gql`
  query Query {
    products {
      _id
      name
      price
      stock
      image
    }
  }
`;

// export const QUERY_PRODUCTS = gql`
//   query Product {
//     products {
//       name
//       _id
//       image
//       price
//       stock
//       subcategory {
//         _id
//         category {
//           _id
//           name
//         }
//         name
//       }
//     }
//   }
// `;

export const QUERY_ORDERS = gql`
  query ORDERS {
    orders {
      _id
      customerName
      customerNumber
      total
      grandTotal
      tax
      paymentMode
      purchaseDate
      products {
        name
        price
      }
    }
  }
`;
