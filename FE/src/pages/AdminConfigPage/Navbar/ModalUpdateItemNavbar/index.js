import { DialogActions } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import Modal from '../../../../components/CModal'
import { Form, Input, Button, Switch, InputNumber } from "antd";
import openNotification from '../../../../components/CNotification'
import { useDispatchRoot } from '../../../../redux/store'
import { useSelector } from 'react-redux'
import { setRefresh } from "../../../../redux/controllers/app/appSlice"
import NavbarAPI from '../../../../api/outline/navbar.api'
import React, { useState, useEffect} from 'react'

const ModalUpdateItem = ({
    visible,
    setVisible,
    title,
    passer
}) => {

    const { handleSubmit, control } = useForm();
    const dispatch = useDispatchRoot();
    const [display, setDisplay] = useState(1)
    const handleClose = () => {
      setVisible(false);
    };
    
    const handleUpdateItemNav = async (data) => {

      console.log(data)

      const item = {
          name: data.name,
          url: data.url,
          orderID: data.orderID,
          is_active: data.is_active,
      }

      if(item) {
          await NavbarAPI.update(passer.id, data).then((res) => {
              openNotification("success", '', res.data.message)
              dispatch(setRefresh())
              setVisible(false)
          }).catch((err) => {
              openNotification("error", '', err.response.data.message)
              setVisible(false)
          })
      }
  }

    // const formItemStyle = {
    //     width: "50%",
    //   };


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
                onFinish={handleSubmit(handleUpdateItemNav)}
            >
            <Form.Item label="Tiêu đề">
            <Controller
              name="name"
              defaultValue={passer.name}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Nhập tiêu đề..."
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
          <Form.Item label="Liên kết">
            <Controller
              name="url"
              defaultValue={passer.url}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                    placeholder="Nhập đường liên kết"
                    onChange={(value) => {
                    onChange(value);
                  }}
                  size="large"
                  value={value}
                  required
                  style={{ width: "100%" }}
                  className="customInput"

                />
              )}
            />
          </Form.Item>
          <Form.Item label="Thứ tự">
          <Controller
              name="orderID"
              defaultValue={passer.orderID}
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputNumber
                // placeholder="Chọn chỉ mục số thứ tự"
                min={1}
                max={10}
                style={{ width: "100%" }}
                onChange={(value) => {
                  onChange(value);
                }}
                value={value}
              />
              )}
            />
          </Form.Item>
          <Form.Item 
            label="Hiển thị" 
          >
            <Controller
              name="is_active"
              control={control}
              defaultValue={passer ? passer.is_active : 0}
              render={({ field: { onChange, value } }) => (
                <Switch checked={value} onChange={(checked) => {
                  onChange(checked ? 1 : 0); // Cập nhật giá trị trong Controller
                  setDisplay(checked ? 1 : 0); // Cập nhật giá trị ngoài form
                }}  />
              )}
            />
            
          </Form.Item>
          
          <DialogActions>
            <Button onClick={() => handleClose()} variant="outlined">Đóng</Button>
            <Button type="primary" size="medium" htmlType="submit">Thay đổi</Button>
          </DialogActions>
        </Form>
      }
    
        
        />
    )
}

export default ModalUpdateItem
