import React from "react";
import { useState } from "react";
// Create a new component for Project Duration
const ProjectDuration = () => {
  const [duration, setDuration] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProjectDuration = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5050/api/tasks-total-days');
      const data = await response.json();
      
      if (data && data.data) {
        setDuration(data.data);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching project duration:", err);
      setError("Failed to load project information");
      setLoading(false);
    }
  };

  // Fetch duration when component mounts
  React.useEffect(() => {
    fetchProjectDuration();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
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

  return (
    <div className="p-8 bg-gradient-to-br from-gray-100 to-white min-h-screen font-sans">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📋 Project Duration Summary</h1>
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        {duration ? (
          <div className="space-y-4">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">TOTAL PROJECT DURATION</p>
              <p className="text-5xl font-bold text-blue-700 mt-2">{duration.duration} days</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Total Tasks</p>
                <p className="text-2xl font-bold">{duration.taskCount}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Critical Path Tasks</p>
                <p className="text-xl font-semibold">{duration.criticalTasks?.length || 0}</p>
              </div>
            </div>
            
            {duration.criticalTasks && duration.criticalTasks.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Critical Tasks:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {duration.criticalTasks.map((task, index) => (
                    <li key={index} className="text-gray-600">{task}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500">No project data available</p>
        )}
        
        <div className="mt-8 text-center">
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
            onClick={() => window.location.href = "/"}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProjectDuration;