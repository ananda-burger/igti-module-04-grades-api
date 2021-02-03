import mongoose from 'mongoose';

let db = {}
db.mongoose = mongoose;

const connect = async () => {
  try {
    await db.mongoose.connect(process.env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    process.exit();
  }
};

export { db, connect };
