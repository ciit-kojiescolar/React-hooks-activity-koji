import React from 'react';
import TaskManager from './TaskManager';
import { TaskProvider } from './TaskContext';

function App() {
  return (
    <div className="App">
    <TaskProvider>
      <TaskManager />
    </TaskProvider>
    </div>
  );
}

export default App;
