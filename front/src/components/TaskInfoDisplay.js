import React, { useState, useEffect } from 'react';

const TaskInfoDisplay = ({ userId }) => {
    const [taskLogs, setTaskLogs] = useState([]);

    useEffect(() => {
        const fetchTaskLogs = async () => {
            try {
                const response = await fetch(`/api/users/${userId}/tasklogs`);
                if (!response.ok) {
                    throw new Error('Failed to fetch task logs');
                }
                const data = await response.json();
                setTaskLogs(data);
            } catch (error) {
                console.error('Error fetching task logs:', error.message);
            }
        };

        fetchTaskLogs();
    }, [userId]);

    return (
        <div className="fixed bottom-0 right-0 max-h-40 overflow-y-auto p-3 rounded-lg shadow-lg w-72 mb-4 mr-3 bg-[#c0b8ba] ">
            <div className="snap-start">
            <h2 className="text-lg font-semibold mb-2 text-[#2E151B]">Task Logs</h2>
                {taskLogs.length > 0 ? (
                    taskLogs.map((log) => (
                        <div key={log._id} className="mt-2">
                            <p className='text-white font-semibold'>Action</p>
                            <p className='text-white'>{log.action}</p>
                            <p className='text-white font-semibold'>Task Title</p>
                            <p className='text-white'>{log.task.title}</p>
                            <p className='text-white font-semibold'>Task Description</p>
                            <p className='text-white'>{log.task.description}</p>
                        </div>
                    ))
                ) : (
                    <p></p>
                )}
            </div>
        </div>
    );
};

export default TaskInfoDisplay;