import {useNavigate} from "react-router-dom";

function GoalBox (
    {
        id,
        title,
        description,
        createdOn,
        dueDate,
        progress,
    }
) {
    const todayTarget = 1;
    const remainingDays = 1;

    const redirect = useNavigate();

    const openGoal = (goal_id) => {
        redirect(`/goal/${goal_id}`);
    }

    return (
        <div className={'border rounded-t-lg bg-light-gray hover:drop-shadow-xl cursor-pointer'}
             onClick={()=> openGoal(id)}>

            <h2 className={'text-center text-2xl font-bold my-3 text-blue'}>
                {title}
            </h2>
            <hr/>
            <span className={'text-xs pl-3'} >Created On: <strong>{createdOn}</strong></span>
            <p className={'my-3 p-5 text-center text-blue'}>
                {description}
            </p>

            <div className="flex flex-wrap justify-between">
                <p className={'px-4 py-2 text-secondary text-xs'}>
                    Due Date:
                    <strong>{dueDate}</strong>
                </p>
                <p className={'px-4 py-2 text-secondary text-xs'}>
                    Completed: <strong>{progress}%</strong>
                </p>
            </div>
            <hr/>
            <div className="flex flex-wrap justify-between">
                <p className={'m-3 px-4 py2 bg-blue-bg rounded-lg text-sm border'}>
                    Today's Target <strong>{todayTarget}%</strong>
                </p>
                <p className={'m-3 px-4 py2 bg-orange-bg rounded-lg text-sm border'}>
                    Days Left: <strong>{remainingDays}</strong>
                </p>
            </div>
        </div>
    )
}
export default GoalBox;