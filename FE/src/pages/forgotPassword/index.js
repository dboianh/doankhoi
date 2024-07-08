import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import {Link} from 'react-router-dom'
import './forgotPassword.scss'

const forgotPassword = () => {
    
    return (
        <React.Fragment>
            <div className="forgot_wrapper">
                <div className="img-section">
                    <div className="overlay">
                        <p>Về đăng nhập</p>
                        <Link to="/login">
                            <button className="btn-forgot">Đăng nhập</button>
                        </Link>
                    </div>
                    <img src="images/background/login-nobg.png" alt="bg-login" data-aos="fade-right" />
                </div>
                <div className="forgot-section" >
                    <div className="forgot-header" data-aos="fade-left" >
                        <h2>Quên mật khẩu </h2>
                        <p>Nhập đúng email của bạn để hệ thống gửi yêu cầu <br/> đến đúng địa chỉ vừa nhập</p>
                    </div>
                    <div className="forgot-form" data-aos="fade-left" >
                        <input type="email" placeholder="Email..." className="email" required />  
                    </div>
                    <div className="btn-action" data-aos="fade-left" >
                        <button className="btn-login">Gửi yêu cầu</button>
                    </div>
                    <img src="images/background/big-circle.png" className="decor" />
                </div>
                
            </div>
        </React.Fragment>
    )
}

export default forgotPassword
