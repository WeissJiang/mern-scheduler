import './Login.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/auth/action';
import { setToast } from '../../store/toast/action';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("login starts")
        dispatch(loginUser({ email, password }))
            .then((res) => {
                navigate('/');
                console.log("res:", res)
            })
            .catch((e) => {
                dispatch(setToast({ message: e.toString(), type: "error" }));
            });

    };
    return (
       <div className='login-page'>
            <div className='box'>
                <div className='login'>
                    <div className='loginBx'>
                        <h2>Login</h2>
                        <input 
                            type='text' 
                            id="email" 
                            name="email"
                            autoComplete="email"
                            placeholder='Email' 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                        <input 
                            type='password' 
                            id="password" 
                            name="password"
                            autoComplete="current-password"
                            placeholder='Password' 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                        <input 
                            type='submit' 
                            placeholder='Sign in'
                            onClick={handleSubmit}
                        ></input>
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