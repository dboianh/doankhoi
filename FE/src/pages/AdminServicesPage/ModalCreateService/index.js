import { DialogActions } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import Modal from '../../../components/CModal'
import { DatePicker, Form, Input, Select, Button } from "antd";
import ServiceAPI from '../../../api/service/service.api'
import openNotification from '../../../components/CNotification'
import { useDispatchRoot } from '../../../redux/store'
import { useSelector } from 'react-redux'
import { setRefresh } from "../../../redux/controllers/app/appSlice"

import React from 'react'
import TextArea from "antd/es/input/TextArea";

const ModalCreateAccount = ({
    visible,
    setVisible,
    title
}) => {

    const { handleSubmit, control } = useForm();
    const dispatch = useDispatchRoot();
    const [fileList, setFileList] = React.useState(null)

    const handleClose = () => {
        setVisible(false);
    };

    const handleFile = (e) => {
        setFileList(e.target.files[0]);
    };

    const handleCreateService= async (data) => {

        const dataService = {
            service_name: data.serviceName,
            description: data.description,
            image: fileList
        }
         if(dataService) {
            await ServiceAPI.addNewService(dataService).then((res) => {
                openNotification("success", '', res.data.message)
                dispatch(setRefresh())
                setVisible(false)
            }).catch((err) => {
                openNotification("error", '', err.response.data.message)
            })
        }
    }

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
                onFinish={handleSubmit(handleCreateService)}
            >
            <Form.Item label="Tên dịch vụ">
            <Controller
              name="serviceName"
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
          <Form.Item label="Mô tả">
            <Controller
              name="description"
              defaultValue={""}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextArea
                    rows={4}
                    autoSize={{ minRows: 5, maxRows: 5 }}
                    placeholder="Nhập mô tả cho dịch vụ..."
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
          <Form.Item label="Chọn ảnh"> 
          <div className="d-flex align-items-center">
            <Input type="text" value={fileList?.name} size="large" placeholder="Chọn ảnh đính kèm" className="customInput" readOnly />
            <Button
                size="large"
                style={{borderRadius: '0px'}}
            >
                <label htmlFor="dataFile" >Chọn ảnh</label>
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
          
          <DialogActions>
            <Button onClick={() => handleClose()} variant="outlined">Đóng</Button>
            <Button type="primary" size="medium" htmlType="submit">Thêm dịch vụ</Button>
          </DialogActions>
        </Form>
      }
    
        
        />
    )
}

export default ModalCreateAccount
