import React from 'react'
import './style.scss'


const Partnership = () => {

    const partnerImages = [
        '/images/logo/cusc.png',
        '/images/logo/viettel.png',
        '/images/logo/vnpt.png',
        '/images/logo/vnpt.png',
        '/images/logo/vnpt.png',
        '/images/logo/vnpt.png',
    ];


    return (
        <div className="partnership-container">
            <div className="center wow fadeInDown">
                <h2 className="serv-title">Đối tác tiêu biểu</h2>
                <div className="divider"></div>
            </div>
            <section className="partner-list">
            <div className="image-column">
                {/* Phần cột hình ảnh */}
                {/* <img src="/images/background/hoptac.png" alt="Collab Image" /> */}
            </div>
            <div className="ul-column">
                {/* Danh sách UL các ảnh đối tác */}
                <ul className="partner-list-items">
                    {partnerImages.map((image, index) => (
                        <li key={index} className="partner-item" data-aos="fade-up" data-aos-duration="3000" >
                            <img src={image} alt={`Partner ${index + 1}`}/>
                        </li>
                    ))}
                </ul>
            </div>
                {/* <ul className="partner-list-items">
                    {partnerImages.map((image, index) => (
                        <li key={index} className="partner-item">
                            <img src={image} alt={`Partner ${index + 1}`} />
                        </li>
                    ))}
                </ul> */}
            </section>
        </div>
    )
}

export default Partnership
