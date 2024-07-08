import React, {useState, useEffect} from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import WebPotals from "./WebPotals";
import ProductAPI from '../../api/product/product.api'
import "./index.css";
import { useDispatchRoot } from "../../redux/store";
import { useSelector } from "react-redux";


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
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const CarouselPortal = () => {
  const [dataList, setDataList] = useState([])
  const dispatch = useDispatchRoot();
  const { refresh } = useSelector((state) => state.app);

  const portal = dataList.map((item, index) => (
    <div className="slide-item" key={index}>
      <WebPotals url={`${import.meta.env.VITE_API_URL}/uploads/${item.image}`} link={item.website_url} />
      <div className="slide-overlay" title={item.portal_name}>{item.portal_name}</div>
    </div>
  ));
  
  

  useEffect(() => {
    const fetchData = async () => {
      await ProductAPI.getAll().then((res) => setDataList(res.data));
    };
    fetchData();
  }, [dispatch, refresh]);



  return (
    <React.Fragment>
      <div className="portal-container">
        <div className="center wow fadeInDown">
          <h2>Sản phẩm tiêu biểu</h2>
          <p
            style={{
              borderBottom: "3px solid red",
              width: "200px",
              margin: "0px auto 1px auto",
            }}
          >
          </p>
        </div>

        <div className="carousel-wrapper">
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={3000}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            customTransition="all 1s"
            transitionDuration={1000}
            swipeable={true}
            ssr={true} // means to render carousel on server-side.

          >
            
            {portal}
          </Carousel>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CarouselPortal;
