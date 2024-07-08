import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Divider,
  Card,
  Col,
  Row,
  Modal,
  Input,
  Dropdown,
  Menu,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import "./style.scss";
import {
  Stack,
  Container,
  Typography,
  IconButton,
} from "@mui/material";

import { PlusSquareOutlined } from "@ant-design/icons";
//component
import galleryAPI from "../../api/gallery/gallery.api";
import openNotification from "../../components/CNotification";
import { setRefresh } from "../../redux/controllers/app/appSlice";
import { useDispatchRoot } from "../../redux/store";
import { useSelector } from "react-redux";
import { MoreOutlined } from "@ant-design/icons";
import Iconify from "../../components/iconify";

const { confirm } = Modal;
const { TextArea } = Input;

const AdminGalleryPage = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");
  const dispatch = useDispatchRoot();
  const [albums, setAlbums] = useState([]);
  const { refresh } = useSelector((state) => state.app);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [visibleModalRenameAlbum, setVisibleModalRenameAlbum] = useState(false);
  const [dataSelected, setDataSelected] = useState("");
  const [albumSelected, setAlbumSelected] = useState({});

  const navigate = useNavigate()


  const handleRenameAlbum = () => {
    galleryAPI
      .rename(albumSelected.album_id, { album_name: dataSelected })
      .then((res) => {
        openNotification("success", "", res.data.message);
        dispatch(setRefresh());
        setVisibleModalRenameAlbum(false);
      })
      .catch((err) => {
        openNotification("error", "", err.response.data.message);
      });
  };

  const handleMouseEnter = (album) => {
    setHoveredCard(album.album_id);
    setAlbumSelected(album);
    setDataSelected(album.album_name)
  };


  const showDeleteConfirm = (Id, name) => {
    confirm({
      title: `Xác thực hành động!`,
      icon: <ExclamationCircleOutlined />,
      content: `Bạn có muốn xóa album "${name}" ? `,
      okText: "Xoá",
      okType: "danger",
      cancelText: "Đóng",
      async onOk() {
        await galleryAPI.delete(Id).then((res) => {
          openNotification('success', "", res.data.message);
          dispatch(setRefresh());
        });
      },
      onCancel() {},
    });
  };

  const handleAlbumClick = (e, albumId) => {
    e.preventDefault();
    navigate(`/dashboard/album/${albumId}`)
  }


  // const menuItems = [
  //   {
  //     label: 'Đổi tên album',
  //     key: '1',
  //     onClick: () => setVisibleModalRenameAlbum(true),
  //   },
  //   {
  //     label: 'Xóa album',
  //     key: '2',
  //     onClick: () => showDeleteConfirm(hoveredCard, dataSelected)
  //   }
  // ];


  const items = [
    {
      key: '1',
      label: 'Đổi tên album',
      onClick: () => setVisibleModalRenameAlbum(true)
    },
    {
      key: '2',
      label: 'Xóa album',
      onClick: () => showDeleteConfirm(hoveredCard, dataSelected)
    },
  ];

  
  useEffect(() => {
    const fetchData = async () => {
      await galleryAPI.getAll().then((res) => setAlbums(res.data));
    };
    fetchData();
  }, [dispatch, refresh]);

  return (
    <React.Fragment>
      <Helmet>
        <title> Quản lý thư viện </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6">Album</Typography>
          {/* <div className="counter mt-2">
              {albums.length} mục
          </div> */}
          <Button
            className="custom-button"
            type="text"
            icon={<PlusSquareOutlined />}
            onClick={() => setOpen(true)}
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "15px",
              fontWeight: "500",
            }}
          >
            Tạo album
          </Button>
        </Stack>
        <Stack
          mb={3}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <div className="counter mt-2">
              {albums.length} mục
          </div>
        </Stack>
        <Divider />
        <div className="album-grid">
          <Row gutter={[24, 24]}>
            {albums.map((album, index) => (
              <Col key={index} span={24} sm={12} md={8} lg={6} xl={6}>
                <Card
                  hoverable
                  className="album-card"
                  cover={
                    <div
                      key={index}
                      onMouseEnter={() => handleMouseEnter(album)}
                      onMouseLeave={() => setHoveredCard(null)}
                      style={{ position: "relative" }}
                    >
                      {album.cover_photo_id ? (
                        <img
                          alt={album.album_name}
                          src={`${import.meta.env.VITE_API_URL}/${album.cover_photo_url}/${album.cover_photo_filename}`}
                          className="album-cover"
                          onClick={(e) => handleAlbumClick(e, album.album_id)}

                        />
                      ) : (
                        <div
                          className="album-cover"
                          onClick={(e) => handleAlbumClick(e, album.album_id)}
                          style={{
                            backgroundColor: "rgb(128, 134, 139)",
                          }}
                        />
                      )}
                      {hoveredCard === album.album_id && (
                        <Dropdown menu={{items, selectable: true}} trigger={["click"]} placement="bottomLeft" overlayStyle={{width: 200}}>
                          <div className="hover-icon" style={{ position: "absolute", top: 7, right: 7 }}>
                            <IconButton
                              sx={{
                                color: "text.primary",
                                fontSize: "20px",
                                // display: { lg: 'none' },
                              }}
                            >
                              <Iconify icon="mingcute:more-2-fill" style={{ color: 'white'}} />
                            </IconButton>
                          </div>
                        </Dropdown>
                      )}
                    </div>
                  }
                />
                <div>
                  <Typography variant="subtitle2" className="mt-3" gutterBottom>
                    {album.album_name}
                  </Typography>
                  <p className="text-muted">{album.photo_count} mục</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </Container>

      <Modal
        title="Thêm mới album"
        open={open}
        onOk={() => {
          galleryAPI
            .create({ album_name: data })
            .then((res) => {
              openNotification("success", "", res.data.message);
              dispatch(setRefresh());
              setOpen(false);
            })
            .catch((err) => {
              openNotification("error", "", err.response.data.message);
            });
        }}
        onCancel={() => setOpen(false)}
        okText="Thêm"
        cancelText="Đóng"
      >
        <Input
          placeholder="Tên album"
          defaultValue={""}
          value={data}
          onChange={(e) => setData(e.target.value)}
          size="large"
          className="mt-2 mb-2"
          required
        />
      </Modal>

      {/* Modal đổi tên */}
      <Modal
        title="Đổi tên album"
        open={visibleModalRenameAlbum}
        onOk={handleRenameAlbum}
        onCancel={() => setVisibleModalRenameAlbum(false)}
        okText="Xong"
        cancelText="Hủy"
      >
        <Divider />
        <Row gutter={16}>
          {/* Cột hình ảnh */}
          <Col span={7}>
            <div className="img-container">

                {albumSelected.cover_photo_id ? (
                        <img
                          alt={albumSelected.album_name}
                          src={`${import.meta.env.VITE_API_URL}/${albumSelected.cover_photo_url}/${albumSelected.cover_photo_filename}`}
                          className="album-cover"
                        />
                      ) : (
                        <div
                          className="album-cover"
                          style={{
                            backgroundColor: "rgb(128, 134, 139)",
                          }}
                        />
                )}

              {/* <img
                src={`${import.meta.env.VITE_API_URL}/${albumSelected.cover_photo_url}/${albumSelected.cover_photo_filename}`}
                alt="Album"
              /> */}
            </div>
          </Col>

          {/* Cột input text */}
          <Col span={17}>
            <TextArea
              rows={3}
              autoSize={{ minRows: 4, maxRows: 4 }}
              placeholder="Tên album"
              size="large"
              value={dataSelected}
              onChange={(e) => setDataSelected(e.target.value)}
            />
            {/* <Input
                required
            /> */}
          </Col>
        </Row>
      </Modal>
    </React.Fragment>
  );
};

export default AdminGalleryPage;
