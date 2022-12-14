import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import lectureRouter from "./routes/lecture_router";
import assignmentsRouter from "./routes/assignments_router";

const app = express();

app.use(cors());
app.use(express.json())

const PORT = process.env.PORT  || 5000;

app.get("/", (req, res, next) => {
  res.status(200).json("backend is live for lms! Happy coding");
});


app.use("/api/lecture",lectureRouter)
app.use("/api/assignments",assignmentsRouter)

mongoose
  .connect(
    "mongodb+srv://admin:lPZRtSAvDkHZZjUL@cluster0.xmqkgks.mongodb.net/lms?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listing to the port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
