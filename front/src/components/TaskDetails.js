
const TaskDetails = ({ task, setDeletedTask, userId}) => {

    const handleDelete = async () => {
        const response = await fetch(`/api/users/${userId}/tasks/${task._id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            setDeletedTask(task._id)
        }
    }

    return (

        <div className="task-details">

            <div>
                <h4>{task.title}</h4>
                <p>{task.description}</p>


                <div className="task-delete material-symbols-outlined flex justify-end">
                    <button onClick={handleDelete}>Check</button>
                </div>

            </div>
        </div>

    );
};

export default TaskDetails;
