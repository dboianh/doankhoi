import { useEffect, useState } from 'react'
import { useFormik } from "formik";
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';

import {
    Alert,
    Button,
    Input,
    Modal,
    Popover,
    Result,
    Select,
    Spin,
    Tooltip,
    Tree,
    Space,
    Tag
  } from "antd";
import { MenuOutlined, 
        BackwardOutlined, 
        EyeOutlined, 
        CloudUploadOutlined, 
        DeliveredProcedureOutlined, 
        ClearOutlined, 
        PlusOutlined, 
        TagsOutlined,
        ExclamationCircleOutlined
    } from '@ant-design/icons';
import NewsAPI from '../../../api/news/news.api'
import openNotification from "../../../components/CNotification";
import CTextEditor from "../../../components/CTextEditor";
import { setRefresh } from "../../../redux/controllers/app/appSlice";
import { useDispatchRoot, useSelectorRoot } from "../../../redux/store";
import { Stack, Typography } from '@mui/material';
import AttachAPI from '../../../api/attachment/attachment.api';
import { StatusPost } from '../../../common/enum/shared.enum'

const { TextArea } = Input;



const UpdateEditorPage = () => {
    const [dataEditor, setDataEditor] = useState();
    const [dataFromDb, setDataFromDb] = useState([])
    const { refresh } = useSelectorRoot((state) => state.app);
    const [loading, setLoading] = useState(false);
    const [loadingEditor, setLoadingEditor] = useState(false);
    const { userID, username } = useSelector((state) => state.login)
    const [ dataTitle, setDataTitle ] = useState('')
    const [fileList, setFileList] = useState(null);
    const [cateList, setCateList] = useState([]);
    const [dateSelected, setDataSelected] = useState(null)
    const [files, setFiles] = useState([]);


    const dispatch = useDispatchRoot();
    const params = useParams()

    const news_id = params.id

    const { confirm } = Modal;



    const showConfirmDialog = (value, status) => {
        confirm({
          title: `Xác thực hành động!`,
          icon: <ExclamationCircleOutlined />,
          content: `Bạn muốn chuyển tin tức đi để phê duyệt ?`,
          okText: "Đồng ý",
          okType: "primary",
          cancelText: "Đóng",
          async onOk() {
            handleSaveContent(value, status)
          },
          onCancel() {}
        });
      };


    //API get content
    useEffect(() => {
        const fetchData = async () => {
            await NewsAPI.findOne(news_id).then((res) => {
                setDataFromDb(res.data)
                setDataEditor(res.data.content)
                setDataSelected(res.data.category)
            })
        };
        fetchData();
    }, [dispatch, refresh])

    
    //Lấy dữ liệu thể loại
    useEffect(() => {
        const fetchData = async () => {
        await NewsAPI.getCategory().then((res) => {
            setCateList(res.data);
        });
        };
        fetchData();
    }, [dispatch, refresh]);


    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
          setFileList(event.target.files[0])
        }
    };

    const handleChangeSelect = (value) => {
    setDataSelected(value)
    };





    //handle save 
    const handleSaveContent = async (data, currentStatus) => {

        const dataNews = {
            title: data.title,
            category: dateSelected,
            content: dataEditor,
            image: fileList,
            updated_by: username,
            description: data.description,
            status: currentStatus
        }


        if(dataNews) {
            try {
                if (files.length > 0) {
                    await AttachAPI.update(news_id, files);
                }

                await NewsAPI.update(news_id, dataNews).then((res) => {
                    openNotification("success", '', res.data.message)
                    dispatch(setRefresh())
                }).catch((err) => {
                    openNotification("error", '', err.response.data.message)    
                })
                
            } catch (error) {
                openNotification("error", '', error.response.data.message);
            }
            
        }
    }
    //handle Upload file
    const handleFile = (e) => {
        setFileList(e.target.files[0]);
    };



    //HANDLE ATTACHMENT

    const handleAttachedChange = (e) => {
        const selectedFiles = e.target.files;
        setFiles([...files, ...selectedFiles]);
        
    };

    const removeAttached = (index) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
        
    };

    //


    const initialValues = {
        title: dataFromDb.title,
        content: dataFromDb.content,
        image: dataFromDb.image,
        description: dataFromDb.description
    };

    const { values, errors, handleChange, handleSubmit, touched } = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit: (data) => {
            handleSaveContent(data, dataFromDb.status)
        },
    });

    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <h5>{dataFromDb.title}</h5>
                <Button variant="contained" >    
                    <Link to={-1} style={{ textDecoration: 'none'}}><BackwardOutlined style={{ verticalAlign: 'middle', marginRight: 3 }} /> Trở về</Link>
                </Button> 
            </Stack>
            <form onSubmit={handleSubmit}>
                <div className="mt-3">
                    <Input placeholder="Tên tiêu đề" 
                        size="large" name="title" className="customInput" value={values.title} onChange={e => {
                            handleChange(e)
                            setDataTitle(e.target.value)
                        }} 
                    />
                </div>
                <div className="mt-3">
                    <Select
                        showSearch
                        style={{ width: '100%' }}
                        size="large"
                        placeholder="Chọn thể loại"
                        value={dateSelected}
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        onChange={handleChangeSelect}
                        options={
                            cateList.map((item) => ({
                                value: item.cid,
                                label: item.cname,
                            }))
                        }   
                    />
                    
                </div>
                <div className="mt-3">
                    <TextArea
                    rows={4}
                    autoSize={{ minRows: 5, maxRows: 5 }}
                    placeholder="Nhập mô tả cho tin tức..."
                    size="large"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    className="customInput"

                    />
                </div>
                <div className="mt-3 d-flex align-items-center">
                    {/* <Input type="text" value={values.image} size="large" placeholder="Chọn ảnh cho tin tức" readOnly /> */}
                    <Input type="text" className="customInput" value={fileList?.name} size="large" placeholder="Thay đổi ảnh mới cho tin tức" readOnly />
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
                <div className="mt-3">
                    <CTextEditor
                    setValue={setDataEditor}
                    defaultValue={dataEditor}
                    dataEditor={dataEditor}
                    loading={loadingEditor}
                    />
                </div>


                <div className="d-flex align-items-center mt-3 custom-file-upload p-3">
                    {/* <div className="custom-file-upload"> */}
                    <div className="col-3 with-divider">
                        <Button type="default">
                            <label htmlFor="file-input">
                            <PlusOutlined style={{verticalAlign: 'middle'}}  /> Chọn file đính kèm
                            </label>
                            <input
                                key={files.length}
                                id="file-input"
                                type="file"
                                multiple
                                onChange={handleAttachedChange}
                                hidden
                            />
                        </Button>
                    </div>
                    <div className="col-9">
                        <div className="file-list">
                            {files.map((file, index) => (          
                                <Tag
                                    key={index}
                                    closable
                                    onClose={() => removeAttached(index)}
                                    style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        padding: '5px 15px', 
                                        marginTop: index > 0 ? '15px' : '0' }}
                                    >
                                    <span style={{ fontSize: '14px', flex: 1 }}><TagsOutlined style={{marginRight: 5}}/> {file.name}</span>
                                </Tag>
                            ))}
                        </div>
                    </div>
                        {/* </div> */}
                </div>

                <div className="d-flex my-5 algin-align-items-center justify-content-end gap-3">
                    {/* <div className="d-flex"> */}
                        <Button
                            htmlType="submit"
                            className="d-flex align-items-center" 
                            type="primary"
                            style={{backgroundColor: '#088395'}}
                            >
                            <CloudUploadOutlined/> lưu
                        </Button>
                        {(dataFromDb.status === StatusPost.PROCESSING || dataFromDb.status === StatusPost.REJECT) && (
                            <Button
                                type="primary"
                                style={{ backgroundColor: '#CE5959' }}
                                className="d-flex align-items-center" 
                                onClick={() => showConfirmDialog(values, StatusPost.PENDING)}
                            >
                                <DeliveredProcedureOutlined /> Chuyển
                            </Button>
                        )}
                        {/* <Button
                            type="primary"
                            style={{backgroundColor: '#CE5959'}}
                            className="d-flex align-items-center" 
                            onClick={() => handleSaveContent(values, StatusPost.PENDING)}
                            // disabled={StatusPost.PENDING === dataFromDb.status}
                            >
                            <DeliveredProcedureOutlined /> Chuyển
                        </Button> */}
                        <Link
                            to={`/preview/${news_id}`}
                            target="_blank"
                            className='text-decoration-none'
                        >          
                            <Button
                            type="primary"
                            className="d-flex align-items-center justify-content-center"
                            style={{backgroundColor: '#277BC0'}}

                            >
                                <EyeOutlined /> Xem
                            </Button>
                        </Link>
                        
                        
                    {/* </div> */}
                    <Button type="primary" className="d-flex align-items-center" style={{backgroundColor: '#4F709C'}} onClick={() => setDataEditor('')}>
                        <ClearOutlined /> Refresh
                    </Button> 
                </div>
                
            </form>
        </>
    )
}

export default UpdateEditorPage
