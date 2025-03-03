import React, { useState } from 'react';
import './Day.css';

const Day = ({ date, dayOfWeek }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [notes, setNotes] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        {date} - {dayOfWeek}
      </button>
      {isOpen && (
        <div className="popup">
          <h3>{date}</h3>
          <ul className="task-list">
            {tasks.map((task, index) => (
              <li key={index}>
                <input type="checkbox" />
                {task}
              </li>
            ))}
          </ul>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={addTask} disabled={newTask.trim() === ''}>Por na lista</button>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{ width: '100%', resize: 'vertical' }}
          />
          <button onClick={() => setIsOpen(false)} className="close-button">Fechar</button>
        </div>
      )}
    </div>
  );
};

export default Day;