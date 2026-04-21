const OrderReducer = (state, action) => {
  switch (action.type) {
    case "SET_ORDERS":
      // Accept all orders - Q1 will validate them
      // Only check for basic structure (orderid and items array)
      const validOrders = Array.isArray(action.payload)
        ? action.payload.filter(
            (order) =>
              order.orderid && // Must have order ID
              Array.isArray(order.items) // Must have items array
          )
        : [];

      return {
        ...state,
        orders: validOrders,
        loading: false,
        error: null,
      };

    case "UPDATE_ORDER_STATUS":
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.orderid === action.payload.orderid
            ? { ...order, status: action.payload.status }
            : order
        ),
      };

    case "DELETE_ORDER":
      return {
        ...state,
        orders: state.orders.filter((order) => order.orderid !== action.payload),
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      console.warn("Unknown action:", action.type);
      return state;
  }
};

export default OrderReducer;
