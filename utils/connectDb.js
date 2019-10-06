import mongoose from 'mongoose';

const connection = {};

async function connectDb() {
  try {
    if (connection.isConnected) {
      console.info('Using existing DB connection.');
      return;
    }
    const db = await mongoose.connect(process.env.MONGO_SRV, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB connected.');
    connection.isConnected = db.connections[0].readyState;
  } catch (e) { console.error(e); }
}

export default connectDb;
