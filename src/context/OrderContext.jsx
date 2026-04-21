import { createContext, useContext, useReducer, useEffect } from "react";
import OrderReducer from "../reducer/OrderReducer";
import axios from "axios";
import { getToken, getDataset } from "../api/api";

const initialState = {
  orders: [],
  loading: true,
  error: null,
};

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(OrderReducer, initialState);

  // Fetch orders from server
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Step 1: Get Token
        const tokenRes = await getToken(
          "20084016", // replace with your student ID
          "565120", // password
          "food-delivery-orders" // dataset name
        );

        // Step 2: Fetch dataset
        const orders = await getDataset(tokenRes.token, tokenRes.dataUrl);

        dispatch({ type: "SET_ORDERS", payload: orders });
      } catch (err) {
        console.error("Error fetching data:", err.message);
        dispatch({ type: "SET_ERROR", payload: err.message });
      }
    };

    fetchOrders();
  }, []);

  const deleteOrder = (id) => dispatch({ type: "DELETE_ORDER", payload: id });

  const value = {
    ...state,
    deleteOrder,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within OrderProvider");
  }
  return context;
};
