import './Login.scss';
export default function Login() {
    return (
       <div className='login-page'>
            <div className='box'>
                <div className='login'>
                    <div className='loginBx'>
                        <h2>Login</h2>
                        <input type='text' placeholder='Email'></input>
                        <input type='password' placeholder='Password'></input>
                        <input type='submit' placeholder='Sign in'></input>
                        <div className='group'>
                            <a href='https://www.linkedin.com/in/weiss-jiang/'>Forget Password</a>
                            <a href='https://www.linkedin.com/in/weiss-jiang/'>Register</a>
                        </div>
                    </div>
                </div>
        </div>
       </div>
    )
}