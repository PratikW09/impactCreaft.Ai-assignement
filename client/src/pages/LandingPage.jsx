import React from "react";

// Landing Page Component
const LandingPage = ({ onShowDuration, onShowChart, onCreateTask }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-800 mb-3">
          Impact.AI Task Manager
        </h1>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          Visualize your project timeline and dependencies with our interactive tools
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <button
          onClick={onShowDuration}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl shadow-lg transform transition-transform hover:-translate-y-1 text-lg font-medium flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Show Project Duration
        </button>
        
        <button
          onClick={onShowChart}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl shadow-lg transform transition-transform hover:-translate-y-1 text-lg font-medium flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Show Gantt Chart
        </button>
      </div>

      <button
        onClick={onCreateTask}
        className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl shadow-lg transform transition-transform hover:-translate-y-1 text-lg font-medium flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Create Task
      </button>
    </div>
  );
};

export default LandingPage;