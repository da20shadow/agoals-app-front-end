import {useNavigate, useParams} from "react-router-dom";
import {getGoalById,getTasksByGoalId} from "../../Services/GoalService";
import {useAuthContext} from "../../Contexts/AuthContext";
import {useEffect, useState} from "react";
import {BsCheck,BsUiChecks} from 'react-icons/bs';
import SingleTask from "./Components/Task";
import GoalProgressBar from "./Components/GoalProgressBar";
import GoalStartEndDate from "./Components/GoalStartEndDate";
import GoalTitle from "./Components/GoalTitle";
import GoalTextArea from "./Components/GoalTextArea";
import GoalDailyTarget from "./Components/GoalDailyTarget";
import CreateTaskModal from "./Components/CreateTaskModal";

function SingleGoal (){
    const [goal,setGoal] = useState({
        title: '',
        description: '',
        progress: '',
        completed: '',
        due_date: '',
        created_on: '',
        category: '',
        user_id: '',
    });
    const [tasksList,setTasksList] = useState([{
        task_id: '',
        title: '',
        description: '',
        due_date: '',
        progress: '',
        status: '',
        goal_id: '',
        user_id: '',
        total_subtasks: '',
        created_on: '',
    }])
    const [showHideModal,setShowHideModal] = useState('hidden');
    const [updateTasksList,setUpdateTasksList] = useState();

    const {user} = useAuthContext();
    const {goal_id} = useParams();
    const {isLogged} = useAuthContext();
    const redirect = useNavigate();

    const userData = {user_id: user.user_id, token: user.token}

    useEffect(() => {
        console.log('Goals.js Use Effect Mounting Now!')
        const response = getGoalById(goal_id,userData);
        response.then(res => {
            setGoal(res)
        }).catch(err=> {
            console.log(err)
        })
    }, []);

    useEffect(() => {
        console.log('Goals.js Second Use Effect Mounting Now!')
        const response = getTasksByGoalId(goal_id,userData);
        response.then(res => {
            setTasksList(res.tasks)
        }).catch(err=> {
            console.log(err)
        })
        setUpdateTasksList(false);
    }, [updateTasksList]);

    tasksList.sort((t1,t2) => {

    }).map(t => {

    })

    return (
        <>
            {isLogged
                ? (
                    <div className={'mx-auto'}>

                        {/*Goal Title*/}
                        <GoalTitle goalTitle={goal.title} />

                        {/*Created - Due Date*/}
                        <GoalStartEndDate createdOn={goal.created_on} dueDate={goal.due_date} />

                        {/*Back button, Progress Bar & Days Left */}
                        <GoalProgressBar progress={goal.progress} dueDate={goal.due_date} />

                        {/*Goal Description*/}
                        <GoalTextArea description={goal.description} />

                        {/*Daily Target and Add New Task Button*/}
                        <div className={'flex justify-between items-center w-3/4 mx-auto my-3'}>

                            <GoalDailyTarget dueDate={goal.due_date} progress={goal.progress} />

                            <button className={'border border-light-gray px-3 py-2 rounded-lg'}
                                onClick={() => setShowHideModal('block')} >
                                + Add Task
                            </button>

                        </div>

                        {/*Create Task Modal*/}
                        <div className={`${showHideModal} fixed z-20 pt-40 left-0 top-0 w-full 
                                    h-full bg-half-transparent `}>

                            <CreateTaskModal setShowHideModal={setShowHideModal}
                                             setUpdateTasksList={setUpdateTasksList}
                                             goalId={goal.goal_id}
                                             userData={userData}
                                             goalTitle={goal.title} />

                        </div>

                        <hr/>

                        {/*Tasks Done and Total & Sort Option*/}
                        <div className={'flex justify-between mx-auto w-3/4'}>

                            <div className="flex items-center border border-light-gray
                                rounded whitespace-nowrap py-2 px-4 my-2">
                               <BsUiChecks />
                                <span className={'pl-2'}>Tasks: (</span>
                                <BsCheck />
                                <span className={'pl-2'}>0 - 3 )</span>
                            </div>

                            <div>
                                <select name="sortTasks"
                                        className={'border border-light-gray rounded py-2 px-4 my-2 whitespace-nowrap'}>
                                    <option value="">Sort By</option>
                                    <option value="due_date">Due Date</option>
                                    <option value="priority">Priority</option>
                                    <option value="status">Status</option>
                                </select>
                            </div>

                        </div>

                        {/*Task List Container*/}
                        <div className="container flex justify-center mx-auto mb-24">

                            {/*Tasks List*/}
                            <div className={'w-full mt-3 mx-2'}>
                                {/*Tasks Header*/}
                                <div className="grid grid-cols-8 md:grid-cols-11 gap-2 text-orange border-b-1 border-light-gray mb-2">
                                    <h3 className={'text-center col-span-3 font-bold text-md border-light-gray'}>Task Title</h3>
                                    <h3 className={'text-center col-span-2 font-bold text-md border-l-1 border-light-gray'}>Due Date</h3>
                                    <h3 className={'text-center col-span-1 font-bold text-md border-l-1 border-light-gray'}>Priority</h3>
                                    <h3 className={'text-center col-span-1 font-bold text-md border-l-1 border-light-gray'}>Status</h3>
                                    <h3 className={'text-center hidden md:block col-span-3 font-bold text-md border-l-1 border-light-gray'}>Progress</h3>
                                    <h3 className={'text-center hidden md:block col-span-1 font-bold text-md border-l-1 border-light-gray'}>Action</h3>
                                </div>

                                {/*Single Task*/}

                                {
                                    tasksList && tasksList.map(t =>{
                                        return (<SingleTask key={t.task_id}
                                                            setUpdateTasksList={setUpdateTasksList}
                                                            task={t} />)
                                    })
                                }

                            </div>

                        </div>


                    </div>
                )
                : redirect('/login')
            }

        </>

    )

}
export default SingleGoal;