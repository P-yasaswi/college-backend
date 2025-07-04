const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import Routes
const registrationRoutes = require('./routes/registrationRoutes');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const contactRoutes = require('./routes/contactRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const clubRoutes = require('./routes/clubRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS Configuration: Allow Netlify frontend
app.use(cors({
  origin: "https://sybr-events-827085.netlify.app",
  credentials: true
}));

// ✅ Middleware to parse incoming JSON
app.use(express.json());

// ✅ API Routes
app.use('/api', registrationRoutes);
app.use('/api', userRoutes);
app.use('/api', eventRoutes);
app.use('/api', announcementRoutes);
app.use('/api', contactRoutes);
app.use('/api', feedbackRoutes);
app.use('/api', clubRoutes);

// ✅ Health Check Route
app.get('/', (req, res) => {
  res.send("🎉 College Event & Club Management Backend is Running");
});

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ MongoDB Connected");
  app.listen(PORT, () => {
    console.log(`🚀 Server running at https://college-backend-opcw.onrender.com`);
  });
})
.catch((err) => {
  console.error("❌ MongoDB connection failed:", err);
});
