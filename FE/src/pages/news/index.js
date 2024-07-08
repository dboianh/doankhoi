import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./new.css";
import Input from "@mui/material/Input";
import Footer from "../../components/Footer/index";
import { useSelector } from "react-redux";
import NewsAPI from "../../api/news/news.api";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatchRoot } from "../../redux/store";
import moment from 'moment';
import slugify from 'slugify';
import removeAccents from 'remove-accents';
import { Pagination, Empty } from 'antd';
import SearchBar from './Searchbar'

const New = () => {

  const [newsData, setNewsData] = useState([])
  const dispatch = useDispatchRoot();
  const { refresh } = useSelector((state) => state.app);
  const { nid, name } = useParams();
  const navigate = useNavigate();


  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const [filteredNews, setFilteredNews] = useState([]); // Dùng để lưu tin tức sau khi tìm kiếm
  const currentNewsData = filteredNews.slice(startIndex, endIndex);


  const handleSearch = (searchText) => {
    // Ví dụ: Tìm kiếm dựa trên tiêu đề
    const filteredNews = newsData.filter((news) =>
      news.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredNews(filteredNews);
    setCurrentPage(1);
  };



  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleShowSizeChange = (current, pageSize) => {
    setCurrentPage(1);
    setItemsPerPage(pageSize);
  };

  //===============



  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await NewsAPI.getByCategory(nid);
        setNewsData(res.data);
        setFilteredNews(res.data); // Hiển thị toàn bộ tin tức ban đầu

      } catch (error) {
        console.error(error);
        navigate('/');
      }
    };
    fetchData();
  }, [nid, navigate]);


  const handleLinkClick = (e, newsId) => {
    e.preventDefault();

    NewsAPI.increaseView(newsId)
      .then(() => {
        navigate(`/tintuc/${newsId}`)
      });
  }

  



  // useEffect(() => {
  //   const fetchData = async () => {
  //     await NewsAPI.getAllNews().then((res) => setNewsData(res.data));
  //   };
  //   fetchData();
  // }, [dispatch, refresh]);


  return (
    <React.Fragment>
      <Navbar />
      <div className="container-fluid newsletter">
        <div className="row">
        {/* {currentNewsData.length > 0 ? <SearchBar onSearch={handleSearch} /> : ''} */}
        <SearchBar onSearch={handleSearch} />

          {currentNewsData.length > 0 ? 
            currentNewsData.map((data, index) => (
              <div className="col-lg-3 col-md-6 col-sm-12 mb-5" key={index}>
                <div className="card h-100">
                  <div className="image-container">
                    {data.image ? (
                      <img
                        src={`${import.meta.env.VITE_API_URL}/uploads/${data.image}`}
                      />
  
                    ) : (
                      <img
                        src="/images/background/no-image.jpg"
                      />
                    )}
                  </div>
                  <div className="card-body">
                    <h5 className="card-title" href="/tintuc/id">
                      {data.title}
                    </h5>
                    <p className="card-text text-muted">{data.description}</p>
                    <p className="card-text"><small className="text-muted">Ngày đăng: {moment(data.date).format("DD-MM-YYYY")} | {data.views} lượt xem</small></p>
  
                  </div>
                  <div className="card-footer bg-transparent border-0 text-center mb-3">
                    <a
                      className="text-decoration-none text-muted"
                      // href={`/tintuc/${nid}/${name}/${data.news_id}`}
                      onClick={(e) => handleLinkClick(e, data.news_id)}
                    >
                      <button className="btn btn-primary">Xem thêm</button>
                    </a>
                  </div>
                  
                </div>
              
              </div>
  
            ))
          : (
            <Empty className="mb-5" description={'Không tìm thấy dữ liệu'} />
          )}
          {
            currentNewsData.length > 0 ? (
              <div className="pagination-container">
                <Pagination
                  current={currentPage}
                  total={newsData.length}
                  pageSize={itemsPerPage}
                  onChange={handlePageChange}
                  onShowSizeChange={handleShowSizeChange} 
                  showSizeChanger={true}
                  pageSizeOptions={['8', '16', '32', '48']} // Danh sách tùy chọn kích thước trang
                />
              </div>
            ) : ""
          }
          
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default New;
