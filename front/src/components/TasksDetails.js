import { useTasksContext } from "../hooks/useTasksContext"

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import {format} from 'date-fns-tz'
// <p className="">Due_date: {formatDistanceToNow(new Date(task.due_date), { addSuffix: true })}</p>

const TasksDetails = ({ task }) => {
    const { dispatch } = useTasksContext()


    const handleClick = async () => {
        const response = await fetch('/tasks/' + task._id, {
            method: 'DELETE'
        })

        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_TASK', payload: json })
        }

    }

    return (
        <div className="task-details">
            <h4>{task.title}</h4>
            <p className="">Description: {task.description}</p>
            <p className="">Status: {task.status}</p>
            <p>Due_date: {formatDistanceToNow(new Date(task.due_date), { addSuffix: true })}</p>
            <div className="task-delete flex justify-end">
                <button className="material-symbols-outlined" onClick={handleClick}>delete</button>
            </div>
        </div>
    )
}

export default TasksDetails