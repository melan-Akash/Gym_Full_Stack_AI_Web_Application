const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const dbUri = process.env.MONGODB_URI || process.env.MONGO_URI || "mongodb://127.0.0.1:27017/forged_gym";
    const conn = await mongoose.connect(dbUri);
    console.log(`[FORGED DB] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[FORGED DB Error] ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
