import {Link} from "react-router-dom";
import {BsArrowLeftCircle, BsClockHistory} from "react-icons/bs";
import {useEffect, useState} from "react";
import {calculateRemainingDays} from "../../../../Services/GoalService";

function GoalProgressBar({progress, dueDate}){

    const [goalProgress,setGoalProgress] = useState(progress);
    const [goalDaysLeft,setGoalDaysLeft] = useState(dueDate);

    useEffect(() => {
            progress = progress === 0 ? '0' : progress;
            progress && setGoalProgress(progress);
            dueDate && setGoalDaysLeft(calculateRemainingDays(dueDate));
    }, [progress,dueDate]);

    return(
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
                     style={{width: `${goalProgress ? goalProgress : 'Loading..'}%`}}
                >
                    {goalProgress ? goalProgress : 'Loading..'}%
                </div>

            </div>

            {/*Days Left*/}
            <div className={'flex justify-center items-center ml-3 border w-48 whitespace-nowrap'}>
                <BsClockHistory size={'20px'} />
                <span className={'ml-1 text-sm p-1'}> Days Left:
                    <strong> {goalDaysLeft ? goalDaysLeft : 'Loading..'}</strong>
                </span>
            </div>
        </div>

    )
}
export default GoalProgressBar;