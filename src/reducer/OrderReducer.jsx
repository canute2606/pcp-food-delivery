const OrderReducer = (state, action) => {
  switch (action.type) {
    case "SET_ORDERS":
      // Filter out invalid/incomplete orders
      const validOrders = Array.isArray(action.payload)
        ? action.payload.filter(
            (order) =>
              order.orderid &&
              order.customerName &&
              order.status &&
              Array.isArray(order.items)
          )
        : [];

      return {
        ...state,
        orders: validOrders,
        loading: false,
        error: null,
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
