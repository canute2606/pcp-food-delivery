import React from "react";
import { Link } from "react-router-dom";
import { useOrder } from "../context/OrderContext";

const OrderCard = ({ order }) => {
  const { deleteOrder } = useOrder();

  const itemsCount = Array.isArray(order.items) ? order.items.length : 0;

  return (
    <div data-testid="order-item">
      <div>
        <h3>Order #{order.orderid}</h3>
        <p>
          <strong>Customer:</strong> {order.customerName || "N/A"}
        </p>
        <p>
          <strong>Restaurant:</strong> {order.restaurant || "N/A"}
        </p>
        <p>
          <strong>Items:</strong> {itemsCount}
        </p>
        <p>
          <strong>Total:</strong> ${(order.totalAmount || 0).toFixed(2)}
        </p>
        <p>
          <strong>Status:</strong> {order.status || "N/A"}
        </p>
        {order.rating && (
          <p>
            <strong>Rating:</strong> {order.rating}/5
          </p>
        )}
      </div>

      <div>
        <Link to={`/orders/${order.orderid}`}>
          <button>View Details</button>
        </Link>
        <button onClick={() => deleteOrder(order.orderid)}>Delete</button>
      </div>
    </div>
  );
};

export default OrderCard;
