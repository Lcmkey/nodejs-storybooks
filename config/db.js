const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const { MONGO_URI } = process.env;

    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

    const { host } = conn.connection;
    console.log(`MongoDB Connected: ${host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
