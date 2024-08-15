import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash } from 'lucide-react';
import { getTasks, getTaskById, addTask, patchTask, deleteTask, getUsers, getProjects } from '../../services/api';

const TasksAssign = () => {
  const [tasks, setTasks] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    taskid: "",
    taskname: "",
    taskdescription: "",
    taskpriority: "Low",
    taskstatus: "Pending",
    assignedto: "",
    projectid: ""
  });
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const taskData = {
      taskname: formData.taskname,
      taskdescription: formData.taskdescription,
      taskpriority: formData.taskpriority,
      taskstatus: formData.taskstatus,
      assignedto: parseInt(formData.assignedto),
      projectid: parseInt(formData.projectid)
    };

    try {
      if (formData.taskid) {
        await patchTask(formData.taskid, taskData);
      } else {
        await addTask(taskData);
      }
      const tasksData = await getTasks();
      setTasks(tasksData.data);
      setFormVisible(false);
      setFormData({
        taskid: "",
        taskname: "",
        taskdescription: "",
        taskpriority: "Low",
        taskstatus: "Pending",
        assignedto: "",
        projectid: ""
      });
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error.message || error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      const tasksData = await getTasks();
      setTasks(tasksData.data);
    } catch (error) {
      console.error("Error deleting task:", error.response?.data || error.message || error);
    }
  };

  const handleEdit = async (taskId) => {
    try {
      const taskData = await getTaskById(taskId);
      const task = taskData.data;

      setFormData({
        taskid: task.taskid,
        taskname: task.taskname,
        taskdescription: task.taskdescription,
        taskpriority: task.taskpriority,
        taskstatus: task.taskstatus,
        assignedto: task.assignedto,
        projectid: task.projectid
      });
      setFormVisible(true);
    } catch (error) {
      console.error("Error fetching task details:", error.response?.data || error.message || error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tasksData, usersData, projectsData] = await Promise.all([
          getTasks(),
          getUsers(),
          getProjects(),
        ]);
        setTasks(tasksData.data);
        setUsers(usersData.data);
        setProjects(projectsData.data);
      } catch (error) {
        console.error("Error fetching data:", error.response?.data || error.message || error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='h-full w-full flex justify-center items-center bg-black p-7'>
      <div className='w-[90%] max-w-7xl bg-black text-white shadow-lg rounded-lg border border-gray-500'>
        <Table>
          <TableCaption className="bg-muted text-muted-foreground">Ongoing Tasks</TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-700">
              <TableHead className="w-[120px] text-white">Task ID</TableHead>
              <TableHead className="text-white">Task Name</TableHead>
              <TableHead className="text-white">Task Description</TableHead>
              <TableHead className="text-white">Priority</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white">Assigned To</TableHead>
              <TableHead className="text-white">Project Name</TableHead>
              <TableHead className="text-white flex justify-center items-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.taskid} className="bg-black hover:bg-gray-800 hover:text-white">
                <TableCell className="font-medium text-white">{task.taskid}</TableCell>
                <TableCell className="text-white">{task.taskname}</TableCell>
                <TableCell className="text-white">{task.taskdescription}</TableCell>
                <TableCell className="text-white">{task.taskpriority}</TableCell>
                <TableCell className="text-white">{task.taskstatus}</TableCell>
                <TableCell className="text-white">{task.member.name}</TableCell>
                <TableCell className="text-white">{task.project.projectname}</TableCell>
                <TableCell className="text-white flex space-x-5 justify-center items-center">
                  <Button className="bg-green-500 text-white hover:bg-green-600" onClick={() => handleEdit(task.taskid)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button className="bg-red-500 text-white hover:bg-red-600" onClick={() => handleDelete(task.taskid)}>
                    <Trash className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="p-4 flex justify-center">
          <Button className="bg-green-500 text-white hover:bg-green-600" onClick={() => setFormVisible(true)}>
            <Plus className="w-4 h-4 mr-2" /> Add Task
          </Button>
        </div>

        {isFormVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className='bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full text-white'>
              <h2 className='text-xl font-bold mb-4'>Add/Edit Task</h2>
              <form onSubmit={handleFormSubmit}>
                <div className='mb-4'>
                  <label className='block text-sm font-medium' htmlFor='taskname'>Task Name</label>
                  <input
                    id='taskname'
                    name='taskname'
                    type='text'
                    className='mt-1 block w-full border-gray-300 rounded-md bg-gray-900 text-white'
                    value={formData.taskname}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-sm font-medium' htmlFor='taskdescription'>Task Description</label>
                  <textarea
                    id='taskdescription'
                    name='taskdescription'
                    className='mt-1 block w-full border-gray-300 rounded-md bg-gray-900 text-white'
                    value={formData.taskdescription}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-sm font-medium' htmlFor='taskpriority'>Priority</label>
                  <select
                    id='taskpriority'
                    name='taskpriority'
                    className='mt-1 block w-full border-gray-300 rounded-md bg-gray-900 text-white'
                    value={formData.taskpriority}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div className='mb-4'>
                  <label className='block text-sm font-medium' htmlFor='taskstatus'>Status</label>
                  <select
                    id='taskstatus'
                    name='taskstatus'
                    className='mt-1 block w-full border-gray-300 rounded-md bg-gray-900 text-white'
                    value={formData.taskstatus}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div className='mb-4'>
                  <label className='block text-sm font-medium' htmlFor='assignedto'>Assigned To</label>
                  <select
                    id='assignedto'
                    name='assignedto'
                    className='mt-1 block w-full border-gray-300 rounded-md bg-gray-900 text-white'
                    value={formData.assignedto}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="" disabled>Select User</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='mb-4'>
                  <label className='block text-sm font-medium' htmlFor='projectid'>Project</label>
                  <select
                    id='projectid'
                    name='projectid'
                    className='mt-1 block w-full border-gray-300 rounded-md bg-gray-900 text-white'
                    value={formData.projectid}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="" disabled>Select Project</option>
                    {projects.map((project) => (
                      <option key={project.projectid} value={project.projectid}>
                        {project.projectname}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end">
                  <Button className="bg-green-500 text-white hover:bg-green-600" type="submit">Save Task</Button>
                  <Button className="bg-red-500 text-white hover:bg-red-600 ml-4" onClick={() => setFormVisible(false)}>Cancel</Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksAssign;
