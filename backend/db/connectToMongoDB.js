// import mongoose from "mongoose";

// const connectToMongoDB = async () => {
//     const uri = process.env.MONGO_DB_URI; // Changed to use environment variable
//     //console.log("Attempting to connect to MongoDB at URI:", uri);

//     try {
//         await mongoose.connect(uri, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//         console.log("Successfully connected to MongoDB");
//     } catch (error) {
//         console.log("Error connecting to MongoDB:", error.message);
//     }
// }

// export default connectToMongoDB;

import mongoose from "mongoose";

const connectToMongoDB = async () => {
    const uri = process.env.MONGO_DB_URI; // Use environment variable for MongoDB URI
    //console.log("Attempting to connect to MongoDB at URI:", uri);

    try {
        await mongoose.connect(uri); // Connect without deprecated options
        console.log("Successfully connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error.message);
    }
}

export default connectToMongoDB;

