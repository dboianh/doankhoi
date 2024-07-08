import { useState } from "react";
import {DialogActions } from "@mui/material";
import Modal from '../../../components/CModal'
import UserAPI from '../../../api/user/user.api'
import { Form, Input, Select, Button } from "antd";
import openNotification from '../../../components/CNotification'
import { setRefresh } from '../../../redux/controllers/app/appSlice'
import { useDispatchRoot } from '../../../redux/store'
import { useSelector } from 'react-redux'
import { Controller, useForm } from "react-hook-form";


const ModalUpdateAccount = ({
    visible,
    setVisible,
    title,
    roleList
}) => {
    const {handleSubmit, control} = useForm();
    const dispatch = useDispatchRoot()
    const [dataUser, setDataUser] = useState({})
    const { userID, username, email, roleID } = useSelector((state) => state.user)
    const [dateSelected, setDataSelected] = useState(null)



    const onChange = (value) => {
      setDataSelected(value)
    };


    const handleClose = () => {
        setVisible(false)
    }


    const renderSelect = (data) => {
      return data?.map((item, index) => {
        return (
          <Select.Option value={item.roleID} key={item.roleID}>
            {`${item.roleName}`}
          </Select.Option>
        );
      });
    };

    const handleUpdateAccount = async (data) => {
      const dataAccount = {
          username: data.username,
          email: data.email,
          roleID: dateSelected !== null ? dateSelected : roleID,
          newPassword: data.password,
          confirmPassword: data.confirmPassword
      }

      if(dataAccount.newPassword === dataAccount.confirmPassword) {
        await UserAPI.updateUserById(userID, dataAccount)
        .then((res) => {
            openNotification("success", "", res.data.message)
            dispatch(setRefresh())
            setVisible(false)
        }).catch((err) => {
            console.log(err)
            openNotification('error', "", err.response.data.message)
            setVisible(false)

        })
      } else {
        openNotification("warning", "Mật khẩu xác nhận không khớp", "")
        setVisible(false)
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
                labelCol={{span: 4}}
                wrapperCol={{ span: 19 }}
                layout="horizontal"
                onFinish={handleSubmit(handleUpdateAccount)}
            >
            <Form.Item label="Họ tên">
            <Controller
              name="username"
              defaultValue={username}
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
                  className="customInput"
                />
              )}
            />
          </Form.Item>
          <Form.Item label="Email">
            <Controller
              name="email"
              defaultValue={email}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  onChange={(value) => {
                    onChange(value);
                  }}
                  size="large"
                  value={value}
                  required
                  style={{ width: "100%" }}
                  type="email"
                  className="customInput"
                />
              )}
            />
          </Form.Item>
          <Form.Item name="role" label="Vai trò" initialValue={roleID}>
              <Select
                onChange={(value) => {
                  onChange(value);
                }}
                size="large"
              >
                {renderSelect(roleList)}
              </Select>
          </Form.Item>

          <Form.Item label="Mật khẩu">
            <Controller
              name="password"
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
                  className="customInput"
                />
              )}
            />
          </Form.Item>
          <Form.Item label="Xác nhận">
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
                  className="customInput"
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

export default ModalUpdateAccount
