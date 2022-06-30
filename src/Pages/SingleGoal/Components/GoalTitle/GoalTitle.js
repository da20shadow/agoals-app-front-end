import {GiStairsGoal} from "react-icons/gi";

function GoalTitle({goalTitle}){
    return(
        <div className={'mx-auto text-orange mt-20 md:mt-10 mb-7 text-3xl'}>
            <div className={'flex justify-center items-center'}>
                <GiStairsGoal />
                <span className={'px-3 font-bold'}> GOAL: </span>
            </div>
            <h1 className="font-bold text-center text-blue text-2xl">
                {goalTitle}
            </h1>
        </div>
    )
}
export default GoalTitle;