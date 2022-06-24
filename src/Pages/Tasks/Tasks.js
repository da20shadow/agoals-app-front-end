import {useState, useEffect} from "react";
import './tasks.css';
import axios from "axios";

function Tasks() {

    const [tasks, setTasks] = useState(undefined);
    const [notification, setNotification] = useState();

    useEffect(() => {
        getTasksList();
    }, [])

    const getTasksList = () => {
        const url = 'http://localhost:8090/AGoalsAppBackEnd/tasks/parent/9';
        axios.get(url)
            .then(res => {
                console.log(tasks)

                if (res.status !== 400) {
                    setTasks(res.data);
                } else {
                    setTasks(undefined);
                }
                console.log(tasks)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const createTask = (e) => {

        const url = 'http://localhost:8090/AGoalsAppBackEnd/tasks/create';

        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const {task_title, due_date} = Object.fromEntries(formData);
        const task = {
            task_title,
            task_description: "Empty..",
            due_date,
            parent_id: 9,
            user_id: 1
        }
        axios.post(url, task)
            .then(res => {
                let successNotification = (
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        {res.data['message']}
                        <button onClick={setNotification(undefined)}
                                type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"> </button>
                    </div>
                );
                setNotification(successNotification);
                setTimeout(() => {
                    setNotification(undefined);
                }, 2500);
                getTasksList();
            })
            .catch(err => {
                console.log(err)
            })
    }

    const deleteTask = (taskId) => {
        let url = 'http://localhost:8090/AGoalsAppBackEnd/tasks/delete/';

        console.log(url + taskId)
        axios.delete(url + taskId)
            .then(res => {
                console.log(res)
                if (res.status !== 400) {
                    let successDeleteNotification = (
                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                            {res.data['message']}
                            <button onClick={setNotification(undefined)}
                                    type="button" className="btn-close" data-bs-dismiss="alert"
                                    aria-label="Close"> </button>
                        </div>
                    );
                    setNotification(successDeleteNotification);

                    setTimeout(() => {
                        setNotification(undefined);
                    }, 2000);
                } else {
                    let unSuccessDeleteNotification = (
                        <div className="alert alert-warning alert-dismissible fade show" role="alert">
                            Can't Delete Not Existing Task!
                            <button onClick={setNotification(undefined)}
                                    type="button" className="btn-close" data-bs-dismiss="alert"
                                    aria-label="Close"> </button>
                        </div>
                    );
                    setNotification(unSuccessDeleteNotification);
                    setTasks(undefined);
                    setTimeout(() => {
                        setNotification(undefined);
                    }, 2000);
                }
                getTasksList();
            })
            .catch(err => {
                console.log(err)
            })
    }

    const markAsDone = (e) => {
        e.stopPropagation();
        if (e.currentTarget.tagName === "LI") {
            e.currentTarget.classList.toggle('checked');
        }
    }

    return (
        <div className="container">
            <div className={'task-body'}>

                {notification}
                <div className={'task-list-header'}>
                    <h1>Simple TO DO List</h1>
                    <form onSubmit={createTask}>
                        <input name={'task_title'} type="text" placeholder={'Task title...'}/>
                        <input name={'due_date'} className={'due-date'} type="date"/>
                        <input className={'addBtn'} type={'submit'} value={'Add'}/>
                    </form>
                </div>
                <ul>

                    {
                        tasks !== undefined
                            ?
                            tasks.map(x => (
                                    <div key={x['task_id']} className={'single-task'}>
                                        <li onClick={markAsDone}
                                            className={x['completed'] === 1 ? 'checked' : ''}>
                                            {x['title']}
                                        </li>
                                        <span onClick={() => deleteTask(x['task_id'])}
                                              className={'close'}>x</span>
                                    </div>
                                )
                            )
                            : <h3 className={'text-center'}>No Tasks...</h3>
                    }

                </ul>
            </div>
        </div>
    )
}

export default Tasks;