import express from 'express';
import { createAssignment, deleteAssignment, distincAssignment, getAllAssignment, getAssignmentById, updateAssignment } from '../controller/assignment_controller';

const assignmentsRouter = express.Router();
assignmentsRouter.get("/distinc", distincAssignment)

assignmentsRouter.post('/',createAssignment)
assignmentsRouter.get("/",getAllAssignment)
assignmentsRouter.get("/:id",getAssignmentById)
assignmentsRouter.put("/:id",updateAssignment);
assignmentsRouter.delete("/:id", deleteAssignment)

export default assignmentsRouter;
