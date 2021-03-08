import mongoose from 'mongoose';

const connection = {};

// function to check if there is already a connection to the database, or else it will create a connection 
async function dbConnect() {
    
    if (connection.isConnected) {
        return;
    }

    const db = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    connection.isConnected = db.connections[0].readyState;

    console.log(connection.isConnected);

}

export default dbConnect;