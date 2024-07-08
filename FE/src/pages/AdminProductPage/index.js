import { Link } from 'react-router-dom';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LinkOutlined,
  CaretDownOutlined,
  CaretUpOutlined
} from "@ant-design/icons";

import {
  Button,
  Table,
  Modal,
  Input,
  Space,
  Form,
  theme,
  Row,
  Col,
  Divider
} from "antd";
import React, { useEffect, useState } from "react";
import ProductAPI from "../../api/product/product.api";
import { useDispatchRoot } from "../../redux/store";
import { setRefresh } from "../../redux/controllers/app/appSlice";
import { useSelector } from "react-redux";
import openNotification from "../../components/CNotification";
import { Helmet } from "react-helmet-async";
import {
  Card,
  Stack,
  Container,
  Typography,
} from "@mui/material";
import "./style.scss";

// components
import ModalUpdateProduct from './ModalUpdateProduct'

const { confirm } = Modal;

const AdminProductPage = () => {
  const [dataTable, setDataTable] = useState([]);
  const dispatch = useDispatchRoot();
  const { refresh } = useSelector((state) => state.app);
  const [fileList, setFileList] = useState(null);
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [expand, setExpand] = useState(false);
  const [visibleModalUpdate, setVisibleModalUpdate] = useState(false);
  const [pid, setPid] = useState('')


  const formStyle = {
    maxWidth: "none",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: '24px',
    marginBottom: 30,
  };

  const onFinish = (values) => {
        const data = {
            portal_name: values.portalName,
            image: fileList,
            website_url: values.websiteURL,
        }

        if(data) {
            ProductAPI.create(data).then((res) => {
                openNotification("success", '', res.data.message)
                dispatch(setRefresh())
                form.resetFields(); 
                setFileList('')
            }).catch((err) => {
                openNotification("error", '', err.response.data.message)
            })
        }
    };

  useEffect(() => {
    const fetchData = async () => {
      await ProductAPI.getAll().then((res) => setDataTable(res.data));
    };
    fetchData();
  }, [dispatch, refresh]);

  const showDeleteConfirm = (Id) => {
    confirm({
      title: `Xác thực hành động!`,
      icon: <ExclamationCircleOutlined />,
      content: `Bạn muốn xóa sản phẩm? `,
      okText: "Xoá",
      okType: "danger",
      cancelText: "Đóng",
      async onOk() {
        await ProductAPI.delete(Id).then((res) => {
          openNotification("success", "", res.data.message);
          dispatch(setRefresh());
        });
      },
      onCancel() {},
    });
  };

  const handleFile = (e) => {
    setFileList(e.target.files[0]);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      width: "6%",
      render: (text, record, index) => index + 1, // Sử dụng index + 1 để in ra thứ tự
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      width: "16%",
      render: (record) => {
        return (
          <>
            {typeof record === "string" ? (
              <img
                className="image-cell"
                src={`${import.meta.env.VITE_API_URL}/uploads/${record}`}
                alt="photoURL"
              />
            ) : (
              <img alt="photoURL" />
            )}
          </>
        );
      },
    },
    {
      title: "Mô tả",
      dataIndex: "portal_name",
    },
    {
      title: "Đường liên kết",
      dataIndex: "website_url",
      width: 250,
      render: (record) => (
        <Link to={`${record}`} target="_blank">{record}</Link>
      )
    },
    {
      title: "Thao tác",
      dataIndex: "operation",
      width: "12%",
      render: (_, record, index) => {
        return (
            <div className="d-flex align-items-center">
              <Button
                type="primary"
                size="small"
                className="d-flex align-items-center justify-content-center mx-2"
                onClick={() => {
                  setPid(record)
                  setVisibleModalUpdate(true);
                }}
              >
                <EditOutlined />
              </Button>
              <Button
                type="primary"
                size="small"
                className="d-flex align-items-center justify-content-center mx-2"
                danger
                onClick={() => showDeleteConfirm(record.portal_id)}
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
        <title>Quản lý sản phẩm </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
        >
          <Typography variant="h6" gutterBottom>
            Quản lý sản phẩm
          </Typography>
          <Button
            // type="primary"
            className="d-flex align-items-center"
            onClick={() => setExpand(!expand)}
          >
            {expand ? <CaretUpOutlined /> : <CaretDownOutlined />} Tạo mới
          </Button>
        </Stack>
        <Divider />
        {expand ? (
            <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            form={form}
            style={formStyle}
            onFinish={onFinish}
            
            >
            <Row gutter={16}>
                <Col span={12}>
                <Form.Item label="Mô tả" name="portalName">
                    <Input placeholder="Nhập chi tiết mô tả" required/>
                </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item label="Đường liên kết" name="websiteURL">
                    <Input addonAfter={<LinkOutlined />} placeholder="Chọn đường liên kết" required />
                </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item label="Ảnh đại diện" name="avatar">
                    <div className="d-flex align-items-center gap-2">
                    <Input
                        type="text"
                        value={fileList?.name}
                        placeholder="Chọn ảnh cho sản phẩm"
                        readOnly
                        required
                    />
                    <Button>
                        <label htmlFor="dataFile">Chọn ảnh</label>
                        <input
                        type="file"
                        name="dataFile"
                        id="dataFile"
                        onChange={(e) => handleFile(e)}
                        hidden
                        />
                    </Button>
                    </div>
                </Form.Item>
                </Col>
            </Row>

            <div style={{ textAlign: "right" }}>
                <Space>
                <Button type="primary" htmlType="submit" style={{ backgroundColor: '#3AA6B9'}}>
                    Thêm
                </Button>
                <Button
                    type="primary"
                    style={{backgroundColor: '#9BABB8'}}
                    onClick={() => {
                    form.resetFields();
                    setFileList('')
                    }}
                >
                    Làm mới
                </Button>
                </Space>
            </div>
            </Form>

        ) : ""}
        <Card>
          <Table columns={columns} dataSource={rows} bordered />
        </Card>
      </Container>
      {visibleModalUpdate && (
        <ModalUpdateProduct
          title="CẬP NHẬT SẢN PHẨM"
          visible={visibleModalUpdate}
          setVisible={setVisibleModalUpdate}
          pid={pid}
        />
      )}
    </React.Fragment>
  );
};

export default AdminProductPage;
