import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUserTasks, getUserIdFromEmail, patchUserTask } from '../../services/api';

const Progress = () => {
  const [tasks, setTasks] = useState([]);
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = jwtDecode(token);
          const currentUserEmail = decodedToken.sub;
          setEmail(currentUserEmail);

          const userIdResponse = await getUserIdFromEmail(currentUserEmail);
          setUserId(userIdResponse);

          const tasksResponse = await getUserTasks(userIdResponse);

          // Filter tasks to show only 'In Progress' tasks
          const inProgressTasks = tasksResponse.filter(task => task.taskstatus === 'In Progress');
          setTasks(inProgressTasks);
        }
      } catch (error) {
        console.error("Error fetching data:", error.response?.data || error.message || error);
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await patchUserTask(taskId, { taskstatus: newStatus });

      const updatedTasks = tasks.filter(task => task.taskid !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating task status:", error.response?.data || error.message || error);
    }
  };

  return (
    <div className='h-full w-full flex justify-center items-center bg-black p-7'>
      <div className='w-[90%] max-w-7xl bg-black text-white shadow-lg rounded-lg border border-gray-500'>
        <Table>
          <TableCaption className="bg-muted text-muted-foreground">In Progress</TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-700">
              <TableHead className="w-[120px] text-white">Task ID</TableHead>
              <TableHead className="text-white">Task Name</TableHead>
              <TableHead className="text-white">Task Description</TableHead>
              <TableHead className="text-white">Priority</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white">Project Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.taskid} className="bg-black hover:bg-gray-800 hover:text-white">
                <TableCell className="font-medium text-white">{task.taskid}</TableCell>
                <TableCell className="text-white">{task.taskname}</TableCell>
                <TableCell className="text-white">{task.taskdescription}</TableCell>
                <TableCell className="text-white">{task.taskpriority}</TableCell>
                <TableCell className="text-white">
                  <select
                    value={task.taskstatus}
                    onChange={(e) => handleStatusChange(task.taskid, e.target.value)}
                    className='px-3 py-2 bg-gray-900 border border-gray-500 rounded-md text-white shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 sm:text-sm'
                  >
                    <option value='Not Started'>Not Started</option>
                    <option value='In Progress'>In Progress</option>
                    <option value='Completed'>Completed</option>
                  </select>
                </TableCell>
                <TableCell className="text-white">{task.project?.projectname || 'Unknown'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Progress;
