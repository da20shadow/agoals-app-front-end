function TaskDueDate (
    {
        dueDate,
        showHideDate,
        setShowHideDate
    }
){
    return(
        <div className={'col-span-2 flex justify-center'}>
            {showHideDate === 'hidden'
                ? (
                    <span className={'text-sm cursor-pointer'}
                          onClick={() => setShowHideDate('block')}>
                                                    {dueDate ? dueDate : 'Loading..'}
                                                </span>
                )
                : (
                    <input className={'text-sm cursor-pointer'}
                           type="date"
                           value={dueDate ? dueDate : 'Loading..'}
                           onChange={() => setShowHideDate('hidden')}
                    />
                )
            }
        </div>
    )
}
export default TaskDueDate;