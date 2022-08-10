import express from "express";
import { createLecture, deleteLecture, distincLecture, getAllLecture, getLectureById, updateLecture } from "../controller/lecture_controller";

const lectureRouter = express.Router();


lectureRouter.get("/distinc", distincLecture)
lectureRouter.post('/',createLecture)
lectureRouter.get("/",getAllLecture)
lectureRouter.get("/:id",getLectureById)
lectureRouter.put("/:id",updateLecture);
lectureRouter.delete("/:id", deleteLecture)


export default lectureRouter;