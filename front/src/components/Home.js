import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskDetails from './TaskDetails';
import TaskInfoDisplay from './TaskInfoDisplay';
import logo from '../assets/fritz.png';

const Home = ({ userId, username }) => {
    const [tasks, setTasks] = useState([]);
    const [deletedTask, setDeletedTask] = useState([]);
    const [showTaskLogs, setShowTaskLogs] = useState(false);


    useEffect(() => {

        const fetchTasks = async () => {
            try {
                const response = await fetch(`/api/users/${userId}/tasks`);
                if (!response.ok) {
                    throw new Error('Failed to fetch tasks');
                }
                const data = await response.json();
                console.log(data)
                setTasks(data);
            } catch (error) {
                console.error('Error fetching tasks:', error.message);
            }
        };

        fetchTasks();
    });

    return (
        <div className="home h-screen grid grid-cols-12">

            <div className='tasks col-span-9 bg-[#ECECEC]'>

                <div className='flex'>
                    <img src={logo} alt="Logo" className=' h-14 w-34 mt-4 ml-4' />
                    <h1 className='text-3xl tracking-wide welcome-text ml-3 mt-6 text-[#422c31]'>Welcome</h1>
                    <h1 className='text-2xl tracking-wide ml-3 mt-7'>{username}</h1>

                </div>

                <div className='grid grid-cols-6'>
                    {tasks && tasks.map((task) => (
                        <div className='card-container bg-white m-4 p-4 rounded-lg shadow-lg col-span-3'>
                            <TaskDetails userId={userId} key={task._id} task={task} setDeletedTask={setDeletedTask} />
                        </div>
                    ))}
                </div>

                <div className='relative mb-3'>
                    <button className="bg-[#2E151B] text-white text-sm rounded-full px-4 py-2 absolute top-0 right-0 mt-4 mr-4 mb-3" onClick={() => setShowTaskLogs(!showTaskLogs)}>
                        {showTaskLogs ? "Hide task logs" : "View task logs"}
                    </button>
                    {showTaskLogs && <TaskInfoDisplay userId={userId} />}
                </div>

            </div>

            <div className='col-span-3 bg-[#ECECEC] '>
                <div>
                    <div className='mt-20'>
                        <TaskForm userId={userId} setTasks={setTasks} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

