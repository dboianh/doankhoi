import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";
import NewsAPI from "../../api/news/news.api";
import NavbarAPI from "../../api/outline/navbar.api";
import { useDispatchRoot } from "../../redux/store";
import { setRefresh } from "../../redux/controllers/app/appSlice";
import { useSelector } from "react-redux";
import slugify from "slugify";
import removeAccents from "remove-accents";
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import { useMediaQuery } from '@mui/material';
import { Input, Space } from 'antd';
import { CateTypeEnum } from '../../common/enum/shared.enum'




const Navbar = () => {
  const [click, setClick] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleClick = () => setClick(!click);

  const closeMenuList = () => setClick(false);

  const [intro, setIntro] = useState([]);

  const [activities, setActivities] = useState([]);

  const [childClick, setChildClick] = useState(false)


  const { refresh } = useSelector((state) => state.app);
  // const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [active, setActive] = useState(false)
  // const [searchResults, setSearchResults] = useState([]);
  // const [isHeaderFixed, setIsHeaderFixed] = useState(false);

  const location = useLocation();
  
  const dispatch = useDispatchRoot();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [introData, activitiesData] = await Promise.all([
          NavbarAPI.getById(CateTypeEnum.GIOI_THIEU),
          NavbarAPI.getById(CateTypeEnum.TIN_HOAT_DONG)
        ])
        setIntro(introData.data);
        setActivities(activitiesData.data);
  
      } catch (error) {
          console.error('Error fetching data:', error);
      }
    }
    
    fetchData();
  }, []); 


  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollPosition = window.scrollY;
  //     if (scrollPosition > 0) {
  //       setIsHeaderFixed(true);
  //     } else {
  //       setIsHeaderFixed(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
  


  const handleSearch = () => {
    console.log('Searching for:', searchText);

    const searchResult = []; 
    setSearchResults(searchResult);
  };



  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  };

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const onSearch = (value, _e, info) => console.log(info?.source, value);



  


  return (
    <>
      <header id="header">
        <div className="top-bar">
          <div className="container-fluid">
            <div className="row align-items-center">
            <div className="col-md-6">
              <div className="navbarlogo d-flex align-items-center ml-5">
                <img src="/images/logo/logo.png" alt="Logo" />
                {/* <img src="/images/logo/logo1.png" alt="Logo" /> */}
                {/* <img src="/images/logo/logo2.png" alt="Logo" /> */}
                <div className="text-header">
                  {/* <div className="header-text">Trang   thông tin điện tử</div> */}
                  <div className="header-text2">
                    TRANG THÔNG TIN ĐIỆN TỬ <br/>ĐOÀN KHỐI CÁC CƠ QUAN TỈNH BẠC LIÊU
                  </div>
                </div>
              </div>
            </div>
              <div className="col-md-6 text-center">
                <div className="tieude">
                  <img src="/images/background/header.png" className="img-fluid" alt="Header Image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header id="header1">
        <div className="top-bar">
          <div className="container1">
            <nav className="navbar navbar-inverse">
              {/* <div className="container navbar-container justify-content-between">
                <div className="navbar-header d-flex justify-content-between align-items-center">
                  <a className="navbar-brand navbar-toggle" href="#">
                    <img src="/images/logo/logo.png" alt="Logo" />
                  </a>
                  <button
                    type="button"
                    className="navbar-toggle"
                    data-toggle="collapse"
                    data-target=".navbar-collapse"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                </div> */}
              <div className="container navbar-container justify-content-end">
                <div className="navbar-header">   
                  <NavLink className="navbar-brand" to="/">
                    <div className="logo-container">
                      <img src="/images/logo/logo.png" alt="Logo" />
                      <span className="logo-text">ĐOÀN KHỐI CÁC CƠ QUẢN TỈNH BẠC LIÊU</span>
                    </div>
                    
                  </NavLink>
                  <button
                    type="button"
                    className="navbar-toggle"
                    data-toggle="collapse"
                    data-target=".navbar-collapse"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                </div>

                <div className="collapse navbar-collapse">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/">
                        TRANG CHỦ
                      </NavLink>
                    </li>
                    <li className="dropdown nav-item">
                      <NavLink 
                        className={`dropdown-toggle ${location.pathname.includes(`/gioithieu`) ? 'nav-link' : ''}`}
                        data-toggle="dropdown"
                        >
                        GIỚI THIỆU
                      </NavLink>
                      <ul className="dropdown-menu">
                        
                        {intro.map((item, index) => {
                          // const nameIsRemovedAccents = removeAccents(
                          //   item.cname
                          // );

                          // const slug = slugify(nameIsRemovedAccents, {
                          //   replacement: "-",
                          //   lower: true,
                          // });

                          return (
                            <li key={index}>
                              <Link
                                className="dropdown-item"
                                to={`/gioithieu/${item.news_ids}`}
                                // onClick={() => setChildClick(true)}
                              >
                                {item.cname}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                    
                    {/* <li className="nav-item">
                      <NavLink className="nav-link" to="/dich-vu">
                        DỊCH VỤ
                      </NavLink>
                    </li> */}
                    {/* <li className="nav-item">
                      <NavLink className="nav-link" to="/tintuc">
                        TIN HOẠT ĐỘNG
                      </NavLink>
                    </li> */}
                    <li className="dropdown nav-item">
                      <NavLink
                        // to=""
                        className={`dropdown-toggle ${location.pathname.includes(`/tintuc`) ? 'nav-link' : ''}`}
                        data-toggle="dropdown"
                        >
                        TIN HOẠT ĐỘNG
                      </NavLink>{" "}
                      <ul className="dropdown-menu">
                        {activities.map((item, index) => {
                          const nameIsRemovedAccents = removeAccents(
                            item.cname
                          );

                          const slug = slugify(nameIsRemovedAccents, {
                            replacement: "-",
                            lower: true,
                          });
                          return (
                            <li key={index}>
                              <Link
                                className="dropdown-item"
                                to={`/tintuc/${item.cid}/${slug}`}
                                // to={`/tintuc/${item.cid}/${slug}`}
                                onClick={() => setChildClick(true)}
                              >
                                {item.cname}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                    <li className="dropdown nav-item">
                      <NavLink
                        // to=""
                        className={`dropdown-toggle ${location.pathname.includes(`/thu-vien`) ? 'nav-link' : ''}`}
                        data-toggle="dropdown"
                        >
                        THƯ VIỆN
                      </NavLink>
                      <ul className="dropdown-menu">
                        <li>
                          <Link className="dropdown-item" to={`/thu-vien`} onClick={() => setChildClick(true)}>
                            Hình ảnh
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="#">Video</Link>
                        </li>
                      </ul>
                    </li>
                    {/* <li className="nav-item">
                      <NavLink to="/thu-vien" className="nav-link">
                        THƯ VIỆN
                      </NavLink>
                    </li> */}
                    <li className="nav-item">
                      <NavLink to="/van-ban" className="nav-link">
                        VĂN BẢN
                      </NavLink>
                    </li>
                    
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/contact">
                        LIÊN HỆ
                      </NavLink>
                    </li>

                    
                    
                  </ul>
                  {/* <IconButton onClick={() => setActive(!active)} className={`ml-3 ${isSmallScreen ? 'd-none' : ''}`} aria-label="search" style={{color: 'white'}} edge="end">
                    <SearchIcon />
                  </IconButton> */}
                  
                </div>              
              </div>
            </nav>
            {/* {active ? ( */}
            
              <Input.Search
                placeholder="Nhập nội dung tìm kiếm..."
                allowClear
                onSearch={handleSearch}
                prefix={<SearchIcon style={{ fontSize: '21px', color: '#999999' }} />}
                value={searchText}    
                onChange={(e) => setSearchText(e.target.value)}
                className={`custom-search-input ${active ? 'active' : ''}`}
                style={{ position: 'absolute', zIndex: 1}}

              />
             {/* ) : ""}  */}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
