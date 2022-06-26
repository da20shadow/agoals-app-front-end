import './scss/login.css';
import axios from "axios";
import {BsCheckLg, BsFillExclamationTriangleFill} from "react-icons/bs";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import * as authService from '../../Services/AuthService';
import {login} from "../../Services/AuthService";
function Login() {
    const redirect = useNavigate();
    const [notification, setNotification] = useState();
    const processLogin = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const {username, password} = Object.fromEntries(formData);

        let responseMessage = authService.login({username,password});
        responseMessage
            .then(res => {
                let authData = {
                    'id': res.user_id,
                    'email': res.email,
                    'username': res.username,
                    'token': res.token,
                }
                login(authData);
                console.log('This is the success: ',res);

                const success = (
                    <div className="alert alert-success-flex align-items-center
                        alert-success fade show position-absolute alert-position"
                         role="alert">
                        <BsCheckLg size={'24px'} className={'bi flex-shrink-0 me-2'}/>
                        <strong> Successfully logged in! </strong>
                    </div>
                );
                setNotification(success);
            })
            .catch(err => {
                const error = (
                    <div className="alert alert-danger-flex align-items-center
                        alert-danger fade show position-absolute alert-position"
                         role="alert">
                        <BsFillExclamationTriangleFill size={'24px'} className={'bi flex-shrink-0 me-2'} />
                        <strong> Error: </strong> {err.response.data.message}
                    </div>
                );
                setNotification(error);
        })

        // setNotification(successMsg);
        setTimeout(()=>{
            // redirect('/account');
        },2500)

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

                <form method="post" className={'loginForm'} onSubmit={processLogin}>

                    <h1 className="text-center">Login</h1>

                    <div className="my-3">
                        <input type="text"
                               name={'username'}
                               className=" invalidInput"
                               placeholder={'Username'}
                               required/>
                    </div>

                    <div className="mb-3">
                        <input type="password"
                               name={'password'}
                               className=" is-invalid"
                               placeholder={'Password'}
                               required/>
                    </div>

                    <div className="mb-3">
                        <button>Login</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login;