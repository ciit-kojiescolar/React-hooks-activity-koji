import React, { useState, useContext, useEffect, useMemo, useCallback, useRef } from 'react';
import { TaskContext } from './TaskContext';
import './TaskManager.css'; // Ensure you have your CSS file properly linked

const TaskManager = () => {
  const { state, dispatch } = useContext(TaskContext);
  const [taskText, setTaskText] = useState('');
  const [filter, setFilter] = useState('all');
  const inputRef = useRef(null);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      dispatch({ type: 'SET_TASKS', payload: JSON.parse(savedTasks) });
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  }, [state.tasks]);

  const addTask = useCallback(() => {
    if (taskText.trim()) {
      const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
      };
      dispatch({ type: 'ADD_TASK', payload: newTask });
      setTaskText('');
      inputRef.current.focus();
    }
  }, [taskText, dispatch]);

  const toggleTaskCompletion = useCallback((task) => {
    dispatch({
      type: 'UPDATE_TASK',
      payload: { ...task, completed: !task.completed },
    });
  }, [dispatch]);

  const deleteTask = useCallback((taskId) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId }); 
  }, [dispatch]);

  const markTaskDone = useCallback((taskId) => {
    const task = state.tasks.find(task => task.id === taskId);
    if (task) {
      dispatch({
        type: 'UPDATE_TASK',
        payload: { ...task, completed: !task.completed },
      });
    }
  }, [dispatch, state.tasks]);

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'completed':
        return state.tasks.filter(task => task.completed);
      case 'incomplete':
        return state.tasks.filter(task => !task.completed);
      default:
        return state.tasks;
    }
  }, [state.tasks, filter]);

  return (
    <div className="task-manager">
      <h1>Task Manager</h1>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Enter a new task"
        ref={inputRef}
      />
      <button onClick={addTask}>Add Task</button>
      <div className="filter-buttons">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('incomplete')}>Incomplete</button>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <span
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
              onClick={() => toggleTaskCompletion(task)}
            >
              {task.text}
            </span>
            <button onClick={() => markTaskDone(task.id)}>Done</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
