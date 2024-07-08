import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { Button, Divider, Card, Col, Row, Modal, Input, Dropdown, Menu, Table } from "antd";
import { Stack, Container, Typography, IconButton } from "@mui/material";
import { PlusOutlined } from "@ant-design/icons";
import { DeleteOutlined, EditOutlined, CheckOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import BannerAPI from '../../../api/outline/banner.api'
import { setRefresh } from "../../../redux/controllers/app/appSlice";
import { useDispatchRoot } from "../../../redux/store";
import { useSelector } from "react-redux";
import openNotification from "../../../components/CNotification";

import './style.scss'



const { confirm } = Modal;



const ConfigBanners = () => {

    const [dataTable, setDataTable] = useState([]);
    const dispatch = useDispatchRoot();
    const { refresh } = useSelector((state) => state.app);
    const navigate = useNavigate();

    

    const showDeleteConfirm = (Id) => {
      confirm({
        title: `Xác thực hành động!`,
        icon: <ExclamationCircleOutlined />,
        content: `Bạn có muốn xóa banner này ? `,
        okText: "Xoá",
        okType: "danger",
        cancelText: "Đóng",
        async onOk() {
          await BannerAPI.delete(Id).then((res) => {
            openNotification('success', "", res.data.message);
            dispatch(setRefresh());
          });
        },
        onCancel() {},
      });
    };


    //Lấy tất cả dữ liệu của banners

    useEffect(() => {
      const fecthData = async () => {
      await BannerAPI.getAll().then((res) => {
          setDataTable(res.data);
      });
      };
      fecthData();
    }, [dispatch, refresh]);


    const columns = [
        {
          title: "",
          dataIndex: "image_url",
          width: "15%",
          render: (record) => {
            return (
              <img
                className="banner_image"
                src={`${import.meta.env.VITE_API_URL}/uploads/${record}`}
                alt="photoURL"
              />
            );
          },
        },
        {
          title: "View order",
          dataIndex: "order_index",
          width: '10%'
        },
        {
          title: "Active",
          dataIndex: "is_active",
          width: '10%',
          render: (record) => record == 1 ? <CheckOutlined style={{ color: "#52c41a"}} /> : ''
        },
        {
          title: "Action",
          dataIndex: "operation",
          width: "15%",
          render: (_, record, index) => {
            return (
                <div className="d-flex align-items-center">
                  <Button
                    type="primary"
                    size="small"
                    className="d-flex align-items-center justify-content-center mx-2"
                    onClick={() => navigate(`/dashboard/config/banners/update/${record.id}`)}
                  >
                    <EditOutlined />
                  </Button>
                  <Button
                    type="primary"
                    size="small"
                    className="d-flex align-items-center justify-content-center mx-2"
                    danger
                    onClick={() => showDeleteConfirm(record.id)}
                  >
                    <DeleteOutlined />
                  </Button>
                </div>
            );
          },
        },
    ];


    const rows = dataTable.map((data, index) => ({
      ...data,
      key: index, // thêm key cho từng hàng
    }));


    return (
    <React.Fragment>
        <Helmet>
            <title> Thiết kế - Banner </title>
        </Helmet>

        <Container maxWidth="xl">
            <Card title="Banners" extra={
                <Link to="/dashboard/config/banners/add" className="text-decoration-none">
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: '#088395',
                    }}
                    >
                        Tạo mới
                    </Button>
                </Link>
                
            } bordered={false}>
                <Table columns={columns} dataSource={rows} className="table-striped-rows" bordered />
            </Card>
        </Container>

        </React.Fragment>
    )
}

export default ConfigBanners
