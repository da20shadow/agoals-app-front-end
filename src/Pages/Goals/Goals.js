import {useEffect, useState} from "react";
import {useAuthContext} from "../../Contexts/AuthContext";
import {useStateContext} from "../../Contexts/ContextProvider";
import {useNavigate} from "react-router-dom";

function Goals() {

    const calculateRemainingDays = (due_date) => {
        due_date = new Date(due_date);
        const dateNow = new Date();
        const timeInMilliseconds = due_date.getTime() - dateNow.getTime();
        return Math.ceil(timeInMilliseconds / (1000 * 60 * 60 * 24));
    }

    const dateFormat = (due_date) => {
        due_date = new Date(due_date);
        let month = due_date.toLocaleString('en-us', { month: 'short' });
        return ` ${due_date.getDate()} ${month}, ${due_date.getFullYear()}`;
    }

    const calculateTodayTarget = (progress,remainingDays) => {
        let todayTarget = 100 - progress;
        if (remainingDays > 1){
            todayTarget = Math.round(todayTarget / remainingDays);
        }
        return todayTarget;
    }

    const {isLogged, user} = useAuthContext();
    const {goals, getAllGoals} = useStateContext();
    const [sortGoalsBy,setSortGoalsBy] = useState('');

    console.log('Rendering Goals.js Goals List Page')

    useEffect(() => {
        console.log('Goals.js Use Effect Mounting Now!')
        getAllGoals({user_id: user.user_id});
    }, []);

    const sortGoals = (sortBy) => {
        setSortGoalsBy(sortBy.target.value);
    }
    const redirect = useNavigate();
    const openGoal = (goal_id) => {
        console.log(goal_id);
        redirect(`/goal/${goal_id}`);

    }

    const goalsList = goals.sort((g1,g2) => {
        if (sortGoalsBy === 'due_date'){
            const gOneDueDate = new Date(g1.due_date);
            const gTwoDueDate = new Date(g2.due_date);
            return (gOneDueDate - gTwoDueDate)

        }else if (sortGoalsBy === 'created_on') {
            const gOneCreated = new Date(g1.created_on);
            const gTwoCreated = new Date(g2.created_on);
            return (gOneCreated - gTwoCreated)

        }else if (sortGoalsBy === 'progress'){
            return (g2.progress - g1.progress);
        }
    }).map(g => {
        let dueDate = dateFormat(g.due_date);
        let remainingDays = calculateRemainingDays(g.due_date);
        let todayTarget = calculateTodayTarget(g.progress,remainingDays);
        return (
            <div key={g.goal_id}
                 className={'border rounded-t-lg bg-light-gray drop-shadow-xl cursor-pointer'}
                 onClick={()=> openGoal(g.goal_id)}>

                <h2 className={'text-center text-2xl font-bold my-3 text-blue'}>
                    {g.title}
                </h2>
                <hr/>
                <span className={'text-xs pl-3'} >Created On: <strong>{g.created_on}</strong></span>
                <p className={'my-3 p-5 text-center text-blue'}>
                    {g.description}
                </p>

                <div className="flex flex-wrap justify-between">
                    <p className={'px-4 py-2 text-secondary text-xs'}>
                        Due Date:
                        <strong>{dueDate}</strong>
                    </p>
                    <p className={'px-4 py-2 text-secondary text-xs'}>
                        Completed: <strong>{g.progress}%</strong>
                    </p>
                </div>
                <hr/>
                <div className="flex flex-wrap justify-between">
                    <p className={'m-3 px-4 py2 bg-blue-bg rounded-lg text-sm border'}>
                        Today's Target <strong>{todayTarget}%</strong>
                    </p>
                    <p className={'m-3 px-4 py2 bg-orange-bg rounded-lg text-sm border'}>
                        Days Left: <strong>{remainingDays < 0 ? 'Overdue' : remainingDays}</strong>
                    </p>
                </div>
            </div>
        )
    })

    return (
        <div className={'container mx-auto'}>

            <h1 className={'text-center text-3xl font-bold mt-10'}>My Goals List</h1>


            <select onChange={sortGoals} >
                <option value="">Sort By</option>
                <option value="progress">Progress</option>
                <option value="due_date">Due Date</option>
                <option value="created_on">Created On</option>
            </select>

            {/*Goal Start*/}
            <div className={'grid grid-cols-1 md:grid-cols-2 gap-12 m-12'}>
                {goalsList}
            </div>
            {/*Goal END*/}

        </div>
    );
}

export default Goals;