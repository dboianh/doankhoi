import React, { useEffect, useRef, useState } from "react";
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/index'
import './services.css'
import ServiceAPI from '../../api/service/service.api'
import { setRefresh } from "../../redux/controllers/app/appSlice";
import { useDispatchRoot } from "../../redux/store";
import { useSelector } from 'react-redux'






const Service = () => {
    const dispatch = useDispatchRoot();
    const { refresh } = useSelector((state) => state.app);
    const [data, setData] = useState([])


    useEffect(() => {
        const fetchData = async () => {
          await ServiceAPI.getAllService().then((res) => setData(res.data));
        };
        fetchData();
    }, [dispatch, refresh]);

    
    return (
        <React.Fragment>
            < Navbar />
            <div className="container" style={{ paddingBottom: '50px' }}>
                <div className="d-flex flex-column mt-5">
                    {data.map((item, index) => (
                        <div key={index} className="row p-2 mt-5 border-bottom">
                            <div className="col-md-7 order-md-1 order-2">
                                <h3 className="font-weight-bold">
                                    {item.service_name}
                                </h3>
                                <p className="mt-3 lh-lg" style={{textAlign: 'justify'}}>
                                    {item.description}
                                </p>
                            </div>
                            <div className="col-md-5 order-md-2 order-1">
                                <img
                                    src={`${import.meta.env.VITE_API_URL}/uploads/${item.img_url}`}
                                    alt="photoURL"
                                    className="img-fluid"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            < Footer />
        </React.Fragment>
    )
}

export default Service;
