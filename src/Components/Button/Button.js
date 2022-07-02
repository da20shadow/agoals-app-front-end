import './Button.css';
function Button(
    {primaryBtn, type, form, icon, bgColor, color,
        bgHoverColor, size, text,
        borderRadius, width, additionalStyle }
){
    const btnStyle = 'btn bg-blue-bg text-blue hover:drop-shadow-xl ' +
                'hover:bg-blue hover:text-light-blue hover:ring hover:ring-light-blue';
    if (primaryBtn){
        return (
            <button
                type={type}
                form={form}
                className={`${btnStyle} ${additionalStyle}`}>
                {icon} <span>{text}</span>
            </button>
        )
    }

    return (
        <button
            type="button"
            style={{ backgroundColor: bgColor, color, borderRadius }}
            className={`flex text-${size} p-3 w-${width} hover:drop-shadow-xl border hover:bg-${bgHoverColor}`}
        >
            {icon} <span className={'pl-4'}>{text}</span>
        </button>
    )
}
export default Button;