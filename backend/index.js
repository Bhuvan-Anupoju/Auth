import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import userRouter from "./routes/user.route.js";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/users", userRouter);

app.listen(3000, () => {
  console.log("server running on port 3000");
});
