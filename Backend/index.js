const express = require('express');
const app = express();
const PORT = 5000;

const cors = require('cors');
app.use(cors());
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.send({ message: "Hi from backend!" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://tumharaURL') // replace with real URL
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
