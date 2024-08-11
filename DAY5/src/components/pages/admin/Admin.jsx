import React, { useState } from 'react';
import { Trash, Plus } from 'lucide-react';
import '../../../assets/css/admin.css';

const Admin = () => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [projectList, setProjectList] = useState([
    { title: 'Banking Project', description: 'An online banking system that allows users to manage their bank accounts, perform transactions, view transaction history, and apply for loans.' },
    { title: 'Task Management Website', description: 'A task management website where users can create, assign, and track tasks. It includes features like task prioritization, deadlines, and notifications.' },
    { title: 'E-commerce Platform', description: 'An e-commerce platform project aims to build an online shopping website where users can browse products, add items to their cart, and make purchases.' },
    { title: 'Inventory Management System', description: 'This project focuses on developing an inventory management system for businesses to track their stock levels, manage orders, and optimize inventory.' }
  ]);
  const [newProject, setNewProject] = useState({ title: '', description: '' });

  const handleDeleteClick = (project) => {
    setCurrentProject(project);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setProjectList(projectList.filter(project => project !== currentProject));
    setShowDeleteConfirm(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const handleAddClick = () => {
    setShowAddPopup(true);
  };

  const handleAddProject = () => {
    setProjectList([...projectList, newProject]);
    setShowAddPopup(false);
    setNewProject({ title: '', description: '' });
  };

  const cancelAdd = () => {
    setShowAddPopup(false);
    setNewProject({ title: '', description: '' });
  };

  return (
    <>
      <div className='projects-container'>
        <h1 className='projects-title'>Projects Assigned</h1>
        <div className='projects-list'>
          {projectList.map((project, index) => (
            <div key={index} className='project-item'>
              <div className='project-info'>
                <h2 className='project-title'>{project.title}</h2>
                <p className='project-description'>{project.description}</p>
              </div>
              <button className='delete-button' onClick={() => handleDeleteClick(project)}>
                <Trash size={20} />
              </button>
            </div>
          ))}
        </div>
        <button className='add-button' onClick={handleAddClick}>
          <Plus size={20} /> Add Project
        </button>
      </div>

      {showDeleteConfirm && (
        <div className='overlay'>
          <div className='confirm-popup'>
            <p>Are you sure you want to delete this project?</p>
            <button className='confirm-button' onClick={confirmDelete}>Yes</button>
            <button className='cancel-button' onClick={cancelDelete}>No</button>
          </div>
        </div>
      )}

      {showAddPopup && (
        <div className='overlay'>
          <div className='add-popup'>
            <h2>Add New Project</h2>
            <input
              type='text'
              placeholder='Project Title'
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            />
            <textarea
              placeholder='Project Description'
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            />
            <button className='confirm-button' onClick={handleAddProject}>Add</button>
            <button className='cancel-button' onClick={cancelAdd}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Admin;
