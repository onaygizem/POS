const intialState = {
  loading: false,
  cartProducts: [],
};

export const rootReducer = (state = intialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cartProducts: [...state.cartProducts, action.payload],
      };
    case "UPDATE_CART":
      return {
        ...state,
        cartProducts: state.cartProducts.map((product) =>
          product._id === action.payload._id
            ? { ...product, quantity: action.payload.quantity }
            : product
        ),
      };
    case "DELETE_FROM_CART":
      return {
        ...state,
        cartProducts: state.cartProducts.filter(
          (product) => product._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};
