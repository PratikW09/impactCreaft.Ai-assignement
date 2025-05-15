import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  dependencies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  }],
  startDate: {
    type: Number,
    default: 0,
  },
  endDate: {
    type: Number,
    default: 0,
  }
},{ timestamps: true });

const Task = mongoose.model("Task", taskSchema);
export default  Task;
