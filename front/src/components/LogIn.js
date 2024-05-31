import React, { useState } from 'react';

const LogIn = ({ onLogin }) => {
    const [username, setUsername] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/users/username/${username}`);
            if (!response.ok) {
                throw new Error('User does not exist');
            }
            const data = await response.json(); 
            onLogin(data._id,`${username}`);
        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
        }
    };

    return (
        <div className="flex h-screen justify-center items-center">
            <form className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md" onSubmit={handleLogin}>
                <h3 className="text-xl font-semibold mb-4">Welcome to your task manager</h3>
                <label className="block mb-2">Username</label>
                <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button
                    type="submit"
                    className="mt-4 w-full bg-[#2E151B] text-white hover:bg-[#422c31] py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                >
                    Log In
                </button>
            </form>
        </div>
    );
};

export default LogIn;
