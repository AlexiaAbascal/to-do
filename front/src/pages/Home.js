import { useEffect } from "react"
import { useTasksContext } from '../hooks/useTasksContext'

// components
import TasksDetails from "../components/TasksDetails"
import TaskForm from "../components/TaskForm"
import SideBar from "../components/SideBar"

const Home = () => {
    const { tasks, dispatch } = useTasksContext()


    useEffect(() => {
        const fetch_tasks = async () => {
            const response = await fetch('/tasks')
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_TASKS', payload: json })
            }
        }

        fetch_tasks()

    }, [dispatch])

    return (
        <div className="home h-screen grid grid-cols-12 ">

            <div className="sideBar col-span-1  bg-white">
                <SideBar />
            </div>

            <div className="tasks col-span-8  bg-[#ECECEC]">
                <div className="grid grid-cols-9">

                {tasks && tasks.map((task) => (
                    <div className="card-container bg-white m-4 p-4 rounded-lg shadow-lg col-span-3 hover:bg-[#2E151B] hover:text-white">
                    <TasksDetails key={task._id} task={task} />
                    </div>
                ))}

                </div>
            </div>

            <div className="forms bg-red-300 col-span-3 bg-white shadow">
                <TaskForm />
            </div>
        </div>
    )
}

export default Home