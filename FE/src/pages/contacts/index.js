import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/index";
// import "../../App.css";
import "./css/index.css";
import "./css/main.css";
import "./css/t.css";
import "./css/Cards.css";
import "./css/createcss.css";
import "./css/animate.min.css";
import "./css/responsive.css";
import "./css/envent.css";
import "./css/Navbar.css";
import "./css/prettyPhoto.css";
import './style.scss'

import { Link } from "react-router-dom";
import { AutoComplete, Button, Col, Form, Input, InputNumber, Row } from "antd";
// import "./js/jquery.js";
import ContactAPI from "../../api/contact/contact.api";
import openNotification from "../../components/CNotification";

const { TextArea } = Input;

const Contact = () => {
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const [form] = Form.useForm();
  const [isVerified, setIsVerified] = useState(false);
  const [captcha, setCaptcha] = useState(""); // CAPTCHA được tạo ra
  const [userCaptcha, setUserCaptcha] = useState(""); // CAPTCHA được người dùng nhập


  const onFinish = (values) => {
      ContactAPI.write(values)
        .then((res) => {
          openNotification("success", "", res.data.message);
          // setUserCaptcha('')
          // generateCaptcha()
          form.resetFields();
        })
        .catch((err) => {
          openNotification("error", "", err.response.data.message);
        });
    // if (userCaptcha === captcha) {
      
    // } else {
    //   openNotification("error", "", 'Mã captcha không hợp lệ');
    // }
  };

  function handleRecaptcha(response) {
    console.log(response)
    if (response) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  }

  useEffect(() => {
    // Tạo CAPTCHA mặc định ở đây, ví dụ:
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    const captchaLength = 6;

    for (let i = 0; i < captchaLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      captcha += characters.charAt(randomIndex);
    }

    setCaptcha(captcha);
  }, []);


  const generateCaptcha = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    const captchaLength = 6;

    for (let i = 0; i < captchaLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      captcha += characters.charAt(randomIndex);
    }

    setCaptcha(captcha);
  };




  return (
    <React.Fragment>
      <Navbar />
      <div className="wrapper-contact">
        <div className="row">
          <div className="col-6">
            <h1 className="contact text-center mt-3">Thông tin góp ý</h1>

            {/* <div class="container2"> */}
            <Form
              form={form}
              name="register"
              onFinish={onFinish}
              style={{ padding: "0 30px", maxWidth: 600 }}
              scrollToFirstError
              size="large"
              labelCol={{ span: 5 }}
            >
              <Form.Item
                name="fullname"
                label="Người gởi"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng cung cấp họ tên!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item name="address" label="Địa chỉ">
                <TextArea
                  rows={2}
                  autoSize={{ minRows: 2, maxRows: 2 }}
                  placeholder=""
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: "email",
                    message: "Email không hợp lệ!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng cung cấp số điện thoại của bạn!",
                  },
                ]}
              >
                <Input
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>

              <Form.Item
                name="message"
                label="Nội dung"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng cung cấp thông tin góp ý",
                  },
                ]}
              >
                <TextArea
                  rows={4}
                  autoSize={{ minRows: 5, maxRows: 5 }}
                  placeholder="Nhập nội dung góp ý"
                  size="large"
                  name="description"
                />
              </Form.Item>
              {/* <Form.Item label=" " colon={false}>
                  <div className="d-flex align-items-center">
                  <Input
                    value={userCaptcha}
                    onChange={(e) => {
                      setUserCaptcha(e.target.value)
                      handleRecaptcha(e)
                    }}
                    name="captcha"
                    placeholder="Nhập mã captcha..."
                    
                  />
                  <Input type="text" value={captcha} className="mx-2 generated-captcha" readOnly></Input> 
                </div>
              </Form.Item> */}
              <Form.Item label=" " colon={false}>
                <Button
                  type="primary"
                  htmlType="submit"
                  // disabled={!isVerified}
                  style={{ fontSize: '15px', padding: '0 25px'}}
                >
                  Gởi góp ý
                </Button>
              </Form.Item>
            </Form>
          </div>

          <div className="col-6 map mt-2">
            <h3 className="text-center"> ĐOÀN KHỐI CÁC CƠ QUAN TỈNH BẠC LIÊU </h3>
            <p className="kc">
              <i className="fa-solid fa-truck"></i>
              <span style={{ paddingLeft: " 10px" }}>
                Số 02, Nguyễn Tất Thành, phường 1, thành phố Bạc Liêu, tỉnh Bạc Liêu
              </span>
            </p>
            <p className="kc">
              <i className="fa-solid fa-phone"></i>

              <span style={{ paddingLeft: "10px" }}> +02913.953.979</span>
            </p>
            <p className="kc">
              <i className="fa-solid fa-envelope"></i>
              <span style={{ paddingLeft: "10px" }}>
                <Link to="mailto:doankhoibl@gmail.com" style={{ textDecoration: 'none', color: '#828282'}}>
                  {" "}
                  doankhoibl@gmail.com
                </Link>
              </span>
            </p>

            <iframe
              className="map1"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3937.4720438644626!2d105.72094187314741!3d9.291373984830567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a1096ffd62b587%3A0xfb4ec581be73fcf0!2zMiBELiBOZ3V54buFbiBU4bqldCBUaMOgbmgsIFBoxrDhu51uZyA3LCBC4bqhYyBMacOqdSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1711333005969!5m2!1svi!2s"
              width="650"
              height="450"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Contact;
