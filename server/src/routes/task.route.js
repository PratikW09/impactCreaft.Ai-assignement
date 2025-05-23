import express from "express";
import { calculateProjectDuration, createTask,deleteAllTasks,getAllTasks} from "../controllers/task.controller.js";

const router = express.Router();

// Route to create a task
router.post("/tasks", createTask);
// Route to get all tasks
router.get("/tasks", getAllTasks);
// Route to delete all tasks
router.delete('/delete-all-tasks',deleteAllTasks)
// Route to calculate the total project duration
router.get("/tasks-total-days", calculateProjectDuration);

export default router;