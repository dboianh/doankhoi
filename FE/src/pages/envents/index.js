import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import NewsAPI from "../../api/news/news.api";
import moment from "moment";
import "moment/locale/vi";
import Navbar from "../../components/Navbar/Navbar";
import Link from "@mui/material/Link";
import Footer from "../../components/Footer/index";
import { setRefresh } from "../../redux/controllers/app/appSlice";
import { useDispatchRoot, useSelectorRoot } from "../../redux/store";
import ApiIcon from "@mui/icons-material/Api";
import "./style.scss";
import AttachmentTag from '../../components/AttachmentTag'

const Envent = () => {
  const [dataNews, setDataNews] = useState([]);
  const [recentNews, setRecentNews] = useState([]);
  const [topNews, setTopNews] = useState([]);
  const { refresh } = useSelectorRoot((state) => state.app);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatchRoot();
  const { nid, name, id } = useParams();

  const navigate = useNavigate();

  const handleLinkClick = (e, newsId) => {
    e.preventDefault();

    NewsAPI.increaseView(newsId)
      .then(() => {
        navigate(`/tintuc/${newsId}`)
        // navigate(`/tintuc/${nid}/${name}/${newsId}`)
      });
  }

  //API get news content
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await NewsAPI.findOne(id);
        setDataNews(res.data);
      } catch (error) {
        console.error(error);
        navigate('/');
      }
    };
    fetchData();
  }, [id, navigate]);

  //API get latest news
  useEffect(() => {
    const fetchData = async () => {
      await NewsAPI.findLatest(id).then((res) => {
        setRecentNews(res.data);
      });
    };
    fetchData();
  }, [dispatch, refresh]);

  //tin tuc duoc xem nhieu nhat

  useEffect(() => {
    const fetchData = async () => {
      await NewsAPI.getMostViewedNews().then((res) => {
        setTopNews(res.data);
      });
    };
    fetchData();
  }, [dispatch, refresh]);

  return (
    <>
      <Navbar />
      <div className="container-fluid news-section">
        <div className="row">
          <div className="col-lg-9 col-md-8 col-sm-12">
            <div className="SectionLayout_section__Sw_xR Individual_hero__QKq_V ">
              <div className="SectionLayout_children_container__3mJWi">
                <div className="suk1">
                  <div className="Breadcrumbs_breadcrumbs__9ol0k Breadcrumbs_black_text__tjhmI">
                    <div className="Breadcrumbs_breadcrumb_item__aYnRD">
                      <a target="" className="block">
                        Tin Tức
                      </a>
                      <svg
                        className="Icon_icon__QfSMz"
                        height="20"
                        viewBox="0 0 658 1024"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                          display: "inline-block",
                          verticalAlign: " middle",
                        }}
                      >
                        <path
                          d="M71.159 1018.149l390.876-965.486h146.286l-390.875 965.486h-146.286z"
                          fill="rgb(215, 33, 52)"
                        ></path>
                      </svg>
                    </div>
                    <div className="SearchPage_breadcrumb_item__GJ3mg">
                      {dataNews.cname}
                    </div>
                  </div>

                  <div className="Individual_post_type__nYidS"></div>
                  <h1 className="news_title">
                    <font style={{ verticalAlign: "inherit" }}></font>
                    {dataNews.title}
                  </h1>
                  <div className="Individual_informations__bEX4Z">
                    <div className="news_date">
                      <div className="Individual_property__z_ZMk">
                        {dataNews.cname}
                      </div>
                      <div className="Individual_text__NT3AW">
                        |{" "}
                        {moment(dataNews.date)
                          .locale("vi")
                          .format("DD/MM/YYYY, HH:mm")}
                        | <span>({dataNews.views} lượt xem)</span>
                      </div>
                    </div>

                    <div>
                      Tác giả:{" "}
                      <span className="author_name"> {dataNews.username}</span>
                    </div>

                    <div className="dividerBeforeContent"></div>
                        <div className="txt_intro">
                          {dataNews.description}
                    </div>
                  </div>
                  <div
                    className="content_area"
                    dangerouslySetInnerHTML={{ __html: dataNews.content }}
                  ></div>
                  { dataNews.content && (
                    <div className="divider"></div>
                  )}
                  {/* <div className="divider"></div> */}
                  {dataNews?.attachments?.map((item, index) => (
                    <AttachmentTag attachment={item} key={index} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-4">
            <div className="right mt-5">
              <div className="flex items-center gap-3 ">
                <div className="Input1" style={{ width: "100%" }}>
                  <div
                    style={{
                      fontFamily: "sans-serif",
                      fontWeight: "bold",
                      fontSize: "18px",
                      color: "#fff",
                      padding: "8px 15px",
                      backgroundColor: "#4477CE",
                    }}
                  >
                    Tin tức gần đây
                  </div>
                  <div className="envent-list">
                    {recentNews.map((data, index) => (
                      <a
                        className="text-decoration-none text-muted"
                        key={index}
                        // href={`/tintuc/${data.news_id}`}
                        onClick={(e) => handleLinkClick(e, data.news_id)}
                      >
                        <div className="event-items pt-3">
                          <div className="thumbnails">
                            {data.image ? (
                              <img
                                className="cards__item__img"
                                src={`${import.meta.env.VITE_API_URL}/uploads/${data.image}`}
                              />
                            ) : (
                              <img
                                className="cards__item__img"
                                src="/images/background/no-image.jpg"
                              />
                            )}
                          </div>
                          <div className="card_details">
                            <div className="card_detail_header">
                              <div className="new1" title={data.cname}>{data.cname}</div>
                            </div>
                            <div className="title" title={data.title}>{data.title}</div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tin xem nhiều */}

            <div className="right mt-5">
              <div className="flex items-center gap-3 ">
                <div className="Input1" style={{ width: "100%" }}>
                  <div
                    style={{
                      fontFamily: "sans-serif",
                      fontWeight: "bold",
                      fontSize: "18px",
                      color: "#fff",
                      padding: "8px 15px",
                      backgroundColor: "#4477CE",
                      verticalAlign: "middle",
                    }}
                  >
                    <ApiIcon fontSize={"small"} /> Tin tức xem nhiều
                  </div>
                  <div className="envent-list">
                    {topNews.map((data, index) => (
                      <a
                        className="text-decoration-none text-muted"
                        key={index}
                        onClick={(e) => handleLinkClick(e, data.news_id)}
                        // href={`/tintuc/${data.news_id}`}
                      >
                        <div className="event-items pt-3">
                          <div className="thumbnails">
                            {data.image ? (
                              <img
                                className="cards__item__img"
                                src={`${import.meta.env.VITE_API_URL}/uploads/${data.image}`}
                              />
                            ) : (
                              <img
                                className="cards__item__img"
                                src="/images/background/no-image.jpg"
                              />
                            )}
                          </div>
                          <div className="card_details">
                            <div className="card_detail_header">
                              <div className="new1" title={data.cname}>{data.cname}</div>
                            </div>
                            <div className="title" title={data.title}>{data.title}</div>
                            <div className="views">{data.views} lượt xem</div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Envent;
