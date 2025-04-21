import React, { useState, useEffect } from "react";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState({
    name: "",
    address: "",
    phone: ""
  });

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleDispatch = () => {
    if (!user.name || !user.address || !user.phone) {
      alert("Fill all your details first 💁‍♀️");
      return;
    }

    const previousOrders = JSON.parse(localStorage.getItem("placedOrders")) || [];
    previousOrders.push({
      items: cartItems,
      userDetails: user,
      status: "Pending"
    });

    localStorage.setItem("placedOrders", JSON.stringify(previousOrders));
    localStorage.removeItem("cart");
    setCartItems([]);

    alert("Order placed! 🛒✨");
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCartItems([]);
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>No items added 😢</p>
      ) : (
        <ul>
          {cartItems.map((item, i) => (
            <li key={i}>
              <img src={item.image} alt={item.name} />
              <div>
                <p>{item.name}</p>
                <p>₹{item.price}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="user-form">
        <h3>Enter Your Details</h3>
        <input name="name" placeholder="Name" onChange={handleInput} />
        <input name="address" placeholder="Address" onChange={handleInput} />
        <input name="phone" placeholder="Phone" onChange={handleInput} />

        {cartItems.length > 0 && (
          <button onClick={handleDispatch}>Dispatch Order 🚀</button>
        )}
      </div>

      {cartItems.length > 0 && (
        <button className="clear-cart" onClick={clearCart}>
          Clear Cart 🗑️
        </button>
      )}
    </div>
  );
};

export default Cart;

