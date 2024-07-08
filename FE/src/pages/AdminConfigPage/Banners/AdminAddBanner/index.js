import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet-async";
import {
  Button,
  Divider,
  Card,
  Col,
  Row,
  Modal,
  Input,
  Dropdown,
  Menu,
  Form,
  theme,
  Space,
  InputNumber,
  Switch,
  Image,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Stack, Container, Typography, IconButton } from "@mui/material";


import {
  PlusSquareOutlined,
  LeftOutlined,
  SaveOutlined,
} from "@ant-design/icons";
//component
import openNotification from "../../../../components/CNotification";
import { setRefresh } from "../../../../redux/controllers/app/appSlice";
import { useDispatchRoot } from "../../../../redux/store";
import { useSelector } from "react-redux";
import BannerAPI from '../../../../api/outline/banner.api'
import Iconify from "../../../../components/iconify";

const { confirm } = Modal;
const { TextArea } = Input;





const AdminAddBanner = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatchRoot();
  const { refresh } = useSelector((state) => state.app);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState(null);
  const [image, setImage] = useState(null);
  const [display, setDisplay] = useState(1)

  const formStyle = {
    maxWidth: "none",
    padding: "24px 0px",
  };

  const formItemStyle = {
    width: "50%",
  };

  const onFinish = async (values) => {
    
    const data = {
      order_index: values.order,
      image: fileList,
      is_active: display,
      link_url: values.websiteURL
    }
    

    try {
      // Kiểm tra trùng order_index trước khi tạo banner
      const is_duplicate = await BannerAPI.check(data.order_index);

      if (is_duplicate.data) {
        openNotification("warning", '', "Số chỉ mục đã tồn tại.");
      } else {
        // Gọi API tạo banner nếu không trùng
        const createBannerResponse = await BannerAPI.create(data);
  
        openNotification("success", '', createBannerResponse.data.message);
        dispatch(setRefresh());
        form.resetFields();
        setFileList('');
        setImage('');
      }
    } catch (error) {
      openNotification("error", '', error.response.data.message);
    }
    

  };

  const handleFile = (e) => {
    setFileList(e.target.files[0]);
  };


  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFileList(event.target.files[0]);
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <React.Fragment>
      <Helmet>
        <title> Thiết kế - Banner </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6">Thêm Banner</Typography>
        </Stack>
        <Divider />
        <Form
          form={form}
          onFinish={onFinish}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Form.Item
            label="View order"
            name="order"
            rules={[{ required: true, message: "Please input your order!" }]}
            style={formItemStyle}
          >
            <InputNumber
              placeholder="Chọn chỉ mục số thứ tự"
              min={1}
              max={10}
              style={{ width: 500 }}
            />
          </Form.Item>

          <Form.Item
            label="Đường liên kết"
            name="websiteURL"
            style={formItemStyle}
          >
            <Input placeholder="Chọn đường liên kết" style={{ width: 500 }}/>
          </Form.Item>

          <Form.Item label="Hiển thị" name="display" style={formItemStyle}>
            <Switch checked={display === 1} defaultChecked onChange={(checked) => setDisplay(checked ? 1 : 0)} />
          </Form.Item>
          <Form.Item label="Ảnh banner" name="image" style={formItemStyle} rules={[{ required: true, message: "Please upload your image!" }]}>
            <label htmlFor="upload-btn">
              <input
                accept="image/*"
                id="upload-btn"
                name="image"
                type="file"
                style={{ display: "none" }}
                onChange={onImageChange}
              />
              {image ? (
                <Image
                  src={image}
                  alt="Selected Image"
                  preview={false}
                  width={500}
                  height={200}
                />
              ) : (
                <Image
                  src="error"
                  fallback="data:image/png;base64,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"
                  preview={false}
                  width={150}
                />
              )}
              {/* {image && <Image src={image} alt="Selected Image" preview={false} />} */}
            </label>
          </Form.Item>
          <Divider />
          <Form.Item>
            <Space>
              <Link to="/dashboard/config/banners" style={{ textDecoration: 'none'}}> 
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#9BABB8",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <LeftOutlined />
                  Back
                </Button> 
              </Link>
              
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  backgroundColor: "#3AA6B9",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <SaveOutlined />
                Save
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Container>
    </React.Fragment>
  );
};

export default AdminAddBanner;
