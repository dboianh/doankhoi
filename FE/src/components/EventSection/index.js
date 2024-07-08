import React, { useState, useEffect } from "react";
import './style.scss'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NewsAPI from "../../api/news/news.api";
import moment from 'moment';
import "moment/locale/vi";
import slugify from 'slugify';
import removeAccents from 'remove-accents';
import { Button } from '@mui/material';
import Iconify from '../iconify';
import EventChild from './EventChild'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
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


const EventSection = () => {
  const [postList, setPostList] = useState([]);
  const [announcement, setAnnouncement] = useState([])
  const [isDisplayHome, setIsDisplayHome] = useState([])

  const breakingNews = postList.filter((item, index) => index === 0);
  const navigate = useNavigate();


  const poster = postList.slice(1).map((data, index) => (
    <div className="breaking-news" key={index}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <figure
          className="cards__item__pic-wrap"
          style={{ borderRadius: "10px" }}
        >
          <img
            src={`${import.meta.env.VITE_API_URL}/uploads/${data.image}`}
            alt={data.title}
            className="cards__item__img"
          />
        </figure>
      </Link>
      <Link className="tintuc1" onClick={(e) => handleLinkClick(e, data.category, data.cname, data.news_id)}>
        <p className="header text-justify">
          <strong>{data.title}</strong>
        </p>
        <p className="desc mt-2" style={{ color: '#666666'}}>{data.description}</p>
      </Link>
      <div className="view_details_wrappers">
        <Link to={`/tintuc`} className="view_detailss mt-2">
          <Button size="small" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
            Xem thêm
          </Button>
        </Link>
      </div>
      
    </div>
  ));


  //Lấy tin tức
  useEffect(() => {
    const fetchData = async () => {
      await NewsAPI.getMostViewedNews().then((res) => {
        setPostList(res.data);
      });
    };
    fetchData();
  }, []);

  //Lấy thông báo
  useEffect(() => {
    const fetchData = async () => {
      await NewsAPI.getRecentAnnouncements().then((res) => {
        setAnnouncement(res.data);
      });
    };
    fetchData();
  }, []);

  //Lấy tiêu đề tin tức sẽ hiển thị trên home
  useEffect(() => {
    const fetchData = async () => {
      await NewsAPI.getDisplayHomeTopic().then((res) => {
        setIsDisplayHome(res.data);
      });
    };
    fetchData();
  }, []);


  const handleLinkClick = (e, nid, name, newsId) => {
    // const nameWithoutAccent = removeAccents(name)

    // const slug = slugify(nameWithoutAccent, { replacement: '-', lower: true });

    e.preventDefault();

    NewsAPI.increaseView(newsId)
      .then(() => {
        navigate(`/tintuc/${newsId}`)
        // navigate(`/tintuc/${nid}/${slug}/${newsId}`)
      });
  }

  return (
    <React.Fragment>   
        <div className="center wow fadeInDown mt-4">
          <h2 className="serv-title">Hoạt động nổi bật</h2>
          <p
            style={{
              borderBottom: "3px solid red",
              width: "200px",
              margin: "0px auto 1px auto",
            }}
          ></p>
        </div>

        <div id="event" className="container-fluid">
          <div className="event_wrapper">
            <div className="section_header">
              <h1>Hoạt động</h1>
            </div>
            <div className="section_body">
              <div>
                <Carousel
                      responsive={responsive}
                      infinite={true}
                      autoPlay={3000}
                      autoPlaySpeed={3000}
                      keyBoardControl={true}
                      customTransition="all 0.5s"
                      transitionDuration={1000}
                      swipeable={false}
                      ssr={true} 
                  >
                      
                      {poster}
                  </Carousel>
                  
              </div>
                <div className="events-list">
                  <>
                    {postList.slice(1).map((data, index) => (
                      <div className="event-items mb-2" key={index}>
                      {data.image ? (
                        <div className="thumbnails">
                          <Link to="/">
                            <img
                              src={`${import.meta.env.VITE_API_URL}/uploads/${data.image}`}
                              alt="Event"
                              className="cards__item__img"
                              style={{ borderRadius: "10px" }}
                            />
                          </Link>
                        </div>
                      ) : (
                        // Biểu tượng mũi tên trước nội dung khi không có hình
                        <div className="no-thumbnail mt-1">
                          <i class="fa-solid fa-caret-right"></i>
                        </div>
                      )}

                        <div className="card_detail">
                          <div className="card_detail_header">
                            <div className="card_description">
                              <Link className="text-links" onClick={(e) => handleLinkClick(e, data.category, data.cname, data.news_id)}>
                                  {data.title}
                              </Link>
                            </div>
                            {/* <p className="card-text mb-0"><small className="text-muted mt-5">{moment(data.date).format("HH:mm DD/MM/YYYY")}</small></p> */}
                          </div>
                        </div>
                      
                      </div>
                    ))}
                  </>
                </div>
                <div className="events-list1">
                  <div className="section">
                    <h1>Thông báo</h1>
                  </div>
                  <div className="bg_tintuc" style={{ padding: "10px", paddingBottom: "4%"}}>
                    <div className="marquee-container">
                      <div className="marquee-content">
                        {announcement.map((item, key) => (
                          <div key={key} className="marquee-item">
                            <i className="fa-solid fa-font-awesome"></i>
                            <h6>
                              <Link className="bgtin" onClick={(e) => handleLinkClick(e, item.category, item.cname, item.news_id)} >
                                {item.title} <span className="date">({moment(item.date).format("DD/MM/YYYY")})</span>
                              </Link>
                            </h6>
                          </div>   
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="section">
                    <h1>Ảnh hoạt động</h1>
                  </div>

                  <div
                    className="bg_tintuc"
                    style={{
                      overflow: "hidden",
                      border: "none",
                      paddingBottom: "0px!important",
                    }}
                  >
                    <div
                      id="carouselExampleControls"
                      className="carousel slide"
                      data-bs-ride="carousel"
                    >
                      <div className="carousel-inner" style={{ height: "200px" }}>
                        <div className="carousel-item active">
                          <img
                            src="images/upload/anh1.jpg"
                            className="d-block w-100"
                          />
                        </div>
                        <div className="carousel-item">
                          <img
                            src="images/upload/anh2.jpg"
                            className="d-block w-100"
                          />
                        </div>
                        <div className="carousel-item">
                          <img
                            src="images/upload/anh3.jpg"
                            className="d-block w-100"
                          />
                        </div>
                        <div className="carousel-item">
                          <img
                            src="images/upload/anh4.jpg"
                            className="d-block w-100"
                            alt="..."
                          />
                        </div>
                      </div>
                      <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleControls"
                        data-bs-slide="prev"
                      >
                        <span
                          className="carousel-control-prev-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleControls"
                        data-bs-slide="next"
                      >
                        <span
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </div>
                  </div>
                </div>
              {/* </div> */}
              {/* Put Eventchild here */}
            </div>
          </div>
        </div>

        {
          isDisplayHome.map((item, key) => {
            return (
              <div>
                <EventChild data={item} key={key}/>
                {/* <EventChild data={item} key={key}/> */}
              </div>
            )
          })
        }
        
    </React.Fragment>
  );
};

export default EventSection;
