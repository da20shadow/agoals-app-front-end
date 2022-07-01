function ProgressBar(
    {
        taskProgress
    }
){
    return(
        <div className={'hidden md:block col-span-3 flex justify-center'}>
            {/*Task Progress*/}
            <div
                className={'mx-auto my-4 w-full md:w-3/4 bg-light-gray rounded-full border border-green items-center'}>

                <div className="container text-green bg-green-bg text-center text-sm rounded-full"
                     style={{width: `${taskProgress ? taskProgress : 'Loading..'}%`}}
                >
                    {taskProgress ? taskProgress : 'Loading..'}%
                </div>

            </div>
        </div>
    )
}
export default ProgressBar;