const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({ credentials: true, origin: "https://user-profile-frontend-velr.onrender.com" }));


app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected"))
  .catch(err => console.log("MongoDB connection error", err));

// Routes
app.use('/api/user', userRoutes);


app.use('/api/test', (req,res) => {
  res.send("server test")
});

// Server Start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
