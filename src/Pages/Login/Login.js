import './scss/login.css';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import * as authService from '../../Services/AuthService';
import {CgLogIn} from 'react-icons/cg';
import {Button, Notification} from "../../Components";
import {useAuthContext} from "../../Contexts/AuthContext";
function Login() {
    const redirect = useNavigate();
    const [alert,setAlert] = useState(undefined);
    const {login} = useAuthContext();

    const processLogin = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const {username, password} = Object.fromEntries(formData);

        if (!alert){
            let response= authService.login({username,password});
            response
                .then(res => {
                    login({
                        user_id: res.user_id,
                        username: res.username,
                        email: res.email,
                        token: res.token,
                        }
                    )
                })
                .catch(err => {
                    setAlert(<Notification type={'Error'} text={err.response.data.message}/>);
                })
            setTimeout(() => {
                setAlert(undefined);
            }, 2500);
        }
    }

    return (
        <div className={'login-container'}>

            <div id="message" className="text-center absolute">{ alert }</div>

            <form method="post"
                  className={'loginForm bg-main-bg w-4/5 md:w-96 drop-shadow-2xl rounded-lg'}
                  onSubmit={processLogin}>

                <h1 className="text-center text-blue text-3xl mb-8">Login</h1>

                <div className="grid gap-4 grid-cols-1">

                    <input type="text"
                           name={'username'}
                           className="w-full px-3 py-2 border border-slate-400 rounded-lg"
                           placeholder={'Username'}
                           required/>

                    <input type="password"
                           name={'password'}
                           className="w-full px-3 py-2 border border-slate-400 rounded-lg"
                           placeholder={'Password'}
                           required/>

                    <div className="my-5">
                        <Button primaryBtn={true} icon={<CgLogIn />} text={'Login'} />
                    </div>

                </div>

            </form>
        </div>
    )
}

export default Login;