import {DropDownMenu} from "../../../../../../Components";
import {BsFlag, BsFlagFill} from "react-icons/bs";
import {useAuthContext} from "../../../../../../Contexts/AuthContext";
import {updateTaskForGoalId} from "../../../../../../Services/TaskService";

function Priority(
    {
        setUpdateTasksList,
        taskId,
        setTaskPriority,
        setShowHidePriority,
        showHidePriority,
        taskPriority,
    }
){
    const {user} = useAuthContext();

    const changePriority = (e) => {
        let icon;
        let priorityNumber;
        switch (e.currentTarget.textContent) {
            case 'Urgent':
                icon = <BsFlagFill color={'red'}/>;
                priorityNumber = 1;
                break;
            case 'High':
                icon = <BsFlagFill color={'orange'}/>;
                priorityNumber = 2;
                break;
            case 'Normal':
                icon = <BsFlagFill color={'blue'}/>;
                priorityNumber = 3;
                break;
            case 'Low':
                icon = <BsFlagFill color={'gray'}/>;
                priorityNumber = 4;
                break;
            case 'No Priority':
                icon = <BsFlag/>;
                priorityNumber = 5;
                break;
        }
        const data = {
            user_id: user.user_id,
            token: user.token,
            priority: priorityNumber
        }
        updateTaskForGoalId(taskId,data)
            .then(res => {
                console.log('Success Priority Changed: ', res)
                setUpdateTasksList(true);
                setTaskPriority(icon)
            })
            .catch(err => {
                console.log('Error Priority not changed: ',err)
                console.log('Error Priority not changed: ',err.response.data)
            })

    }

    return (
        <div className={'col-span-1 flex justify-center'}>
            <div className={'relative inline-block px-2'}
                 onMouseOver={() => setShowHidePriority('block')}
                 onMouseLeave={() => setShowHidePriority('hidden')}
            >
                <DropDownMenu showHide={showHidePriority}
                              activeMenu={taskPriority ? taskPriority : 'Loading..'}
                              menus={[
                                  {
                                      menu: 'Urgent',
                                      textColor: 'red',
                                      icon: <BsFlagFill color={'red'}/>,
                                      onClickFun: changePriority,
                                  },
                                  {
                                      menu: 'High',
                                      textColor: 'orange',
                                      icon: <BsFlagFill color={'orange'}/>,
                                      onClickFun: changePriority,
                                  },
                                  {
                                      menu: 'Normal',
                                      textColor: 'blue',
                                      icon: <BsFlagFill color={'blue'}/>,
                                      onClickFun: changePriority,
                                  },
                                  {
                                      menu: 'Low',
                                      textColor: 'light-gray',
                                      icon: <BsFlagFill color={'gray'}/>,
                                      onClickFun: changePriority,
                                  },
                                  {
                                      menu: 'No Priority',
                                      textColor: '',
                                      icon: <BsFlag/>,
                                      onClickFun: changePriority,
                                  },
                              ]}/>

            </div>
        </div>
    )
}
export default Priority;