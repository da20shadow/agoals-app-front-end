import {DropDownMenu} from "../../../../../../Components";
import {GiSandsOfTime} from "react-icons/gi";
import {FaEdit} from "react-icons/fa";
import {BsCheckLg} from "react-icons/bs";
import {useAuthContext} from "../../../../../../Contexts/AuthContext";
import {updateTaskForGoalId} from "../../../../../../Services/TaskService";

function Status(
    {
        taskId,
        setUpdateTasksList,
        taskStatus,
        setTaskStatus,
        showHideStatus,
        setShowHideStatus,
    }
){
    const {user} = useAuthContext();

    const changeStatus = (e) => {
        let status;
        let statusNumber;
        switch (e.currentTarget.textContent) {
            case 'In Progress':
                statusNumber = 1;
                status = <span className={'rounded-md text-red bg-red-bg py-2 px-3'}> In Progress</span>;
                break;
            case 'In Review':
                statusNumber = 2;
                status = <span className={'rounded-md text-blue bg-blue-bg py-2 px-3'}> In Review</span>;
                break;
            case 'To Do':
                statusNumber = 3;
                status = <span className={'rounded-md text-primary bg-light-gray py-2 px-3'}>To Do</span>;
                break;
            case 'Completed':
                statusNumber = 4;
                status = <span className={'rounded-md text-green bg-green-bg py-2 px-3'}> Completed</span>;
                break;
            default:
                statusNumber = 3;
                status = <span className={'rounded-md text-primary bg-light-gray py-2 px-3'}>To Do</span>;
        }
        const data = {
            user_id: user.user_id,
            token: user.token,
            status: statusNumber
        }
        updateTaskForGoalId(taskId,data)
            .then(res => {
                console.log('Success Task Status Changed: ', res)
                setTaskStatus(status);
                setUpdateTasksList(true);
            })
            .catch(err => {
                console.log('Error Status not changed: ',err)
                console.log('Error Status not changed: ',err.response.data)
            })

    }

    return(
        <div className={'col-span-1 flex justify-center'}>
            <div className={'relative inline-block px-2'}
                 onMouseOver={() => setShowHideStatus('block')}
                 onMouseLeave={() => setShowHideStatus('hidden')}
            >
                <DropDownMenu showHide={showHideStatus}
                              activeMenu={taskStatus}
                              menus={[
                                  {
                                      menu: 'To Do',
                                      textColor: 'gray',
                                      onClickFun: changeStatus
                                  },
                                  {
                                      menu: 'In Progress',
                                      textColor: 'red',
                                      icon: <GiSandsOfTime/>,
                                      onClickFun: changeStatus
                                  },
                                  {
                                      menu: 'In Review',
                                      textColor: 'blue',
                                      icon: <FaEdit/>,
                                      onClickFun: changeStatus
                                  },
                                  {
                                      menu: 'Completed',
                                      textColor: 'green',
                                      icon: <BsCheckLg/>,
                                      onClickFun: changeStatus
                                  }
                              ]}/>

            </div>
        </div>
    )
}
export default Status;