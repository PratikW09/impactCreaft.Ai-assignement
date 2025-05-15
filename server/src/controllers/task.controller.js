import { sendError, sendSuccess } from "../utils/responseHandler.js";
import Task from "../models/task.model.js";

/**
 * Controller to create a new task.
 * @route POST /api/tasks
 * @access Public
 */
export const createTask = async (req, res) => {
  try {
    const { name, duration, dependencies } = req.body;

    // Validate required fields
    if (!name || !duration) {
      return sendError(res, 400, "Name and duration are required.");
    }

    let startDate = 0;
    let maxEndDate = 0;

    // If dependencies are provided, calculate the startDate based on their endDates
    if (dependencies && dependencies.length > 0) {
      // Loop through each dependency ID
      for (const dependencyId of dependencies) {
        // Find the dependent task
        const dependentTask = await Task.findById(dependencyId);
        
        // Check if dependency exists
        if (!dependentTask) {
          return sendError(res, 400, `Dependency with ID ${dependencyId} not found.`);
        }
        
        // Update maxEndDate if this dependency has a later end date
        if (dependentTask.endDate > maxEndDate) {
          maxEndDate = dependentTask.endDate;
        }
      }
      
      // Set the start date to the maximum end date found
      startDate = maxEndDate;
    }

    // Calculate the endDate
    const endDate = startDate + duration;

    // Create a new task
    const task = await Task.create({
      name,
      duration,
      dependencies,
      startDate,
      endDate,
    });

    // Send success response
    sendSuccess(res, 201, "Task created successfully.", task);
  } catch (error) {
    console.error("Error creating task:", error.message);
    sendError(res, 500, "Internal Server Error");
  }
};


/**
 * Controller to retrieve all tasks.
 * @route GET /api/tasks
 * @access Public
 */
/**
 * Controller to retrieve all tasks.
 * @route GET /api/tasks
 * @access Public
 */
export const getAllTasks = async (req, res) => {
  try {
    // Fetch all tasks from the database
    const tasks = await Task.find()
      .sort({ startDate: 1 }); // Sort by startDate in ascending order
    
    // Calculate project duration (maximum end date among all tasks)
    let projectDuration = 0;
    if (tasks.length > 0) {
      projectDuration = Math.max(...tasks.map(task => task.endDate));
    }

    // Send success response with both tasks and project duration
    sendSuccess(res, 200, "Tasks retrieved successfully", {
      tasks,
      projectDuration,
      taskCount: tasks.length
    });
  } catch (error) {
    console.error("Error retrieving tasks:", error.message);
    sendError(res, 500, "Internal Server Error");
  }
};

/**
 * Controller to calculate the total project duration.
 * @route GET /api/tasks/duration
 * @access Public
 */
export const calculateProjectDuration = async (req, res) => {
  try {
    // Fetch all tasks from the database
    const tasks = await Task.find();
    
    if (tasks.length === 0) {
      return sendSuccess(res, 200, "Project has no tasks", { duration: 0 });
    }
    
    // Find the maximum end date among all tasks
    // This represents when the entire project is complete
    const maxEndDate = Math.max(...tasks.map(task => task.endDate));
    
    // Get some additional statistics
    const taskCount = tasks.length;
    const criticalTasks = tasks.filter(task => task.endDate === maxEndDate);
    
    // Send success response
    sendSuccess(res, 200, "Project duration calculated successfully", { 
      duration: maxEndDate,
      taskCount,
      criticalTasks: criticalTasks.map(task => task.name)
    });
  } catch (error) {
    console.error("Error calculating project duration:", error.message);
    sendError(res, 500, "Internal Server Error");
  }
};

/**
 * Controller to delete all tasks from the database.
 * @route DELETE /api/tasks
 * @access Public
 */
export const deleteAllTasks = async (req, res) => {
  try {
    // Delete all tasks
    const result = await Task.deleteMany({});
    
    // Send success response with deletion count
    sendSuccess(res, 200, "All tasks deleted successfully", {
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error("Error deleting tasks:", error.message);
    sendError(res, 500, "Internal Server Error");
  }
};