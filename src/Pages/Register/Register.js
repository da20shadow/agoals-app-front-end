import { BsFillExclamationTriangleFill } from 'react-icons/bs';
import { BsCheckLg } from 'react-icons/bs';
import './register.css';
import axios from "axios";
import {useState} from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const redirect = useNavigate();
    const [notification, setNotification] = useState();

    const processRegistration = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const {username, email, password, re_password} = Object.fromEntries(formData);

        const data = {
            username,
            email,
            password,
            re_password,
        }
        const url = 'http://localhost:8090/AGoalsAppBackEnd/users/';

        try {
            let response = await axios.post(url,data);
            let result = await response.data;
            console.log('Success: ', response)

            const successMsg = (
                <div className="alert alert-success-flex align-items-center
                        alert-success fade show position-absolute alert-position"
                     role="alert">
                    <BsCheckLg size={'24px'} className={'bi flex-shrink-0 me-2'} />
                    <strong> Success: </strong> {result.message}
                </div>
            );
            setNotification(successMsg);
            setTimeout(()=>{
                redirect('/login');
            },2500)

        }catch (err){
            console.log('Error: ',err)
            console.log(err.response.data.message)
            const errorMsg = (
                <div className="alert alert-danger-flex align-items-center
                        alert-danger fade show position-absolute alert-position"
                     role="alert">
                    <BsFillExclamationTriangleFill size={'24px'} className={'bi flex-shrink-0 me-2'} />
                    <strong> Error: </strong> {err.response.data.message}
                </div>
            );
            setNotification(errorMsg);
        }
        if (!notification){
            setTimeout(()=>{
                setNotification('');
            },3000);
        }
    }

    return (
        <div className={'container'}>

            <div className="row">

                <div id="message" className="text-center">{notification}</div>

                <form method="post" className={'regForm'} onSubmit={processRegistration}>

                    <h1 className="text-center mb-3">Register</h1>

                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <input type="text"
                                   name={'username'}
                                   className=" invalidInput"
                                   placeholder={'Username'}
                                   required/>
                        </div>

                        <div className="col-12 col-lg-6">
                            <input type="email"
                                   name={'email'}
                                   className=" invalidInput"
                                   placeholder={'Email'}
                                   required/>
                        </div>

                        <div className="col-12 col-lg-6">
                            <input type="password"
                                   name={'password'}
                                   className=" is-invalid"
                                   placeholder={'Password'}
                                   required/>
                        </div>

                        <div className="col-12 col-lg-6">
                            <input type="password"
                                   name={'re_password'}
                                   className=" is-invalid"
                                   placeholder={'Re-password'}
                                   required/>
                        </div>

                        <div className="mt-4">
                            <button type={'submit'}>Register</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Register;