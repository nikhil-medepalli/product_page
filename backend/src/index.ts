import express from "express";
import cors from "cors"

import { ENV } from "./config/env";
import { clerkMiddleware } from "@clerk/express";

import userRouter from "./routes/userRouter";
import productRouter from "./routes/productRouter";
import commentRouter from "./routes/commentRouter";

const app = express();

app.use(cors({origin: ENV.FRONTEND_URL}))
app.use(clerkMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "Welcome",
    endpoints: {
      users: "/api/users",
      products: "/api/products",
      comments: "api/comments",
    },
  });
});

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/comments", commentRouter);

app.listen(ENV.PORT, () => {
  console.log(`Server is up and running on port:${ENV.PORT}`);
});
