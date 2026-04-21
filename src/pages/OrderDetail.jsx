import React from "react";
import { useParams, Link } from "react-router-dom";
import { useOrder } from "../context/OrderContext";

const OrderDetail = () => {
  const { id } = useParams();
  const { orders } = useOrder();

  const order = orders.find((o) => o.orderid == id);

  if (!order) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>Order not found</h2>
        <Link to="/orders">
          <button>Back to Orders</button>
        </Link>
      </div>
    );
  }

  const itemsTotal = Array.isArray(order.items)
    ? order.items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0)
    : 0;

  return (
    <div>
      <Link to="/orders">
        <button>Back to Orders</button>
      </Link>

      <div>
        <h2>Order #{order.orderid}</h2>

        <div>
          <h3>Customer Information</h3>
          <p><strong>Customer Name:</strong> {order.customerName || "N/A"}</p>
          <p><strong>Restaurant:</strong> {order.restaurant || "N/A"}</p>
        </div>

        <div>
          <h3>Order Items</h3>
          {Array.isArray(order.items) && order.items.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.name || "N/A"}</td>
                    <td>${(item.price || 0).toFixed(2)}</td>
                    <td>{item.quantity || 0}</td>
                    <td>
                      ${((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No items found</p>
          )}
        </div>

        <div>
          <h3>Order Summary</h3>
          <p><strong>Status:</strong> {order.status || "N/A"}</p>
          <p><strong>Items Total:</strong> ${itemsTotal.toFixed(2)}</p>
          <p><strong>Total Amount:</strong> ${(order.totalAmount || itemsTotal).toFixed(2)}</p>
          {order.deliverytime && <p><strong>Delivery Time:</strong> {order.deliverytime}</p>}
          {order.rating && <p><strong>Rating:</strong> {order.rating}/5</p>}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
