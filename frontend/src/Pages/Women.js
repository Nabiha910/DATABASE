import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // for navigation
import './Women.css';

const products = [
  {
    name: "FLORAL Elegance",
    desc: "A fresh, floral scent perfect for every occasion.",
    image: "/images/i2.jpg",
    price: 49.99
  },
  {
    name: "Luxury Rose",
    desc: "A luxurious, rose-scented fragrance for elegance.",
    price: 79.99,
    image: "/images/i2.jpg"
  },
  {
    name: "Velvet Jasmine",
    desc: "A rich, jasmine fragrance for bold personalities.",
    price: 59.99,
    image: "/images/i2.jpg",
    
  },
  {
    name: "Golden Peony",
    desc: "Elegant and romantic, perfect for special evenings.",
    price: 69.99,
    image: "/images/i2.jpg",
  },
  {
    name: "Amber Whisper",
    desc: "A warm and sensual scent with amber notes.",
    price: 54.99,
    image: "/images/i2.jpg",
  },
  {
    name: "Citrus Bloom",
    desc: "Bright citrus and blooming florals in a bottle.",
    price: 39.99,
    image: "/images/i2.jpg",
  }
];

const Women = () => {
  const [cart, setCart] = useState([]);
  const [sortedProducts, setSortedProducts] = useState(products);
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const sortProducts = (option) => {
    setSortOption(option);
    let sorted = [...products];
    switch (option) {
      case "lowToHigh":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "highToLow":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "aToZ":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "zToA":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        sorted = [...products];
    }
    setSortedProducts(sorted);
  };

  return (
    <div>
      {/* Cart button at top right */}
      <div style={{ textAlign: 'right', padding: '10px 20px' }}>
        <Link to="/cart">
          <button className="button">Go to Cart 🛒</button>
        </Link>
      </div>

      <h1>Women Collection</h1>

      {/* Sorting */}
      <div>
        <label htmlFor="sort">Sort by: </label>
        <select id="sort" value={sortOption} onChange={(e) => sortProducts(e.target.value)}>
          <option value="">Select</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
          <option value="aToZ">Name: A to Z</option>
          <option value="zToA">Name: Z to A</option>
        </select>
      </div>

      {/* Product grid */}
      <div id="product-container" className="product-container">
        {sortedProducts.map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.desc}</p>
            <div className="price">${product.price.toFixed(2)}</div>
            <button className="button" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart info */}
      <div className="cart-info">
        <h3>Cart: {cart.length} items</h3>
      </div>
    </div>
  );
};

export default Women;
