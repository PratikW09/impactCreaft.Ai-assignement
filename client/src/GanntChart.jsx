import React, { useState, useEffect } from "react";
import axios from "axios";

const GanttChart = () => {
  const [tasks, setTasks] = useState([]);
  const [totalDays, setTotalDays] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        // You may need to adjust the URL based on your backend configuration
        const response = await axios.get("http://localhost:5050/api/tasks");
        
        console.log("Response from backend:", response.data);
        if (response.data && response.data.data) {
          // Make sure to set tasks correctly - handle both array and object structures
          if (Array.isArray(response.data.data)) {
            setTasks(response.data.data);
          } else if (response.data.data.tasks) {
            setTasks(response.data.data.tasks);
          } else {
            setTasks([]);
          }
          
          // Set total days based on project duration from backend
          setTotalDays(response.data.data.projectDuration || 0);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Failed to load tasks. Please try again later.");
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        <p>{error}</p>
        <button 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  // Add 1 to totalDays for better display
  const displayDays = totalDays > 0 ? totalDays + 1 : 12;

  return (
    <div className="p-8 bg-gradient-to-br from-gray-100 to-white min-h-screen font-sans">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📊 Project Gantt Chart</h1>

      {tasks.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-xl shadow-lg">
          <p className="text-gray-500">No tasks available. Create some tasks to see them on the chart.</p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-lg bg-white">
          {/* Timeline Header */}
          <div className="flex text-xs font-medium text-gray-500 border-b bg-gray-50 rounded-t-xl">
            <div className="w-48 py-3 px-4 border-r border-gray-200">Task Name</div>
            {[...Array(displayDays)].map((_, i) => (
              <div
                key={i}
                className="w-12 py-3 text-center border-r border-gray-200"
              >
                Day {i}
              </div>
            ))}
          </div>

          {/* Task Rows */}
          {tasks.map((task, i) => {
            // Assign different colors to different tasks
            const taskColors = [
              "bg-blue-500", 
              "bg-green-500", 
              "bg-purple-500", 
              "bg-amber-500", 
              "bg-rose-500",
              "bg-cyan-500", 
              "bg-emerald-500", 
              "bg-indigo-500", 
              "bg-orange-500"
            ];
            const taskColor = taskColors[i % taskColors.length]; // Cycle through colors
            
            // Handle both startDate and start for compatibility
            const taskStart = task.startDate !== undefined ? task.startDate : task.start;
            
            return (
              <div key={i} className="flex text-sm border-b last:border-none">
                <div className="w-48 py-3 px-4 border-r border-gray-100 bg-gray-50 font-semibold text-gray-700">
                  {task.name}
                </div>
                {[...Array(displayDays)].map((_, day) => {
                  const isTaskBar = day >= taskStart && day < taskStart + task.duration;
                  return (
                    <div
                      key={day}
                      className={`w-12 h-10 border-r border-gray-100 relative ${
                        isTaskBar ? taskColor : ""
                      }`}
                    >
                      {isTaskBar && day === taskStart && (
                        <div className={`absolute inset-0 ${taskColor} rounded-md shadow-sm flex items-center justify-center text-xs text-white font-medium`}>
                          {task.duration}d
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GanttChart;