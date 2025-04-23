const express = require('express');
const app = express();
const db = require('./DbSetup/MySqlConnection');
const PerfumeRoutes = require('./routes/PerfumeRoutes')
const UserRoutes = require('./routes/UserRoutes');
const OrdersRoutes = require('./routes/OrdersRoutes');
const ReviewRoutes = require('./routes/ReviewRoutes');
const CartItemRoutes = require('./routes/CartItemRoutes');

app.use(express.json()); // Parse JSON bodies

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Perfume routes
app.use('/api/perfumes', PerfumeRoutes);
//User routes
app.use('/api/users', UserRoutes);
// Order routes
app.use('/api/orders', OrdersRoutes);
// Review routes
app.use('/api/reviews', ReviewRoutes);
// cart_item routes
app.use('/api/cart_items', CartItemRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
