import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import './index.css'
import { getTotalVisits } from '../../hooks/useVisitsCounter';

const Footer = () => {

    const [totalVisits, setTotalVisits] = useState(0);

    useEffect(() => {
        const fetchTotalVisits = async () => {
          const visits = await getTotalVisits();
          setTotalVisits(visits);
        };
    
        fetchTotalVisits();
      }, []);

    return (
        <>
        {/* <footer style={{ backgroundColor: '#4477CE'}}> */}
        {/* <footer style={{ backgroundColor: 'rgb(13, 71, 161)'}}> */}
        <footer>
            <div className='footer__container' >
                <div className="content__footer">
                    {/* <div className="branch_area">
                        <h5 className="branch__name">Trung tâm Công nghệ thông Tin <br/> và Truyền thông Bạc Liêu </h5>
                    </div> */}
                    <div className="profile">
                        <div className="footer-info-company-name">
                            <h3>
                                TRANG ĐOÀN KHỐI CÁC CƠ QUAN TỈNH BẠC LIÊU
                                <br />
                            </h3>
                        </div>
                        <div className="desc__area">
                            <p>
                                <i className="fa-solid fa-location-dot"></i>
                                <span style={{ paddingLeft: '10px'}}>Số 02, Nguyễn Tất Thành, phường 1, thành phố Bạc Liêu, tỉnh Bạc Liêu</span>
                            </p>
                            <p>
                                <i className="fa-solid fa-phone"></i>
                                <span style={{ paddingLeft: '10px'}}> +02913.953.979</span>
                            </p>
                            <p>
                                <i className="fa-solid fa-at"></i>
                                <span style={{ paddingLeft: '10px'}}><Link to="mailto:doankhoibl@gmail.com" className="footer-links" > doankhoibl@gmail.com</Link></span>
                            </p>
                            <p>
                                <i className="fa-solid fa-address-card"></i>
                                <span style={{ paddingLeft: '10px'}}>Chịu trách nhiệm chính: Ông Phạm Văn Tiến - Giám Đốc Trung tâm</span>
                            </p>
                        </div>
                        <div className="social__media">
                            <Link to='https://www.facebook.com/profile.php?id=61556980841452' className="social__links" target="_blank"><i className="fa-brands fa-square-facebook"></i></Link>
                            <Link to='mailto:ttcntttt@baclieu.gov.vn' className="social__links"><i className="fa-solid fa-envelope"></i></Link>
                            <Link to='#' className="social__links"><i className="fa-brands fa-youtube"></i></Link>
                            <Link to='#' className="social__links"><i className="fa-brands fa-instagram"></i></Link>
                       
                        </div>
                    </div>
                    {/* API các dịch vụ */}
                    <div className="service__area">
                        <ul className="service__header">
                            <li className="service__name">Giới thiệu</li>
                            <li><Link to="#" className="footer-links">Tóm tắt lịch sử Đoàn khối</Link></li>
                            <li><Link to="#" className="footer-links">Cơ cấu tổ chức</Link></li>
                            <li><Link to="#" className="footer-links">Chức năng và nhiệm vụ</Link></li>
                        </ul>
                    {/* Thể loại tin tức */}
                        {/* <ul className="service__header">
                            <li className="service__name">Sự kiện</li>
                            <li><Link to="#" className="footer-links"> Chuyển đổi số </Link></li>
                            <li><Link to="#" className="footer-links"> </Link></li>
                            <li><Link to="#" className="footer-links"> </Link></li>
                            <li><Link to="#" className="footer-links"> </Link></li>
                        </ul> */}
                        <ul className="service__header">
                            <li className="service__name">Hoạt động</li>
                            <li><Link to="#" className="footer-links">Hoạt động đoàn khối</Link></li>
                            <li><Link to="#" className="footer-links">Cơ sở đoàn trực thuộc</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
        <div className="footer-section d-flex">
            <div className="copyright">
                Công trình chào mừng ĐH chi đoàn Sở TTTT lần thứ 1, nhiệm kỳ 2024 - 2027
            </div>
            <div className="access">
                Lượt truy cập: {totalVisits.visits}
            </div>

        </div> 

        </>
    )
}

export default Footer
