import {BsCalendarDate, BsFlag} from "react-icons/bs";
import * as goalService from "../../../../Services/GoalService";

function GoalStartEndDate({createdOn, dueDate}){

    dueDate = goalService.dateFormat(dueDate);
    createdOn = goalService.dateFormat(createdOn);
    return(
        <div className={'flex justify-center items-center my-3'}>

            <BsCalendarDate />
            <span className={'px-3'}>{createdOn}</span>
            -
            <span className={'px-3'}>{dueDate}</span>
            <BsFlag />
        </div>
    )
}
export default GoalStartEndDate;