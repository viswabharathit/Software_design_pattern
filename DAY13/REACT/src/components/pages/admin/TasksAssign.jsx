import React, { useState } from 'react';
import { Plus, Users } from 'lucide-react';
import '../../../assets/css/assigntasks.css';

const TaskAssign = () => {
  const initialTasks = [
    { title: 'Navbar Component', description: 'Create and style the navigation bar component.' },
    { title: 'Admin Page', description: 'Develop the admin dashboard page with necessary functionalities.' },
    { title: 'Landing Page', description: 'Design and implement the landing page with responsive features.' }
  ];

  const teamMembers = [
    { id: 1, username: 'viswa' },
    { id: 2, username: 'bharathi' }
  ];

  const [tasks, setTasks] = useState(initialTasks);
  const [showAssignPopup, setShowAssignPopup] = useState(false);

  const handleAssignClick = () => {
    setShowAssignPopup(true);
  };

  const handleNotifyClick = () => {
    // Implement notification functionality here
    setShowAssignPopup(false);
  };

  return (
    <div className='tasks-container h-full border-r-0'>
      <h1 className='tasks-title'>Tasks</h1>
      <div className='tasks-list'>
        {tasks.map((task, index) => (
          <div key={index} className='task-item'>
            <div className='task-info'>
              <h2 className='task-title'>{task.title}</h2>
              <p className='task-description'>{task.description}</p>
            </div>
            <button className='assign-button' onClick={handleAssignClick}>
              <Users size={20} /> Assign To
            </button>
          </div>
        ))}
      </div>

      {showAssignPopup && (
        <div className='overlay'>
          <div className='popup'>
            <h2>Team Members</h2>
            <ul className='team-members'>
              {teamMembers.map((member) => (
                <li key={member.id}>{member.username}</li>
              ))}
            </ul>
            <button className='confirm-button' onClick={handleNotifyClick}>Notify</button>
            <button className='cancel-button' onClick={() => setShowAssignPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskAssign;
