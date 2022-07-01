function Select({name, defaultOption, options}) {
    return (
        <label>
            <select name={name} className={'px-3 py-2 my-2 border border-slate-400 rounded-lg'}>
                <option key={'no'}>{defaultOption}</option>
                {options.map(o => {
                    return (
                        <option key={o} value={o}>{o}</option>
                    )
                })}
            </select>
        </label>
    )
}

export default Select;