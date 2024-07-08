import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import { Alert, Button, Modal, Input, Divider, Col, Row, Image, Space, Menu, Dropdown, Checkbox } from "antd";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer";
import {
    Card,
    Stack,
    Popover,
    Container,
    Typography,
    IconButton,
    ImageList,
    ImageListItem,
    ListSubheader,
    Box
} from "@mui/material";
import galleryAPI from "../../../api/gallery/gallery.api";
import { setRefresh } from "../../../redux/controllers/app/appSlice";
import { useDispatchRoot } from "../../../redux/store";
import { useSelector } from "react-redux";
import moment from 'moment';
import "moment/locale/vi";
import Iconify from '../../../components/iconify';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import './style.scss'

// import "./style.scss";

const { Meta } = Card;


const Gallery = () => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albumData, setAlbumData] = useState("");
  const dispatch = useDispatchRoot();
  const [albums, setAlbums] = useState([]);
  const { refresh } = useSelector((state) => state.app);
  const { id } = useParams();

  const navigate = useNavigate();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));



  //API get image
  useEffect(() => {
    const fetchData = async () => {
      await galleryAPI.getById(id).then((res) => setAlbumData(res.data));
    };
    fetchData();
  }, [dispatch, refresh]);


  //Download function 

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



  return (
    <React.Fragment>
      <Navbar />
      <div className="wrapper-album">
        <div className="album-container mt-3 mb-5">
            <ImageList cols={isSmallScreen ? 2 : 5} gap={isSmallScreen ? 8 : 16} sx={{ width: '100%' }}>
            <ImageListItem key="Subheader" 
                cols={isSmallScreen ? 2 : 5}
                sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <Link to="/thu-vien">
                        <IconButton
                        sx={{
                            color: 'text.primary',
                        }}
                        >
                        <Iconify icon="feather:arrow-left" />
                        </IconButton>
                    </Link>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                        <ListSubheader
                            component="div"
                            sx={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: '#000',
                            margin: '0 auto',
                            }}
                        >
                            {albumData.album_name}
                        </ListSubheader>
                        <Typography variant="caption" color="textSecondary">
                            {moment(albumData.created_at).locale("vi").format("DD [thg] MM, YYYY")}
                        </Typography>

                    </div>
                </div>
                <Divider />
            </ImageListItem>
            {albumData.photos && albumData.photos.map((data, index) => (
                <ImageListItem key={index} style={{ position: 'relative' }}>
                <Image  src={`${import.meta.env.VITE_API_URL}/${data.photo_url}/${data.filename}`} 
                        alt={data.photo_name} 
                        width='180px'
                        height='150px'
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
                </ImageListItem>
            ))}
            </ImageList>
        </div>
        </div>

      {/* <div className="wrapper-album">
        <div className="album-container mt-3 mb-5" style={{ display: 'flex', alignItems: 'center' }}>
            <ImageList cols={isSmallScreen ? 2 : 5} gap={isSmallScreen ? 8 : 16} sx={{ width: '100%' }}>
                <Link to="/thu-vien">
                    <IconButton
                        sx={{
                            color: 'text.primary',
                        }}
                    >
                        <Iconify icon="feather:arrow-left" />
                    </IconButton>
                </Link>
                <ImageListItem key="Subheader" 
                    cols={isSmallScreen ? 2 : 5}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    
                    <ListSubheader
                        component="div"
                        sx={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#000',
                        }}
                    >
                        {albumData.album_name}
                    </ListSubheader>
                    <Typography variant="caption" color="textSecondary">
                        {moment(albumData.created_at).locale("vi").format("DD [thg] MM, YYYY")}
                    </Typography>
                    <Divider />

                </ImageListItem>
                {albumData.photos && albumData.photos.map((data, index) => (
                <ImageListItem key={index} style={{ position: 'relative' }}>
                    <Image  src={`${import.meta.env.VITE_API_URL}/${data.photo_url}/${data.filename}`} 
                            alt={data.photo_name} 
                            width='180px'
                            height='150px'
                                
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
                    </ImageListItem>
                    ))}
                </ImageList>
            </div>

      </div> */}
      <Footer />
    </React.Fragment>
  );
};

export default Gallery;
