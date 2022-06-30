import {DropDownMenu} from "../../../../../../Components";
import {GiSandsOfTime} from "react-icons/gi";
import {FaEdit} from "react-icons/fa";
import {BsCheckLg} from "react-icons/bs";

function Status(
    {
        taskStatus,
        setTaskStatus,
        showHideStatus,
        setShowHideStatus,
    }
){

    const changeStatus = (e) => {
        let status;
        switch (e.currentTarget.textContent) {
            case 'To Do':
                status = <span className={'rounded-md text-primary bg-light-gray py-2 px-3'}>To Do</span>;
                break;
            case 'In Progress':
                status = <span className={'rounded-md text-red bg-red-bg py-2 px-3'}> In Progress</span>;
                break;
            case 'In Review':
                status = <span className={'rounded-md text-blue bg-blue-bg py-2 px-3'}> In Review</span>;
                break;
            case 'Completed':
                status = <span className={'rounded-md text-green bg-green-bg py-2 px-3'}> Completed</span>;
                break;
        }
        setTaskStatus(status);
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