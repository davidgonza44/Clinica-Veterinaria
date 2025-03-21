import mongoose from "mongoose";

const connectDB = async (uri) => {
    try {
        mongoose.set('debug', true);
        mongoose.set("strictQuery", true);
        await mongoose.connect(uri)
        console.log("Connected to the database successfully")
        console.log(`Connected to database: ${mongoose.connection.name}`);
    } catch (error) {
        console.log("Error connecting to the database:", error)
        process.exit(1)
    }
}

export default connectDB;