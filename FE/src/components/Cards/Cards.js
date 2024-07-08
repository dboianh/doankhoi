import React, { useState, useEffect } from "react";
import CardItem from "./CardItem";
import "./Cards.css";
import ServiceAPI from "../../api/service/service.api";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Cards = () => {
  const [serviceList, setServiceList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await ServiceAPI.getAllService().then((res) => {
        setServiceList(res.data);
      });
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="center wow fadeInDown">
        <h2 className="serv-title">Dịch vụ của chúng tôi</h2>
        <p style={{ borderBottom: "3px solid red", width: "200px", margin: "0px auto 1px auto"}}></p>
      </div>

      <div className="container-fluid">
        <div className="row1">
          {serviceList.map((data, index) => (
            <div
              className="col-lg-3 col-md-3 col-xs-12 text-center mb-3 "
              id="pddichvu"
              key={index}
            >
              <Link
                to={`/dich-vu`}
                style={{color: 'black', textDecoration: 'none'}}
              >
                <div className="bottom-dichvu p-3">
                  <div className="dichvu">
                    <img
                      className="cards__item__img"
                      alt="Event"
                      src={`${import.meta.env.VITE_API_URL}/uploads/${data.img_url}`}
                    />
                  </div>
                  <div style={{ fontSize: '22px', color: '#1f7cc1'}}>
                    {data.service_name}
                  </div>
                  <p className="cards__text">{data.description}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cards;
