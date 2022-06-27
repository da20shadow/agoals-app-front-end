import {BsFillCheckCircleFill,BsFillInfoCircleFill, BsFillExclamationTriangleFill} from 'react-icons/bs';
import './Notification.css';
function Notification(
    {type, text}
){
    if (type === 'Error'){
        return (<div className={'bg-red-bg alert z-50'}>
            <BsFillExclamationTriangleFill className={'text-red mr-3'} />
            <p><strong>Error! </strong> {text}</p>
        </div>)
    }else if (type === 'Success'){
        return (<div className={'bg-green-bg alert z-50'}>
            <BsFillCheckCircleFill className={'text-green mr-4'} />
            <p><strong>Success! </strong> {text}</p>
        </div>)
    }else if (type === 'Warning'){
        return (<div className={'bg-orange-bg alert z-50'}>
            <BsFillExclamationTriangleFill className={'text-orange'} />
            <p><strong>Warning! </strong> {text}</p>
        </div>)
    }

    return(
        <div className={'bg-blue-bg alert z-50'}>
            <BsFillInfoCircleFill className={'text-blue'} />
            <p><strong>Note! </strong>  {text}</p>
        </div>
    );
}
export default Notification;