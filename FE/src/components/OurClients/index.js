import React, {useState, useEffect} from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './style.scss'


const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
};

const OurClients = () => {
    const clients = [
        '/images/logo/cusc.png',
        '/images/logo/viettel.png',
        '/images/logo/vnpt.png',
        '/images/logo/vnpt.png',
        '/images/logo/vnpt.png',


    ];

    const clientList = clients.map((item, index) => (
        <div className="slide-item" key={index}>
            <div className="clients-card">
                <img src={item} alt="khach hang" className="clients-image" />
            </div>
        </div>
      ));

    return (
        <>
        <div className="center wow fadeInDown mt-5">
            <h2 className="serv-title">Khách hàng của chúng tôi</h2>
            <div className="divider"></div>
        </div>
        <div className="client-container mt-5">
            <section className="customer-list">
                <div className="carousel-wrapper">
                    <Carousel
                        responsive={responsive}
                        infinite={true}
                        // autoPlay={3000}
                        // autoPlaySpeed={3000}
                        keyBoardControl={true}
                        customTransition="all 1s"
                        transitionDuration={1000}
                        swipeable={true}
                        ssr={true} // means to render carousel on server-side.

                    >
                        
                        {clientList}
                    </Carousel>
                </div>
            </section>
        </div>
        </>
    )
}

export default OurClients
