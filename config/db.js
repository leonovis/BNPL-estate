const mongoose = require('mongoose');

const connectDB = async () => {
    //initialize db connection
    try {
        await mongoose.connect(process.env.mongoURI, {
        });
            console.log('Mongo database is connected');
    // handle and catch error
    } catch(error) {
        console.error('mongoDB connection error:', error);
        process.exit(1); //exit process with a failure
    }
}

module.exports = connectDB;