import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Card,
  Stack,
  Popover,
  Container,
  Typography,
  IconButton,
  ImageList,
  ImageListItem
} from "@mui/material";
import { Alert, Button, Modal, Input, Divider, Col, Row, Image, Space, Menu, Dropdown, Checkbox, Empty } from "antd";
import { useDispatchRoot } from "../../redux/store";
import { useSelector } from "react-redux";
import { setRefresh } from "../../redux/controllers/app/appSlice";
import galleryAPI from "../../api/gallery/gallery.api";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Iconify from '../../components/iconify';
import openNotification from "../../components/CNotification";

import { PrinterOutlined, 
    DownloadOutlined, 
    CloseOutlined, 
    RotateLeftOutlined,
    RotateRightOutlined,
    SwapOutlined,
    ZoomInOutlined,
    ZoomOutOutlined,
    MoreOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import moment from "moment";
import "moment/locale/vi";
import './style.scss'



const AdminAlbumDetailPage = () => {
  const { id } = useParams();
  const [albumData, setAlbumData] = useState("");
  const [deleteMode, setDeleteMode] = useState(false);
  const [fileList, setFileList] = useState([])
  const [selectedImages, setSelectedImages] = useState([]);
  const { refresh } = useSelector((state) => state.app);
  const dispatch = useDispatchRoot();
  const fileInputRef = useRef(null);

  

  //API getAlbumById
  useEffect(() => {
    const fetchData = async () => {
      await galleryAPI.getById(id).then((res) => setAlbumData(res.data));
    };
    fetchData();
  }, [dispatch, refresh]);



  const onDownload = (path, fname, originalname) => {
    const pdfUrl = `${import.meta.env.VITE_API_URL}/${path}/${fname}`;
    
    fetch(pdfUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = originalname;
        document.body.appendChild(link);
        link.click();
        
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      });
    
  };


  const handleFile = (e) => {
    const selectedFiles = e.target.files;

    setFileList(selectedFiles);

    handleUpload(selectedFiles)
  };


  const handleUpload = async (files) => {

    if (files.length > 0) {
      const formData = new FormData();
      
  
      formData.append('id', id);

      // Append each selected file to the FormData object
      for (let i = 0; i < files.length; i++) {
        formData.append('photo', files[i]);
      }
  
      try {
        // Make the API upload request
        const response = await galleryAPI.upload(formData);
        
        const lastUploadedPhotoId = response.data.lastUploadedPhotoId.insertId
        
        if (lastUploadedPhotoId) {
          // Make the API setCover request
          await galleryAPI.setCover(id, { cover_photo_id: lastUploadedPhotoId });
                    
          // Handle success (you might want to show a success notification)
          openNotification("success", '', response.data.message);
          dispatch(setRefresh());
        } else {
          console.error('Upload error: lastUploadedPhotoId not available');
        }
      } catch (error) {
        console.error('Upload error:', error);
      }
    }
  };


  const toggleDeleteMode = () => {
    setDeleteMode(!deleteMode);
    setSelectedImages([]);
  };


  const handleImageClick = (data) => {
        if (deleteMode) {
        // Toggle selection of the image
        setSelectedImages((prevSelected) => {
            const isSelected = prevSelected.includes(data.filename);
            if (isSelected) {
            return prevSelected.filter((id) => id !== data.filename);
            } else {
            return [...prevSelected, data.filename];
            }
        });
        } else {
        // Handle other actions when delete mode is not active
        }
    };


    const items = [
      {
        key: '1',
        label: 'Đặt bìa album',
      },
      {
        key: '2',
        label: 'Tải xuống tất cả',
      },
      {
        key: '3',
        label: deleteMode ? 'Hủy xóa ảnh' : 'Xóa ảnh',
        onClick: () => toggleDeleteMode()
      },
    ];


  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  
  const handleDeleteMany = async () => {

    try {
      if (selectedImages.length > 0) {
        const response = await galleryAPI.deleteMany({ filenames: selectedImages });
        
        openNotification("success", '', response.data.message);
        dispatch(setRefresh());
      } else {
        openNotification("error", '', 'Vui lòng chọn ít nhất một hình ảnh để xóa.');
      }
    } catch (error) {
      console.error('Xóa nhiều hình ảnh lỗi:', error);
      openNotification("error", '', 'Có lỗi xảy ra khi xóa hình ảnh.');
    } finally {
      setDeleteMode(false);
      setSelectedImages([]);
    }
  };



  return (
    <Container maxWidth="xl">
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
        >
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <Link to="/dashboard/albums">
                        <IconButton
                            sx={{
                                mr: 1,
                                color: 'text.primary',
                            }}
                        >
                            <Iconify icon="feather:arrow-left" />
                        </IconButton>
                    </Link>
                {albumData.album_name}
            </Typography>
            <div>
                {
                  deleteMode && selectedImages.length > 0 && (
                    <IconButton
                        sx={{
                          mr: 1,
                          fontSize: '25px',                          
                        }}
                        onClick={handleDeleteMany}
                    >
                        <Iconify icon="fluent:delete-24-filled" style={{ color: '#D83F31'}} />
                    </IconButton>
                  )
                }
                {/* Upload image */}
                <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFile}
                    ref={fileInputRef}
                    multiple
                />
                <label htmlFor="file-input-label">
                    <IconButton
                        sx={{
                        fontSize: '25px',
                        paddingLeft: '10px',
                        }}
                        onClick={openFileDialog}
                    >
                        <Iconify icon="bx:image-add" />
                    </IconButton>
                </label>
                {/* See more */}
                <Dropdown
                    menu={{items}}
                    trigger={["click"]}
                    placement="bottomLeft"
                >
                    <IconButton
                        sx={{
                            mr: 1,
                            fontSize: '25px',
                            paddingLeft: '10px',
                        }}
                        >
                            <Iconify icon="mingcute:more-2-fill" />
                    </IconButton>
                </Dropdown>
            </div>
        </Stack>
        <div className="photo_date">
            {moment(albumData.created_at)
            .locale("vi")
            .format("DD [thg] MM, YYYY")}
        </div>
        <Divider />
        <div className="album-grid">
            {albumData.photos && albumData.photos.length > 0 ? (
              <ImageList cols={4} gap={24} sx={{ width: '100%' }}>
                {albumData.photos && albumData.photos.map((data, index) => (
                  <ImageListItem key={index} style={{ position: 'relative' }} onClick={() => handleImageClick(data)}>
                      <Image  src={`${import.meta.env.VITE_API_URL}/${data.photo_url}/${data.filename}`} 
                              alt={data.photo_name} 
                              height='180px'
                          preview={{
                              toolbarRender: (
                                  _,
                                  {
                                  transform: { scale },
                                  actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn },
                                  },
                              ) => (
                                  <Space size={12} className="toolbar-wrapper">
                                  <DownloadOutlined onClick={() => onDownload(data.photo_url, data.filename, data.photo_name)} />
                                  <SwapOutlined rotate={90} onClick={onFlipY} />
                                  <SwapOutlined onClick={onFlipX} />
                                  <RotateLeftOutlined onClick={onRotateLeft} />
                                  <RotateRightOutlined onClick={onRotateRight} />
                                  <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                                  <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
                                  </Space>
                              ),
                          }} />

                          {deleteMode && (
                              <div
                                  style={{
                                  position: 'absolute',
                                  padding: 10,
                                  width: '100%',
                                  height: '100%',
                                  }}
                              >
                                  <Checkbox checked={selectedImages.includes(data.filename)} onChange={() => handleImageClick(data)} />
                              </div>
                          )}
                  </ImageListItem>
                  ))}
              </ImageList>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Empty className="mb-5" description={<Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>Không tìm thấy hình ảnh</Typography>} />
              </div>
            )}
            
        </div>
    </Container>
  );
};

export default AdminAlbumDetailPage;
