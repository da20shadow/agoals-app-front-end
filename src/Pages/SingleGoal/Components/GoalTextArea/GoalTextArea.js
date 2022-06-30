function GoalTextArea({description}){

    return(
        <textarea
            className={'flex w-3/4 mx-auto border-2 border-light-gray p-4 rounded-lg'}
            rows="7"
            defaultValue={description}/>
    )
}
export default GoalTextArea;