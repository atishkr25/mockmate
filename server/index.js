import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDb from "./config/connectDb.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import interviewRouter from "./routes/interview.route.js";
import paymentRouter from "./routes/payment.route.js";

const app = express();
const port = Number(process.env.PORT || 5000);

app.use(cors({
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use("/public", express.static("public"));

app.get("/", (_req, res) => {
  res.json({ status: "ok", service: "MockMate API" });
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/interview", interviewRouter);
app.use("/api/payment", paymentRouter);

connectDb();

if (process.env.VERCEL !== "1") {
  app.listen(port, () => {
    console.log(`MockMate API running on port ${port}`);
  });
}

export default app;
