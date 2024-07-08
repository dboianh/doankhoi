import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
import BannerAPI from "../../../../api/outline/banner.api";
import Iconify from "../../../../components/iconify";
import BannerSection from "../../../../components/BannerSection/BannerSection";

const { confirm } = Modal;
const { TextArea } = Input;

const AdminUpdateBanner = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatchRoot();
  const { refresh } = useSelector((state) => state.app);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState(null);
  const [image, setImage] = useState(null);
  const [display, setDisplay] = useState(1);
  const [dataList, setDataList] = useState("");
  const { id } = useParams();

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
      link_url: values.websiteURL,
      is_active: values.display,
      image: fileList,
    };

    if (data) {
      try {
        await BannerAPI.update(id, data)
        .then((res) => {
            openNotification("success", "", res.data.message);
            dispatch(setRefresh());
        })
        .catch((err) => {
            openNotification("warning", "", err.response.data.message);
        });

      } catch (error) {
        openNotification("error", "", error.response.data.message);
      }
    }
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFileList(event.target.files[0]);
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await BannerAPI.getOne(id);
        const bannerData = response.data;

        form.setFieldsValue({
          order: bannerData.order_index,
          websiteURL: bannerData.link_url,
          display: bannerData.is_active,
        });
        setDataList(bannerData);
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    };

    fetchData();
  }, [form, id]);

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
          <Typography variant="h6">Cập nhật Banner</Typography>
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
            <Input placeholder="Chọn đường liên kết" style={{ width: 500 }} />
          </Form.Item>

          <Form.Item
            label="Hiển thị"
            name="display"
            style={formItemStyle}
            initialValue={dataList ? dataList.is_active : 0}
            valuePropName="checked"
            getValueFromEvent={(checked) => (checked ? 1 : 0)}
          >
            <Switch onChange={(checked) => setDisplay(checked ? 1 : 0)} />
          </Form.Item>

          <Form.Item label="Ảnh banner" name="image" style={formItemStyle}>
            <label htmlFor="upload-btn">
              <input
                accept="image/*"
                id="upload-btn"
                name="image"
                type="file"
                style={{ display: "none" }}
                onChange={onImageChange}
              />
              <Image
                src={
                  image === null
                    ? typeof dataList.image_url === "string"
                      ? `${import.meta.env.VITE_API_URL}/uploads/${dataList.image_url}`
                      : ""
                    : image
                }
                alt="Selected Image"
                preview={false}
                width={500}
                height={200}
              />
              {/* {image && <Image src={image} alt="Selected Image" preview={false} />} */}
            </label>
          </Form.Item>

          <Divider />
          <Form.Item>
            <Space>
              <Link
                to="/dashboard/config/banners"
                style={{ textDecoration: "none" }}
              >
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

export default AdminUpdateBanner;
