import {useAuthContext} from "../../../../../../Contexts/AuthContext";
import {updateTaskForGoalId} from "../../../../../../Services/TaskService";
import {useState} from "react";

function TaskTitle(
    {
        taskId,
        task_title,
        showHideTitle,
        setShowHideTitle
    }
){
    const {user} = useAuthContext();
    const [title,setTitle] = useState(task_title);

    const changeTitle = (e) => {
        setShowHideTitle('hidden');
        console.log('Input: ',e.currentTarget.value)
        const changedTitle = e.currentTarget.value;
        //TODO Validate the input!
        const data = {
            user_id: user.user_id,
            token: user.token,
            title: changedTitle
        }

        updateTaskForGoalId(taskId,data)
            .then(res => {
                console.log('Success Title Changed: ', res)
                setTitle(changedTitle);
            })
            .catch(err => {
                console.log('Error Title not changed: ',err)
                console.log('Error Title not changed: ',err.response.data)
            })
    }

    return(
        <div className={'col-span-3 flex justify-center'}>
            {showHideTitle === 'hidden'
                ? (
                    <span className={'cursor-pointer'}
                          onDoubleClick={() => setShowHideTitle('block')}>
                          {title ? title : 'Loading..'}
                    </span>
                )
                : (
                    <input className={'w-full cursor-pointer italic border-2 text-blue border-blue bg-blue-bg '}
                           type="text"
                           defaultValue={title ? title : 'Loading..'}
                           onBlur={changeTitle}
                    />
                )
            }
        </div>
    )
}
export default TaskTitle;