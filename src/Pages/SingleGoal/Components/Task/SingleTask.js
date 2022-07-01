import {BsFlag, BsFlagFill, BsCheckLg} from "react-icons/bs";
import {FaEdit} from "react-icons/fa";
import {GiSandsOfTime} from "react-icons/gi";
import {useEffect, useState} from "react";
import {DropDownMenu} from "../../../../Components";
import TaskTitle from "./Components/TaskTitle";
import TaskDueDate from "./Components/TaskDueDate";
import Status from "./Components/Status";
import ProgressBar from "./Components/ProgressBar";
import Priority from "./Components/Priority";
import DeleteTask from "./Components/DeleteTask";

function SingleTask(
    {
        task,
        setUpdateTasksList
    }
) {

    const [showHidePriority, setShowHidePriority] = useState('hidden');
    const [showHideStatus, setShowHideStatus] = useState('hidden');
    const [showHideDate, setShowHideDate] = useState('hidden');
    const [showHideTitle, setShowHideTitle] = useState('hidden');

    const [taskStatus, setTaskStatus] = useState();
    const [taskPriority, setTaskPriority] = useState();
    const [taskProgress, setTaskProgress] = useState();

    useEffect(()=> {
        task.progress === 0 ? setTaskProgress('0') : setTaskProgress(task.progress);

        let status;
        switch (task.status){
            case 1:
                status = <span className={'rounded-md text-red bg-red-bg py-2 px-3'}> In Progress</span>;
                break;
            case 2:
                status = <span className={'rounded-md text-blue bg-blue-bg py-2 px-3'}> In Review</span>;
                break;
            case 3:
                status = <span className={'rounded-md text-primary bg-light-gray py-2 px-3'}>To Do</span>;
                break;
            case 4:
                status = <span className={'rounded-md text-green bg-green-bg py-2 px-3'}> Completed</span>;
                break;
            default:
                status = <span className={'rounded-md text-primary bg-light-gray py-2 px-3'}>To Do</span>;
        }
        setTaskStatus(status);

        let priority;
        switch (task.priority){
            case 1:
                priority = <BsFlagFill color={'red'}/>;
                break;
            case 2:
                priority = <BsFlagFill color={'orange'}/>;
                break;
            case 3:
                priority = <BsFlagFill color={'blue'}/>;
                break;
            case 4:
                priority = <BsFlagFill color={'gray'}/>;
                break;
            default:
                priority = <BsFlag/>;
        }
        setTaskPriority(priority);
    },[])

    return (
        <div className="grid grid-cols-8 md:grid-cols-11 gap-2 items-center border-b border-light-gray">

            {/*Title*/}
            <TaskTitle taskId={task.task_id}
                       setUpdateTasksList={setUpdateTasksList}
                       task_title={task.title}
                       showHideTitle={showHideTitle}
                       setShowHideTitle={setShowHideTitle} />

            {/*Due Date*/}
            <TaskDueDate taskId={task.task_id}
                         setUpdateTasksList={setUpdateTasksList}
                         dueDate={task.due_date}
                         showHideDate={showHideDate}
                         setShowHideDate={setShowHideDate} />

            {/*Priority*/}
            <Priority taskId={task.task_id}
                      setUpdateTasksList={setUpdateTasksList}
                      taskPriority={taskPriority}
                      setShowHidePriority={setShowHidePriority}
                      setTaskPriority={setTaskPriority}
                      showHidePriority={showHidePriority} />

            {/*Status*/}
            <Status taskId={task.task_id}
                    setUpdateTasksList={setUpdateTasksList}
                    taskStatus={taskStatus}
                    setTaskStatus={setTaskStatus}
                    showHideStatus={showHideStatus}
                    setShowHideStatus={setShowHideStatus} />

            {/*Progress*/}
            <ProgressBar taskProgress={taskProgress} />

            {/*Delete Button*/}
            <DeleteTask taskId={task.task_id}
                        setUpdateTasksList={setUpdateTasksList} />

        </div>
    );
}

export default SingleTask;