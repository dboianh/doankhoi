import React, {useEffect, useState} from 'react'
import { DialogActions } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import Modal from '../../../components/CModal'
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { DatePicker, Form, Input, Select, Button } from "antd";
import UserAPI from '../../../api/user/user.api'
import openNotification from '../../../components/CNotification'
import { useDispatchRoot, useSelectorRoot } from '../../../redux/store'
import { useSelector } from 'react-redux'
import { setRefresh } from "../../../redux/controllers/app/appSlice"
import './style.scss'

const ModalCreateAccount = ({
    visible,
    setVisible,
    title,
    roleList
}) => {

    const { handleSubmit, control } = useForm();
    const dispatch = useDispatchRoot();
    const [dateSelected, setDataSelected] = useState('')
    // const [roleList, setRoleList] = useState([]);
    const { refresh } = useSelectorRoot((state) => state.app);

    const onChange = (value) => {
      setDataSelected(value)
    };
  

    // useEffect(() => {
    //   const fetchData = async () => {
    //   await UserAPI.getRoles().then((res) => {
    //       setRoleList(res.data);
    //   });
    //   };
    //   fetchData();
    // }, [dispatch, refresh]);
    

    const handleClose = () => {
        setVisible(false);
    };

    const handleCreateAccount = async (data) => {
        const dataAccount = {
            username: data.username,
            email: data.email,
            password: data.password,
            roleID: dateSelected,
        }
        if(dataAccount) {
            await UserAPI.createAccountUser(dataAccount).then((res) => {
                openNotification("success", '', res.data.message)
                dispatch(setRefresh())
                setVisible(false)
            }).catch((err) => {
                openNotification("error", '', err.response.data.message)
                setVisible(false)
            })
        }
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
    

    return (
      
        <Modal
            title={title}
            visible={visible}
            setVisible={setVisible}
            // width="sm"
            content = {
            <Form
                labelCol={{span: 4}}
                wrapperCol={{ span: 19 }}
                layout="horizontal"
                onFinish={handleSubmit(handleCreateAccount)}
            >
            <Form.Item label="Họ tên">
            <Controller
              name="username"
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
                  className="customInput"
                />
              )}
            />
          </Form.Item>
          <Form.Item label="Email">
            <Controller
              name="email"
              defaultValue={""}
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
          <Form.Item label="Mật khẩu">
            <Controller
              name="password"
              defaultValue={""}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input.Password
                  onChange={(value) => {
                    onChange(value);
                  }}
                  size="large"
                  value={value}
                  required
                  style={{ width: "100%" }}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              )}
            />
          </Form.Item>
          <Form.Item name="role" label="Vai trò" rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}>
              <Select
                onChange={(value) => {
                  onChange(value);
                }}
                allowClear
                size="large"
                placeholder="Chọn quyền người dùng..."
              >
                {renderSelect(roleList)}
              </Select>
          </Form.Item>
          <DialogActions>
            <Button onClick={() => handleClose()} variant="outlined">Đóng</Button>
            <Button type="primary" size="medium" htmlType="submit">Tạo tài khoản</Button>
          </DialogActions>
        </Form>
      }
    
        
        />
    )
}

export default ModalCreateAccount
