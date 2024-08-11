import React, { useState, useEffect } from 'react';
import { Trash, Plus } from 'lucide-react';
import axios from 'axios';
import { authService } from '@/components/services/auth';

const Projects = () => {
    const [projectList, setProjectList] = useState([]);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);
    const [newProject, setNewProject] = useState({
        name: '',
        description: '',
        dueDate: ''
    });

    const email = authService.getUserEmail(); // Use authService to get the user's email

    useEffect(() => {
        axios.get('/projects/findAll')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setProjectList(response.data);
                } else {
                    console.error('Unexpected response format:', response.data);
                    setProjectList([]);
                }
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
                setProjectList([]);
            });
    }, []);

    const fetchManagerId = async (email) => {
        try {
            const response = await axios.get(`/users/findByEmail?email=${email}`);
            return response.data.userId; // Assuming the backend returns { userId: <id> }
        } catch (error) {
            console.error('Error fetching manager ID:', error);
            return null;
        }
    };

    const handleDeleteClick = (project) => {
        setCurrentProject(project);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        axios.delete(`/projects/delete/${currentProject.projectId}`)
            .then(() => {
                setProjectList(projectList.filter(project => project !== currentProject));
                setShowDeleteConfirm(false);
            })
            .catch(error => console.error('Error deleting project:', error));
    };

    const cancelDelete = () => {
        setShowDeleteConfirm(false);
    };

    const handleAddClick = () => {
        setShowAddPopup(true);
    };

    const handleAddProject = async () => {
        const managerId = await fetchManagerId(email); // Fetch manager_id
        
        if (managerId) {
            axios.post('/projects/add', { ...newProject, managerId }) // Include manager_id in the request body
                .then(response => {
                    setProjectList([...projectList, response.data]);
                    setShowAddPopup(false);
                    setNewProject({ name: '', description: '', dueDate: '' });
                })
                .catch(error => console.error('Error adding project:', error));
        } else {
            console.error('Failed to fetch manager ID');
        }
    };

    const cancelAdd = () => {
        setShowAddPopup(false);
        setNewProject({ name: '', description: '', dueDate: '' });
    };

    return (
        <>
            <div className="bg-black text-white p-5 rounded-none w-full h-full mx-auto relative">
                <h1 className="text-start text-4xl font-bold mb-5 text-green-500">Projects Assigned</h1>
                {projectList.length > 0 ? (
                    <table className="table-auto w-full mb-5">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Project ID</th>
                                <th className="px-4 py-2">Project Name</th>
                                <th className="px-4 py-2">Description</th>
                                <th className="px-4 py-2">Due Date</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projectList.map((project, index) => (
                                <tr key={index} className="border-b border-gray-700">
                                    <td className="px-4 py-2">{project.projectId}</td>
                                    <td className="px-4 py-2">{project.name}</td>
                                    <td className="px-4 py-2">{project.description}</td>
                                    <td className="px-4 py-2">{project.dueDate}</td>
                                    <td className="px-4 py-2">
                                        <button className="text-white" onClick={() => handleDeleteClick(project)}>
                                            <Trash size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No projects available.</p>
                )}
                <button className="flex items-center bg-green-600 text-white px-4 py-2 cursor-pointer text-lg rounded-md ml-7 hover:bg-green-700" onClick={handleAddClick}>
                    <Plus size={20} /> Add Project
                </button>
            </div>

            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white text-black p-5 rounded-lg shadow-lg w-72 text-center">
                        <p className="mb-5">Are you sure you want to delete this project?</p>
                        <button className="bg-green-600 text-white px-4 py-2 mr-2 cursor-pointer rounded-md hover:bg-green-700" onClick={confirmDelete}>Yes</button>
                        <button className="bg-red-600 text-white px-4 py-2 cursor-pointer rounded-md hover:bg-red-700" onClick={cancelDelete}>No</button>
                    </div>
                </div>
            )}

            {showAddPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white text-black p-5 rounded-lg shadow-lg w-72">
                        <h2 className="text-xl mb-5">Add New Project</h2>
                        <input
                            type="text"
                            placeholder="Project Name"
                            className="w-full p-2 mb-2 rounded-md border border-gray-300"
                            value={newProject.name}
                            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                        />
                        <textarea
                            placeholder="Project Description"
                            className="w-full p-2 mb-2 rounded-md border border-gray-300"
                            value={newProject.description}
                            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                        />
                        <input
                            type="date"
                            className="w-full p-2 mb-2 rounded-md border border-gray-300"
                            value={newProject.dueDate}
                            onChange={(e) => setNewProject({ ...newProject, dueDate: e.target.value })}
                        />
                        <button className="bg-green-600 text-white px-4 py-2 w-full cursor-pointer rounded-md hover:bg-green-700" onClick={handleAddProject}>Add Project</button>
                        <button className="bg-red-600 text-white px-4 py-2 w-full mt-2 cursor-pointer rounded-md hover:bg-red-700" onClick={cancelAdd}>Cancel</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Projects;
