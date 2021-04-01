// connect to mongoose db
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // connecting to mongoose database through env file
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.log(err);

        // if there is a problem, stop the application
        process.exit(1);
    }
}

module.exports = connectDB;