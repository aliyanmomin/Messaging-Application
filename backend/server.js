import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
const PORT = process.env.PORT || 4000;

dotenv.config({ path: "./backend/.env" });

const corsOptions = {
    origin: 'http://localhost:5173', // Adjust this to match your frontend origin
    credentials: true, // This is important for cookies or auth headers
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
});


//video is at the UI design section 
//npm run server for the backend
//npm run dev for the frontend
//http://localhost:4000/