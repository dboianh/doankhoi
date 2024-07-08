import React, { useEffect, useState } from "react";
import "../../App.css";
import "./BannerSection.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import BannerAPI from '../../api/outline/banner.api'


const BannerSection = () => {

  const [banners, setBanners] = useState([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);


  useEffect(() => {
    // Function to fetch banners from the API
    const fetchBanners = async () => {
      try {
        const response = await BannerAPI.getAll();
        setBanners(response.data);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };
    fetchBanners();
  }, []);

  return (
    <div>
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          {banners
            .filter((banner) => banner.is_active === 1)
            .map((banner, index) => (
            <li
              key={index}
              data-target="#carouselExampleIndicators"
              data-slide-to={index}
              className={index === activeSlideIndex ? 'active' : ''}
            ></li>
          ))}
        </ol>
        <div className="carousel-inner">
          {banners
            .filter((banner) => banner.is_active === 1)
            .map((banner, index) => (
              <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <img
                  className="d-block w-100 ban"
                  src={`${import.meta.env.VITE_API_URL}/uploads/${banner.image_url}`}
                  alt={`Banner ${index + 1}`}
                />
              </div>
            ))}
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
};

export default BannerSection;
