import React, { useEffect, useState } from "react";
import { useOrder } from "../context/OrderContext";
import OrderList from "../components/OrderList";

const Orders = () => {
  const { orders } = useOrder();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.restaurant?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderid?.toString().includes(searchTerm);

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <h1>Food Delivery Orders</h1>

      <div>
        <div>
          <input
            type="text"
            placeholder="Search by customer name, restaurant, or order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            data-testid="filter-input"
          />
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <p>
        Showing {filteredOrders.length} of {orders.length} orders
      </p>

      <OrderList filteredOrders={filteredOrders} />
    </div>
  );
};

export default Orders;
