import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { useFormik } from "formik";
import { useSelector } from 'react-redux'
import { Link, useNavigate } from "react-router-dom"

import "./style.scss"
// antd
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

import { ExclamationCircleOutlined, MenuOutlined, BackwardOutlined, PlusOutlined, ClearOutlined, DeliveredProcedureOutlined, TagsOutlined, CloudUploadOutlined  } from '@ant-design/icons';

//API
import NewsAPI from '../../../api/news/news.api'
import AttachAPI from '../../../api/attachment/attachment.api'
////
import openNotification from "../../../components/CNotification";
import CTextEditor from "../../../components/CTextEditor";
import { setRefresh } from "../../../redux/controllers/app/appSlice";
import { useDispatchRoot, useSelectorRoot } from "../../../redux/store";
import { StatusPost } from '../../../common/enum/shared.enum'
import { Stack, Typography } from '@mui/material';
const { TextArea } = Input;



const NewsEditorPage = () => {
    const [dataEditor, setDataEditor] = useState();
    const [dataNews, setDataNews] = useState([]);
    const [cateList, setCateList] = useState([]);
    const [dateSelected, setDataSelected] = useState('')
    const { refresh } = useSelectorRoot((state) => state.app);
    const [loading, setLoading] = useState(false);
    const [loadingEditor, setLoadingEditor] = useState(false);
    const { userID, username } = useSelector((state) => state.login)
    const [ dataTitle, setDataTitle ] = useState('')
    const dispatch = useDispatchRoot();
    const [fileList, setFileList] = useState(null);

    const navigate = useNavigate()
    const { confirm } = Modal;



    const [files, setFiles] = useState([]);

    const handleAttachedChange = (e) => {
        const selectedFiles = e.target.files;
        setFiles([...files, ...selectedFiles]);
        
    };

    const removeAttached = (index) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
        
    };


    //Lấy dữ liệu tất cả tin tức
    useEffect(() => {
        const fecthData = async () => {
        await NewsAPI.getAllNews().then((res) => {
            //Loại bỏ element đầu tiên khỏi mảng
            res.data.shift()
            setDataNews(res.data);
        });
        };
        fecthData();
    }, [dispatch, refresh]);



    //Lấy dữ liệu thể loại
    useEffect(() => {
        const fecthData = async () => {
        await NewsAPI.getCategory().then((res) => {
            setCateList(res.data);
        });
        };
        fecthData();
    }, [dispatch, refresh]);


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



    const handleSaveContent = async (data, currentStatus) => {
        const dataNews = {
            userID: userID,
            title: data.title,
            category: dateSelected,
            content: dataEditor,
            image: fileList,
            description: data.description,
            updated_by: username,
            status: currentStatus
        }

        if (dataNews) {
            try {
                const newsResponse = await NewsAPI.createOne(dataNews);
                
                if (files.length > 0) {
                    await AttachAPI.attach({
                        attached: files,
                        nid: newsResponse.data.nid
                    });
                }
        
                openNotification("success", '', newsResponse.data.message);
                dispatch(setRefresh());
            } catch (error) {
                openNotification("error", '', error.response.data.message);
            }
        }
    }

    const handleFile = (e) => {
        setFileList(e.target.files[0]);
    };

    const handleChangeSelect = (value) => {
        setDataSelected(value)
      };

    // const handleNavigate = async () => {
    //     navigate('/dashboard/preview', { state: { content: dataEditor, title: dataTitle } })
    // }


    const initialValues = {
        title: '',
        category: '',
        content: '',
        description: ''
    };

    const { values, errors, handleChange, handleSubmit, touched } = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit: (data) => {
            handleSaveContent(data, StatusPost.PROCESSING)
        },
    });

    return (
        <>
            <Helmet>
                <title> Trang biên soạn </title>
            </Helmet>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <h5>Phần biên soạn</h5>
                <Link to={-1} style={{ textDecoration: 'none'}}> 
                <Button variant="contained" >   
                    <BackwardOutlined style={{ verticalAlign: 'middle', marginBottom: 3 }} /> Trở về
                </Button> 
                </Link>
                
            </Stack>
            <form onSubmit={handleSubmit}>
                <div className="mt-3">
                    <Input placeholder="Tên tiêu đề" className="customInput"
                        size="large" name="title" value={values.title} onChange={e => {
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
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={
                        cateList.map((item) => ({
                            value: item.cid,
                            label: item.cname,
                        }))
                    }
                    onChange={handleChangeSelect}
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
                    <Input type="text" className="customInput" value={fileList?.name} size="large" placeholder="Chọn ảnh cho tin tức" readOnly />
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

                {/* Chọn file đính kèm */}
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
                    <Button
                            type="primary" 
                            htmlType="submit" 
                            style={{backgroundColor: '#088395'}}
                            className="d-flex align-items-center" 
                            >
                        <CloudUploadOutlined /> Lưu
                    </Button>
                    <Button
                            type="primary"
                            style={{backgroundColor: '#E25E3E'}}
                            className="d-flex align-items-center" 
                            // onClick={() => handleSaveContent(values, StatusPost.PENDING)}
                            onClick={() => showConfirmDialog(values, StatusPost.PENDING)}
                            >
                        <DeliveredProcedureOutlined /> Chuyển
                    </Button>
                    <Button type="primary" className="d-flex align-items-center" style={{backgroundColor: '#4F709C'}} onClick={() => setDataEditor('')}>
                        <ClearOutlined /> Refresh
                    </Button> 
                </div>
            </form>
        </>
    )
}

export default NewsEditorPage
