import {React, useState} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import LoginAPI from '../../api/login/login.api'
import { getInfo } from '../../redux/controllers/login/authSlice'
import { useDispatchRoot } from '../../redux/store'
import { useCookies } from 'react-cookie'
import "./login.scss"
import openNotification from '../../components/CNotification'



const Login = () => {

    const dispatch = useDispatchRoot();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [cookies, setCookie] = useCookies(['token']);
    const navigate = useNavigate()



    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    
    const handleSubmit = (e) => {
        e.preventDefault()
        LoginAPI.login(credentials).then((res) => {
            if(res.data) {
                dispatch(getInfo(res.data.user));
                setCookie("token", JSON.stringify(res.data.token));

                navigate("/dashboard/app")
             }
            
        }).catch((error) => {
            openNotification(
                "error",
                "",
                error.response.data.message
            )
        })
    }
    return (
        <>
            <div className="wrapper">
                <div className="login-section">
                    <div className="login-header">
                        <h2>Trang đăng nhập</h2>
                        <p>Truy cập bằng tài khoản người quản trị<br/>để theo dõi hệ thống</p>
                    </div>
                        <form onSubmit={handleSubmit}>
                            <div className="login-form">
                                <input type="email" placeholder="Email..." 
                                    name="email" value={credentials.email} 
                                    onChange={handleChange} required />  

                                <input type="password" placeholder="Mật khẩu..." 
                                    name="password" value={credentials.password} 
                                    onChange={handleChange} required />  
                                <p className="forgot-pwd">Quên mật khẩu?</p>
                            </div>
                            <div className="btn-action">
                                <button className="btn-login" type="submit">Đăng nhập
                                </button>
                            </div>

                        </form>

                    <img src="images/background/big-circle.png" className="decor" />
                </div>
                <div className="img-section">
                    <div className="overlay">
                        <p>Quên mật khẩu?</p>
                        <Link to="/forgotPassword">
                            <button className="btn-forgot">Chuyển</button>
                        </Link>
                        
                    </div>
                    <img src="images/background/login.png" alt="bg-login" />
                </div>
            </div>
        </>
    )
}

export default Login
