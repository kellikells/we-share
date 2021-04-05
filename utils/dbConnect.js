import mongoose from 'mongoose';
mongoose.set('useFindAndModify', false);
const connection = {};

// function to check if there is already a connection to the database, or else it will create a connection 
async function dbConnect() {
    if (connection.isConnected) {
        return;
    }

    const db = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        
    });

    connection.isConnected = db.connections[0].readyState;

    console.log('----------------');
    console.log(`connection.isConnected: ${connection.isConnected}`);
}

export default dbConnect;