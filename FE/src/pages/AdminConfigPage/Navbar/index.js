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
import './ModalCreateItem'
import './style.scss'
import ModalCreateItem from "./ModalCreateItem";
import ModalUpdateItem from "./ModalUpdateItemNavbar";
import NavbarAPI from "../../../api/outline/navbar.api";



const { confirm } = Modal;



const ConfigNavbar = () => {

    const [dataTable, setDataTable] = useState([]);
    const [passer, setPasser] = useState(null)
    const [visibleModalCreateItem, setVisibleModalCreateItem] = useState(false);
    const [visibleModalUpdateItem, setVisibleModalUpdateItem] = useState(false)

    const dispatch = useDispatchRoot();
    const { refresh } = useSelector((state) => state.app);
    const navigate = useNavigate();


    const showDeleteConfirm = (Id) => {
      confirm({
        title: `Xác thực hành động!`,
        icon: <ExclamationCircleOutlined />,
        content: `Bạn có muốn xóa item này ? `,
        okText: "Xoá",
        okType: "danger",
        cancelText: "Đóng",
        async onOk() {
          await NavbarAPI.delete(Id).then((res) => {
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
      await NavbarAPI.getAll().then((res) => {
          setDataTable(res.data);
      });
      };
      fecthData();
    }, [dispatch, refresh]);


    const columns = [
        {
          title: "Tiêu đề",
          dataIndex: "name",
          width: '10%'
        },
        {
          title: "Đường dẫn",
          dataIndex: "url",
          width: '10%'
        },
        {
          title: "Thứ tự",
          dataIndex: "orderID",
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
                    onClick={() => {
                      setPasser(record)
                      setVisibleModalUpdateItem(true)
                    }}
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
            <title> Thiết kế - Navbar </title>
        </Helmet>

        <Container maxWidth="xl">
            <Card title="Navbar" extra={
              <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setVisibleModalCreateItem(true)}
                  style={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: '#088395',
              }}
              >
                  Tạo mới
              </Button>   
            } bordered={false}>
                <Table columns={columns} dataSource={rows} className="table-striped-rows" bordered />
            </Card>
        </Container>
        {visibleModalCreateItem && (
        <ModalCreateItem
          visible={visibleModalCreateItem}
          setVisible={setVisibleModalCreateItem}
          title="Tạo mới tiêu đề"
        />
        )}


        {visibleModalUpdateItem && (
        <ModalUpdateItem
          visible={visibleModalUpdateItem}
          setVisible={setVisibleModalUpdateItem}
          title="Cập nhật nội dung"
          passer={passer}
        />
        )}

        </React.Fragment>
    )
}

export default ConfigNavbar
