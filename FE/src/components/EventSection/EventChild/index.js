import React, { useEffect, useState } from 'react'
import './style.scss'
import { useDispatchRoot } from "../../../redux/store";
import { useSelector } from "react-redux";
import NewsAPI from "../../../api/news/news.api";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
};


const EventChild = (item, bg) => {
    
    const [newsData, setNewsData] = useState([])
    const dispatch = useDispatchRoot();
    const { refresh } = useSelector((state) => state.app);
    const navigate = useNavigate();
    const [showArrows, setShowArrows] = useState(false);


    // const handleMouseEnter = () => {
    //     setShowArrows(true);
    //   };
    
    //   const handleMouseLeave = () => {
    //     setShowArrows(false);
    //   };
    
    
    useEffect(() => {
        const fetchData = async () => {
            await NewsAPI.getByCategory(item.data.cid).then((res) => setNewsData(res.data));
        };
        fetchData();
    }, [dispatch, refresh]);
    
    
    const handleLinkClick = (e, newsId) => {
        
        NewsAPI.increaseView(newsId)
        .then(() => {
            navigate(`/tintuc/${newsId}`)
        });
    }
    
    const sub_news = newsData.map((data, index) => (
        <div className="slide-item" key={index}>
            <div className="subnews_card">
                <img src={`${import.meta.env.VITE_API_URL}/uploads/${data.image}`} alt={data.title} loading="lazy" />
            </div>
            <h3>
                <Link onClick={(e) => handleLinkClick(e, data.news_id)} itemProp="url">{data.title}</Link>
            </h3>
        </div>
    ));


    return (
        <section className="wrapper_event" style={{ backgroundColor: `${bg}`}}>
            <section className="branch-event container-fluid">
                <div className="block-head">
                    <h4 className="heading">{item.data.cname}</h4>
                </div>
                <div className="flex-container">
                    {
                        newsData.slice(0, 3).map((data, key) => (
                            <div className="article" key={key}>
                                <Link className="article-img-wrap" onClick={(e) => handleLinkClick(e, data.news_id)}>
                                    <img src={`${import.meta.env.VITE_API_URL}/uploads/${data.image}`} alt={data.title} loading="lazy" />
                                </Link>
                                <div className="article-info-wrap">
                                    <h3>
                                        <Link onClick={(e) => handleLinkClick(e, data.news_id)} itemProp="url">{data.title}</Link>
                                    </h3>
                                    <div className="article-introtext">
                                        {data.description}
                                    </div>
                                    <Link className="readmore" onClick={(e) => handleLinkClick(e, data.news_id)}>Xem thêm</Link>
                                </div>
                            </div>

                        ))
                    }
                </div>
                <Carousel
                    responsive={responsive}
                    infinite={true}
                    autoPlay={3000}
                    autoPlaySpeed={3000}
                    keyBoardControl={true}
                    customTransition="all 1s"
                    transitionDuration={1000}
                    swipeable={false}
                    ssr={true} // means to render carousel on server-side.
                    // arrows={showArrows}
                    // onMouseEnter={handleMouseEnter}
                    // onMouseLeave={handleMouseLeave}

                >
                    
                    {sub_news}
                </Carousel>
            </section>
        </section>
    )
}

export default EventChild
