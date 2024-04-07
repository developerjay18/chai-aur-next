import mongoose from 'mongoose';

export async function connectDB() {
  try {
    mongoose.connect(process.env.MONGO_URI);
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('MONGODB CONNECTED SUCCESSFULLY');
    });

    connection.on('error', (error) => {
      console.log(
        "MONGODB CRASHED AFTER CONNECTION. IT'S SERVER PROBLEM",
        error
      );

      process.exit(1);
    });
  } catch (error) {
    console.log('MONGODB CONNECTION FAILED', error);
  }
}
