import {dateFormat} from "../../../../../../Services/GoalService";
import {BsCalendarPlus} from "react-icons/bs";
import {updateTaskForGoalId} from "../../../../../../Services/TaskService";
import {useAuthContext} from "../../../../../../Contexts/AuthContext";

function TaskDueDate (
    {
        taskId,
        setUpdateTasksList,
        dueDate,
        showHideDate,
        setShowHideDate
    }
){
    const due_date = dateFormat(dueDate);
    const {user} = useAuthContext();

    const changeDueDate = (e) => {
        setShowHideDate('hidden');

        const data = {
            user_id: user.user_id,
            token: user.token,
            due_date: e.currentTarget.value
        }

        updateTaskForGoalId(taskId,data)
            .then(res => {
                console.log('Success Date Changed: ', res)
                setUpdateTasksList(true);
            })
            .catch(err => {
                console.log('Error Date not changed: ',err)
                console.log('Error Date not changed: ',err.response.data)
            })
    }

    return(
        <div className={'col-span-2 flex justify-center'}>
            {showHideDate === 'hidden'
                ? (
                    <span className={'text-sm cursor-pointer'}
                          onClick={() => setShowHideDate('block')}>
                                                    {due_date ? due_date : <BsCalendarPlus />}
                                                </span>
                )
                : (
                    <input className={'text-sm cursor-pointer'}
                           type="date"
                           value={due_date && due_date}
                           onChange={changeDueDate}
                    />
                )
            }
        </div>
    )
}
export default TaskDueDate;