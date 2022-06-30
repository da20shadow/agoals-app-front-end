function TaskTitle(
    {
        title,
        showHideTitle,
        setShowHideTitle
    }
){
    return(
        <div className={'col-span-3 flex justify-center'}>
            {showHideTitle === 'hidden'
                ? (
                    <span className={'cursor-pointer'}
                          onDoubleClick={() => setShowHideTitle('block')}>
                          {title ? title : 'Loading..'}
                    </span>
                )
                : (
                    <input className={'w-full cursor-pointer italic border-2 text-blue border-blue bg-blue-bg '}
                           type="text"
                           defaultValue={title ? title : 'Loading..'}
                           onBlur={() => setShowHideTitle('hidden')}
                    />
                )
            }
        </div>
    )
}
export default TaskTitle;