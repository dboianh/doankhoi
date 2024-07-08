import { useState } from "react";
import {DialogActions } from "@mui/material";
import Modal from '../../../components/CModal'
import ServiceAPI from '../../../api/service/service.api'
import { Form, Input, Button } from "antd";
import openNotification from '../../../components/CNotification'
import { setRefresh } from '../../../redux/controllers/app/appSlice'
import { useDispatchRoot } from '../../../redux/store'
import { useSelector } from 'react-redux'
import { Controller, useForm } from "react-hook-form";
import TextArea from "antd/es/input/TextArea";


const ModalUpdateService = ({
    visible,
    setVisible,
    title,
    sid
}) => {
    const {handleSubmit, control} = useForm();
    const dispatch = useDispatchRoot()
    const { refresh } = useSelector((state) => state.app);
    const [fileList, setFileList] = useState(null)


    const handleClose = () => {
        setVisible(false)
    }

    const handleUpdateService = async (data) => {
        const dataService = {
            service_name: data.service_name,
            description: data.description,
            image: fileList
        }
        if (dataService) {
            await ServiceAPI.putUpdateServiceById(sid.service_id, dataService)
            .then((res) => {
                openNotification("success", "", res.data.message)
                dispatch(setRefresh())
                setVisible(false)
            }).catch((err) => {
                console.log(err)
                openNotification('error', "", err.response.data.message)
                setVisible(false)
            })
        }
    }

    //handle Upload file
    const handleFile = (e) => {
        setFileList(e.target.files[0]);
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
                onFinish={handleSubmit(handleUpdateService)}
            >
            <Form.Item label="Tên dịch vụ">
            <Controller
              name="service_name"
              defaultValue={sid.service_name}
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
          <Form.Item label="Chọn ảnh"> 
            <div className="d-flex align-items-center">
                <Input type="text" value={fileList?.name} className="customInput" size="large" placeholder="Chọn ảnh đính kèm" readOnly />
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
          <Form.Item label="Mô tả">
            <Controller
              name="description"
              defaultValue={sid.description}
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
          
          <DialogActions>
            <Button onClick={() => handleClose()} variant="outlined">Đóng</Button>
            <Button type="primary" size="medium" htmlType="submit">Cập nhập</Button>
          </DialogActions>
        </Form>
      }
    
        
        />
    )
}

export default ModalUpdateService
