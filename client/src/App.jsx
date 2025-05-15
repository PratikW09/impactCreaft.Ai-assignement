import React, { useState } from 'react';
import './App.css';
import LandingPage from './pages/LandingPage';
import ProjectDuration from './components/ProjectDuration';
import GanttChart from './components/GanntChart';
import TaskCreation from './components/TaskCreation';

function App() {
  const [activePage, setActivePage] = useState('landing');
  
  const handleShowDuration = () => {
    setActivePage('duration');
  };
  
  const handleShowChart = () => {
    setActivePage('chart');
  };
  
  const handleCreateTask = () => {
    setActivePage('createTask');
  };
  
  const handleBack = () => {
    setActivePage('landing');
  };
  
  // Render the appropriate component based on activePage state
  const renderContent = () => {
    switch (activePage) {
      case 'duration':
        return <ProjectDuration onBack={handleBack} />;
      case 'chart':
        return <GanttChart onBack={handleBack} />;
      case 'createTask':
        return <TaskCreation onBack={handleBack} />;
      default:
        return <LandingPage 
          onShowDuration={handleShowDuration} 
          onShowChart={handleShowChart}
          onCreateTask={handleCreateTask}
        />;
    }
  };
  
  return (
    <>
      {renderContent()}
    </>
  );
}

export default App;