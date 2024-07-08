import { useState, useEffect } from "react";
import {DialogActions } from "@mui/material";
import Modal from '../../../components/CModal'
import ProductAPI from '../../../api/product/product.api'
import { Form, Input, Button } from "antd";
import openNotification from '../../../components/CNotification'
import { setRefresh } from '../../../redux/controllers/app/appSlice'
import { useDispatchRoot } from '../../../redux/store'
import { useSelector } from 'react-redux'
import { Controller, useForm } from "react-hook-form";


const ModalUpdateProduct = ({
    visible,
    setVisible,
    title,
    pid
}) => {
    const {handleSubmit, control} = useForm();
    const dispatch = useDispatchRoot()
    const [dataList, setDataList] = useState({})
    const { refresh } = useSelector((state) => state.app);
    const [fileList, setFileList] = useState(null)


    //API get content
    useEffect(() => {
        const fetchData = async () => {
            await ProductAPI.getOne(pid.portal_id).then((res) => {
                setDataList(res.data)
            })
        };
        fetchData();
    }, [dispatch, refresh, pid.portal_id])


    const handleClose = () => {
        setVisible(false)
    }

    const handleUpdatePortal = async (data) => {
        const dataList = {
            portal_name: data.pname,
            website_url: data.plink,
            image: fileList
        }

        if (dataList) {
            await ProductAPI.update(pid.portal_id, dataList)
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
                onFinish={handleSubmit(handleUpdatePortal)}
            >
            <Form.Item label="Mô tả">
            <Controller
              name="pname"
              defaultValue={pid.portal_name}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  onChange={(value) => {
                    onChange(value);
                  }}
                  required
                  value={value}
                  style={{ width: "100%" }}
                />
              )}
            />
            </Form.Item>
            <Form.Item label="URL">
                <Controller
                    name="plink"
                    defaultValue={pid.website_url}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Input
                        onChange={(value) => {
                            onChange(value);
                        }}
                        required
                        value={value}
                        style={{ width: "100%" }}
                        placeholder="Chọn đường liên kết"
                    />
                )}
                />
            </Form.Item>
          <Form.Item label="Chọn ảnh"> 
            <div className="d-flex align-items-center gap-2">
                <Input type="text" value={fileList?.name} placeholder="Chọn ảnh đính kèm" readOnly />
                <Button
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
            <Button type="primary" size="medium" htmlType="submit">Cập nhập</Button>
          </DialogActions>
        </Form>
      }
    
        
        />
    )
}

export default ModalUpdateProduct
