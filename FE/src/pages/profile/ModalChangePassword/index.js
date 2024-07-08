import { useState } from "react";
import {DialogActions } from "@mui/material";
import Modal from '../../../components/CModal'
import UserAPI from '../../../api/user/user.api'
import { Form, Input, Select, Button, Typography } from "antd";
import openNotification from '../../../components/CNotification'
import { setRefresh } from '../../../redux/controllers/app/appSlice'
import { useDispatchRoot } from '../../../redux/store'
import { useSelector } from 'react-redux'
import { Controller, useForm } from "react-hook-form";

const { Title } = Typography;



const ModalChangePassword = ({
    visible,
    setVisible,
    title,
    uid
}) => {
    const {handleSubmit, control} = useForm();
    const dispatch = useDispatchRoot()
    const [dataUser, setDataUser] = useState({})
    const { userID, username, email } = useSelector((state) => state.user)

    const handleClose = () => {
        setVisible(false)
    }
    

    const handleChangePassword = async (data) => {
      const dataAccount = {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
          confirmPassword: data.confirmPassword,
      }


      if(dataAccount) {
        await UserAPI.changePassword(uid, dataAccount)
        .then((res) => {
            openNotification("success", "", res.data.message)
            dispatch(setRefresh())
            setVisible(false)
        }).catch((err) => {
            openNotification('error', "", err.response.data.message)
            setVisible(false)
        })
      }

    }
    return (
        <Modal
            title={title}
            visible={visible}
            setVisible={setVisible}
            // width="lg"
            content = {
            <Form
                layout="vertical"
                onFinish={handleSubmit(handleChangePassword)}
            >
            <p><strong>Lưu ý: </strong>Mật khẩu bao gồm chữ kèm theo số hoặc ký tự đặc biệt, tối thiểu 8 ký tự trở lên và tối đa 32 ký tự</p>
            <Form.Item label="Mật khẩu cũ">
            <Controller
              name="oldPassword"
              defaultValue={""}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  onChange={(value) => {
                    onChange(value);
                  }}
                  size="large"
                  required
                  value={value}
                  style={{ width: "100%" }}
                  type="password"
                  placeholder="Mật khẩu hiện tại"
                />
              )}
            />
          </Form.Item>
          <Form.Item label="Mật khẩu mới"
            >
            <Controller
              name="newPassword"
              defaultValue={""}
              control={control}
              
              render={({ field: { onChange, value } }) => (
                <Input
                  onChange={(value) => {
                    onChange(value);
                  }}
                  size="large"
                  value={value}
                  style={{ width: "100%" }}
                  type="password"
                  placeholder="Mật khẩu mới"
                  required
                />
              )}
            />
          </Form.Item>
          <Form.Item label="Nhập lại mật khẩu mới">
            <Controller
              name="confirmPassword"
              defaultValue={""}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  onChange={(value) => {
                    onChange(value);
                  }}
                  size="large"
                  value={value}
                  style={{ width: "100%" }}
                  type="password"
                  placeholder="Nhập lại mật khẩu mới"
                  required
                />
              )}
            />
          </Form.Item>
          <DialogActions>
            <Button onClick={() => handleClose()} variant="outlined">Đóng</Button>
            <Button type="primary" size="medium" htmlType="submit">Cập nhập</Button>
          </DialogActions>
        </Form>
      }
    
        
        />
    )
}

export default ModalChangePassword
