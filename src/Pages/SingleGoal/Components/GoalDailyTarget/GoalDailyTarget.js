import * as goalService from "../../../../Services/GoalService";

function GoalDailyTarget({progress, dueDate}) {

    let remainingDays = goalService.calculateRemainingDays(dueDate);
    let todayTarget = goalService.calculateTodayTarget(progress, remainingDays);

    return (
        <span>Target: {todayTarget}% / day</span>
    )
}

export default GoalDailyTarget;