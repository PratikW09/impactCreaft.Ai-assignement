// filepath: d:\Pratik Walale\Project\impact.ai task\client\src\components\TaskCreation.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskCreation = ({ onBack }) => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState(1);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDependencies, setSelectedDependencies] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Fetch existing tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5050/api/tasks');
        if (response.data?.data?.tasks) {
          setTasks(response.data.data.tasks);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError('Failed to load existing tasks');
        setLoading(false);
      }
    };

    fetchTasks();
  }, [success]);

  // Handle task creation
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || duration <= 0) {
      setError('Please provide a valid task name and duration');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5050/api/tasks', {
        name,
        duration: parseInt(duration),
        dependencies: selectedDependencies
      });
      
      setSuccess(true);
      setName('');
      setDuration(1);
      setSelectedDependencies([]);
      setError(null);
      setLoading(false);
      
      // Show success message and reset after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      
    } catch (err) {
      console.error('Error creating task:', err);
      setError(err.response?.data?.message || 'Failed to create task');
      setLoading(false);
    }
  };

  // Toggle task selection for dependencies
  const toggleTaskDependency = (taskId) => {
    if (selectedDependencies.includes(taskId)) {
      setSelectedDependencies(selectedDependencies.filter(id => id !== taskId));
    } else {
      setSelectedDependencies([...selectedDependencies, taskId]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Home
        </button>
        
        <h1 className="text-3xl font-bold text-indigo-800 mb-8 text-center">Create New Task</h1>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Task Creation Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Task Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter task name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                  Duration (days)
                </label>
                <input
                  type="number"
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  min="1"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
            
            {success && (
              <div className="mt-4 bg-green-50 border-l-4 border-green-400 p-4">
                <p className="text-sm text-green-700">Task created successfully!</p>
              </div>
            )}
            
            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Creating...' : 'Create Task'}
              </button>
            </div>
          </form>
          
          {/* Existing Tasks Section */}
          <div className="bg-gray-50 p-6 border-t">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Select Dependencies (Optional)
            </h2>
            
            {loading ? (
              <div className="py-4 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : tasks.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No tasks available yet</p>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {tasks.map((task) => (
                  <div 
                    key={task._id}
                    onClick={() => toggleTaskDependency(task._id)}
                    className={`p-3 rounded-md border cursor-pointer transition-colors ${
                      selectedDependencies.includes(task._id) 
                        ? 'bg-indigo-100 border-indigo-300' 
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedDependencies.includes(task._id)}
                        onChange={() => {}} // Handled by the parent div's onClick
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-800">{task.name}</p>
                        <p className="text-xs text-gray-500">Duration: {task.duration} days</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCreation;