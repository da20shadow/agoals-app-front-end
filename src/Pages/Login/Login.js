function Login(){

    const processLogin = (e) => {
        e.preventDefault();
        console.log('Login Clicked!')
    }

    return (
        <form className={'loginForm'} onSubmit={processLogin}>
            <input name={'username'} type="text" placeholder={'Username'}/>

            <input name={'password'} type="password" placeholder={'Password'} />

            <input type={'submit'} value={'Login'}/>
        </form>
    )
}

export default Login;