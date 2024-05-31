import { useState } from "react";

const TaskForm = ({userId}) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/users/${userId}/tasks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description })
            });
            if (!response.ok) {
                throw new Error('Failed to add task')
            }

            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Error adding task: ' + error.message)
        }
    }

    return (
        <form className="create grid grid-cols-1 mr-3 ml-3 mt-3 p-4 bg-[#c0b8ba] rounded-lg shadow-lg" onSubmit={handleSubmit}>
            <h3 className="text-center text-lg font-semibold mb-4 text-[#2E151B]">Add a new task</h3>
            <div className="mb-4">
                <label className="block mb-1 text-[#2E151B] font-semibold">Title</label>
                <input
                    className="w-full border rounded-md py-1 px-3"
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    placeholder="Enter title"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1 text-[#2E151B] font-semibold">Description</label>
                <input
                    className="w-full border rounded-md py-1 px-3"
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    placeholder="Enter description"
                />
            </div>
            <div className="flex justify-center">
                <button className="bg-[#2E151B] text-white text-sm py-2 px-6 rounded-full">
                    Add Task
                </button>
            </div>
        </form>
    );
};

export default TaskForm;
