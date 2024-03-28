import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('MONGODB CONNECTED SUCCESSFULLY');
    });

    connection.on('error', () => {
      console.log('ERROR WHILE CONNECTION WITH DB.CONNECTION');
      process.exit(1);
    });
  } catch (error) {
    console.log('MONGODB CONNECTION FAILED', error);
  }
};

export default connectDB;
