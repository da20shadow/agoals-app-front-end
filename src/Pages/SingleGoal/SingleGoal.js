import {Link, useNavigate, useParams} from "react-router-dom";
import {getGoalById} from "../../Services/GoalService";
import {useAuthContext} from "../../Contexts/AuthContext";
import {useEffect, useState} from "react";
import {GiStairsGoal} from 'react-icons/gi';
import {BsCalendarDate,BsFlag,BsClockHistory,BsArrowLeftCircle,
    BsCheck,BsUiChecks,BsFlagFill} from 'react-icons/bs';

function SingleGoal (){
    const [showHide,setShowHide] = useState('hidden');
    const [showHideStatus,setShowHideStatus] = useState('hidden');
    const [showHideDate,setShowHideDate] = useState('hidden');
    const {user} = useAuthContext();
    const {goal_id} = useParams();
    const {isLogged} = useAuthContext();
    const redirect = useNavigate();

    const userData = {user_id: user.user_id, token: user.token}

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

    useEffect(() => {
        console.log('Goals.js Use Effect Mounting Now!')
        const response = getGoalById(goal_id,userData);
        response.then(res => {
            console.log(res)
            setGoal(res)
        }).catch(err=> {
            console.log(err)
        })
    }, []);

    return (
        <>
            {isLogged
                ? (
                    <div className={'mx-auto'} onClick={() => setShowHideDate('hidden')}>

                        {/*Goal Title*/}
                        <div className={'mx-auto text-orange mt-20 md:mt-10 mb-7 text-3xl'}>
                            <div className={'flex justify-center items-center'}>
                                <GiStairsGoal />
                                <span className={'px-3 font-bold'}> GOAL: </span>
                            </div>
                            <h1 className="font-bold text-center text-blue text-2xl">
                                {goal.title}
                            </h1>
                        </div>

                        {/*Created - Due Date*/}
                        <div className={'flex justify-center items-center my-3'}>

                            <BsCalendarDate />
                            <span className={'px-3'}>Jun 28, 2022</span>
                            -
                            <span className={'px-3'}>May 05, 2022</span>
                            <BsFlag />
                        </div>

                        {/*Back button, Progress Bar & Days Left */}
                        <div className={'flex justify-center items-center flex-wrap md:flex-nowrap w-3/4 mx-auto '}>

                            {/*Button*/}
                            <Link to={'/goals'} className="flex justify-center items-center mr-3 border
                                        bg-blue text-light-green font-bold py-1 px-4 rounded-lg hover:drop-shadow-lg">
                                <BsArrowLeftCircle/>
                                <span className={'ml-2'}>Back</span>
                            </Link>

                            {/*Progress Bar*/}
                            <div className={'mx-auto my-4 w-full md:w-3/4 bg-light-gray rounded-full border border-green items-center'}>

                                <div className="container text-green font-bold bg-green-bg text-center rounded-full"
                                     style={{width: `${goal.progress}%`}}
                                >
                                    {goal.progress}%
                                </div>

                            </div>

                            {/*Days Left*/}
                            <div className={'flex justify-center items-center ml-3 border w-48 whitespace-nowrap'}>
                                <BsClockHistory size={'20px'} />
                                <span className={'ml-1 text-sm p-1'}> Days Left: <strong>Overdue</strong></span>
                            </div>
                        </div>

                        {/*Goal Description*/}
                        <textarea
                            className={'flex w-3/4 mx-auto border-2 border-light-gray p-4 rounded-lg'}
                            rows="7"
                            defaultValue={goal.description}/>

                        <div className={'flex justify-between items-center w-3/4 mx-auto my-3'}>
                            <span>Target: 10% / day</span>
                            <button>+ Add Task</button>
                        </div>

                        <hr/>

                        {/*Tasks Done and Total*/}
                        <div className={'flex mx-auto w-3/4'}>
                            <div className="flex items-center border border-light-gray
                                rounded whitespace-nowrap py-2 px-4 my-2">
                               <BsUiChecks />
                                <span className={'pl-2'}>Tasks: (</span>
                                <BsCheck />
                                <span className={'pl-2'}>0 - 3 )</span>
                            </div>
                        </div>

                        {/*Task List Container*/}
                        <div className="container flex justify-center mx-auto">

                            {/*Tasks List*/}
                            <div className={'w-full mt-3'}>
                                {/*Tasks Header*/}
                                <div className="grid grid-cols-7 md:grid-cols-10 gap-2 text-orange border-b-1 border-light-gray mb-2">
                                    <h3 className={'col-span-3 font-bold text-md border-l-1 border-light-gray'}>Task Title</h3>
                                    <h3 className={'col-span-2 font-bold text-md border-l-1 border-light-gray'}>Due Date</h3>
                                    <h3 className={'col-span-1 font-bold text-md border-l-1 border-light-gray'}>Priority</h3>
                                    <h3 className={'col-span-1 font-bold text-md border-l-1 border-light-gray'}>Status</h3>
                                    <h3 className={'hidden md:block col-span-3 font-bold text-md border-l-1 border-light-gray'}>Progress</h3>
                                </div>

                                {/*Single Task*/}
                                <div className="grid grid-cols-7 md:grid-cols-10 gap-2 items-center border-b border-light-gray">

                                    {/*Title*/}
                                    <div className={'col-span-3'}>
                                        Task Title Goes Here :)
                                    </div>

                                    {/*Due Date*/}
                                    <div className={'col-span-2'}
                                        onClick={() => setShowHideDate('block')}
                                    >
                                        {showHideDate === 'hidden'
                                            ? '25/Aug/2022'
                                            : <input className={'text-sm'} type="date"/>
                                        }
                                    </div>

                                    {/*Priority*/}
                                    <div className={'col-span-1'}>
                                        <div className={'relative inline-block px-2'}
                                            onMouseOver={() => setShowHide('block')}
                                            onMouseLeave={() => setShowHide('hidden')}
                                        >
                                            <button><BsFlag/></button>
                                            <div className={`absolute bg-light-gray w-32 drop-shadow-lg z-20 ${showHide}`}>
                                                <div
                                                    className={'cursor-pointer flex justify-start items-center py-2 px-3 hover:bg-green-bg text-red'}>
                                                    <BsFlagFill/>
                                                    <span className={'pl-2'}>Urgent</span>
                                                </div>
                                                <div
                                                    className={'cursor-pointer flex justify-start items-center py-2 px-3 hover:bg-green-bg text-orange'}>
                                                    <BsFlagFill/>
                                                    <span className={'pl-2'}>High</span>
                                                </div>
                                                <div
                                                    className={'cursor-pointer flex justify-start items-center py-2 px-3 hover:bg-green-bg text-blue'}>
                                                    <BsFlagFill/>
                                                    <span className={'pl-2'}>Normal</span>
                                                </div>
                                                <div
                                                    className={'cursor-pointer flex justify-start items-center py-2 px-3 hover:bg-green-bg text-gray'}>
                                                    <BsFlagFill/>
                                                    <span className={'pl-2'}>Low</span>
                                                </div>
                                                <div
                                                    className={'cursor-pointer flex justify-start items-center py-2 px-3 hover:bg-green-bg text-light-gray'}>
                                                    <BsFlag/>
                                                    <span className={'pl-2'}>No Priority</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/*Status*/}
                                    <div className={'col-span-1'}>
                                        <div className={'relative inline-block px-2'}
                                             onMouseOver={() => setShowHideStatus('block')}
                                             onMouseLeave={() => setShowHideStatus('hidden')}
                                        >
                                            <button>To Do</button>
                                            <div className={`absolute bg-light-gray w-32 drop-shadow-lg z-20 ${showHideStatus}`}>
                                                <div
                                                    className={'cursor-pointer flex justify-start items-center py-2 px-3 hover:bg-green-bg text-gray'}>
                                                    <span className={'pl-2'}>To Do</span>
                                                </div>
                                                <div
                                                    className={'cursor-pointer flex justify-start items-center py-2 px-3 hover:bg-green-bg text-red'}>
                                                    <span className={'pl-2'}>In Progress</span>
                                                </div>
                                                <div
                                                    className={'cursor-pointer flex justify-start items-center py-2 px-3 hover:bg-green-bg text-blue'}>
                                                    <span className={'pl-2'}>In Review</span>
                                                </div>
                                                <div
                                                    className={'cursor-pointer flex justify-start items-center py-2 px-3 hover:bg-green-bg text-green'}>
                                                    <span className={'pl-2'}>Completed</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/*Progress*/}
                                    <div className={'hidden md:block col-span-3'}>
                                        {/*Task Progress*/}
                                        <div className={'mx-auto my-4 w-full md:w-3/4 bg-light-gray rounded-full border border-green items-center'}>

                                            <div className="container text-green font-bold bg-green-bg text-center text-sm rounded-full"
                                                 style={{width: `${goal.progress}%`}}
                                            >
                                                {goal.progress}%
                                            </div>

                                        </div>
                                    </div>

                                </div>
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