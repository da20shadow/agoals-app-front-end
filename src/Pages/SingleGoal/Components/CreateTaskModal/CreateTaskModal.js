import {useState} from "react";
import './createTaskModal.css';
import {Button, Input, Notification, Select} from "../../../../Components";
import {BsPlusLg} from "react-icons/bs";
import {createTaskForGoalId} from "../../../../Services/TaskService";

function CreateTaskModal(
    {
        setUpdateTasksList,
        goalTitle,
        goalId,
        userData,
        setShowHideModal
    }
) {

    const [alert,setAlert] = useState();

    const addTask = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const {title, description} = Object.fromEntries(formData);

        const data = {
            title,
            description,
            user_id: userData.user_id,
            token: userData.token,
            goal_id: goalId
        }
        createTaskForGoalId(data)
            .then(res => {
                console.log('Success: ',res)
                setAlert(<Notification type={'Success'} text={'Successfully Added New Task!'} />)
                setUpdateTasksList(true);
            })
            .catch(err => {
                console.log('Error: ',err)
                setAlert(<Notification type={'Error'} text={err.response.data.message} />)
            })
    }

    return (

        <>
            <div className="absolute">
                {alert}
            </div>
            <div className={`modal relative bg-gray p-0 w-3/4 z-20 border-2 border-light-gray rounded-lg`}>

                <div className={'py-3 rounded-t-lg bg-blue text-light-blue'}>

                <span onClick={() => setShowHideModal('hidden')}
                      className="close">&times;</span>

                    <h2 className={'text-center text-xl'}><strong>GOAL: </strong>{goalTitle}</h2>

                </div>

                <form id={'createTaskForm'} className={'px-5 py-3'} onSubmit={addTask}>

                    <div>
                        <Input type={'text'}
                               name={'title'}
                               placeHolder={'Task title...'}/>
                    </div>
                    <div>
                    <textarea className={'w-full py-3 px-2 border rounded-lg'}
                              name="description"
                              rows="5"
                              placeholder={'Task Description..'}/>
                    </div>

                </form>

                <div className={'modal-footer flex justify-end py-3 rounded-b-lg border-t-1 border-blue'}>

                    <Button primaryBtn={true}
                            additionalStyle={'mr-5'}
                            icon={<BsPlusLg/>}
                            text={'Add Task'}
                            type={'submit'}
                            form={'createTaskForm'}/>
                </div>

            </div>
        </>
    );
}

export default CreateTaskModal;