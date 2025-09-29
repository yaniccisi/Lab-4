const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Import routes
const authRoutes = require('./routes/authRoutes');
const reportRoutes = require('./routes/reportRoutes'); // Add this line

// Use routes - IMPORTANT: Mount auth routes first
app.use('/api/auth', authRoutes);
app.use('/api', reportRoutes); // Add this line after auth routes

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Lab Auth Joins API Server' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Report endpoints available at http://localhost:${PORT}/api/reports/*`);
  console.log('All report endpoints require admin authentication');
});