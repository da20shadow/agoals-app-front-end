import './register.css';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import * as authService from "../../Services/AuthService";
import {Button, Notification} from "../../Components";
import {FaUserPlus} from "react-icons/fa";
import * as useerService from "../../Services/UserService";

function Register() {
    const redirect = useNavigate();
    const [alert, setAlert] = useState(undefined);

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
        const invalidFormDataMessage = useerService.verifyRegForm(username,email,password,re_password);

        if (invalidFormDataMessage){
            setAlert(<Notification type={'Error'} text={invalidFormDataMessage} />)
        }
        if (!invalidFormDataMessage) {
            let response = authService.register(data);
            response
                .then(data => {
                    setAlert(<Notification type={'Success'} text={data.message} />);
                    setTimeout(() => {
                        redirect('/login');
                    }, 1500);
                })
                .catch(err => {
                    setAlert(<Notification type={'Error'} text={err.response.data.message}/>);
                })
            setTimeout(() => {
                setAlert(undefined);
            }, 3000);
        }
        if (invalidFormDataMessage){
            setTimeout(() => {
                setAlert(undefined);
            }, 3000);
        }
    }

    return (
        <div className={'flex justify-center my-16'}>

            <div id="message" className="text-center absolute">{alert}</div>

            <form method="post"
                  className={'bg-main-bg w-4/5 md:w-3/4 lg:w-1/2 py-10 px-8 drop-shadow-2xl rounded-lg'}
                  onSubmit={processRegistration}>

                <h1 className="text-center mb-10 text-blue text-3xl font-bold">Register</h1>

                <div className="grid gap-4 grid-cols-2">
                    <input type="text"
                           name={'username'}
                           className="w-full px-3 py-2 border border-slate-400 rounded-lg"
                           placeholder={'Username'}
                           required/>

                    <input type="email"
                           name={'email'}
                           className="w-full px-3 py-2 border border-slate-400 rounded-lg"
                           placeholder={'Email'}
                           required/>

                    <input type="password"
                           name={'password'}
                           className="w-full px-3 py-2 border border-slate-400 rounded-lg"
                           placeholder={'Password'}
                           required/>

                    <input type="password"
                           name={'re_password'}
                           className="w-full px-3 py-2 border border-slate-400 rounded-lg"
                           placeholder={'Re-password'}
                           required/>
                </div>

                <div className="mt-8">
                    <Button primaryBtn={true} icon={<FaUserPlus />} text={'Register'} />
                </div>
            </form>
        </div>
    )
}

export default Register;