import React, { useEffect, useState } from "react";
import "./Admin.css";

const Admin = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Get all "placed orders" from localStorage (simulate backend)
    const placedOrders = JSON.parse(localStorage.getItem("placedOrders")) || [];
    setOrders(placedOrders);
  }, []);

  const updateStatus = (index, newStatus) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = newStatus;
    setOrders(updatedOrders);
    localStorage.setItem("placedOrders", JSON.stringify(updatedOrders));
  };

  return (
    <div className="admin-container">
      <h1>Admin Dashboard 📦</h1>
      {orders.length === 0 ? (
        <p>No orders yet 😶‍🌫️</p>
      ) : (
        <div className="orders-list">
          {orders.map((order, i) => (
            <div className="order-card" key={i}>
              <h3>Order #{i + 1}</h3>
              <p><strong>Name:</strong> {order.userDetails.name}</p>
              <p><strong>Address:</strong> {order.userDetails.address}</p>
              <p><strong>Phone:</strong> {order.userDetails.phone}</p>

              <h4>Items:</h4>
              <ul>
                {order.items.map((item, j) => (
                  <li key={j}>
                    {item.name} - ₹{item.price}
                  </li>
                ))}
              </ul>

              <label>Status: </label>
              <select
                value={order.status || "Pending"}
                onChange={(e) => updateStatus(i, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Dispatched">Dispatched</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;
