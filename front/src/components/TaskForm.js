import { useState } from "react"
import { useTasksContext } from '../hooks/useTasksContext'

const TaskForm = () => {
    const { dispatch } = useTasksContext()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [due_date, setDue_date] = useState('')
    const [status, setStatus] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])


    const handleSubmit = async (e) => {
        e.preventDefault()

        const task = { title, description, due_date, status }

        const response = await fetch('/tasks', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: { 'Content-Type': 'application/json' }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setTitle('')
            setDescription('')
            setDue_date('')
            setStatus('')
            setEmptyFields([])

            setError(null)
            console.log('new task added', json)

            dispatch({ type: 'CREATE_TASK', payload: json })
        }
    }

    return (
        <form className="create grid grid-cols-1" onSubmit={handleSubmit}>

            <h3 className="text-center">Add a new task</h3>
            <label className="ml-2">Title </label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="{emptyFields.includes('title') ? 'error' : ''} block m-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

            />

            <label className="ml-2">Description: </label>
            <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="{emptyFields.includes('description') ? 'error' : ''} block m-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

            />

            <label className="ml-2">Due date: </label>
            <input
                type="date"
                onChange={(e) => setDue_date(e.target.value)}
                value={due_date}
                className="{emptyFields.includes('due_date') ? 'error' : ''} block m-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

            />

            <label className="ml-2">Status: </label>
            <select
                //type="text"
                onChange={(e) => setStatus(e.target.value)}
                value={status}
                className="{emptyFields.includes('status') ? 'error' : ''} block m-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

            >
            <option value=""> Select Status</option>
            <option value="Pending"> Pending</option>
            <option value="Urgent"> Urgent </option>
            </select>

            <div className="flex justify-center">
                <button className="bg-[#2E151B] mt-4 text-white text-sm w-[25%] rounded-full text-center content-center">Add Task</button>
            </div>
            {error && <div className="error">{error}</div>}
        </form>



    )
}

export default TaskForm