function Input(
    {
        type,
        name,
        placeHolder,
    }
){

    return(
            <input type={type}
                   name={name}
                   className="w-full px-3 py-2 my-2 border border-slate-400 rounded-lg"
                   placeholder = {placeHolder}
                   required/>
    )
}
export default Input;