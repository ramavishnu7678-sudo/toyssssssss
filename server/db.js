// MongoDB Connection Configuration
// This file can be used for more advanced MongoDB connection handling

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // These options are default in mongoose 6+, but kept for compatibility
    });

    console.log(`✅ MongoDB Connected Successfully!`);
    console.log(`   Host: ${conn.connection.host}`);
    console.log(`   Database: ${conn.connection.name}`);

    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });

    return conn;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.error('   Please check:');
    console.error('   1. MongoDB Atlas cluster is running');
    console.error('   2. Your IP address is whitelisted in MongoDB Atlas');
    console.error('   3. Database user credentials are correct');
    console.error('   4. Connection string in .env file is correct');
    process.exit(1);
  }
};

module.exports = connectDB;

