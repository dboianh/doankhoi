import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Card, Row, Col, Divider } from "antd";
import { Typography } from "@mui/material";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import galleryAPI from "../../api/gallery/gallery.api";
import { setRefresh } from "../../redux/controllers/app/appSlice";
import { useDispatchRoot } from "../../redux/store";
import { useSelector } from "react-redux";

import "./style.scss";

const { Meta } = Card;


const Gallery = () => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const dispatch = useDispatchRoot();
  const [albums, setAlbums] = useState([]);
  const { refresh } = useSelector((state) => state.app);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await galleryAPI.getAll().then((res) => setAlbums(res.data));
    };
    fetchData();
  }, [dispatch, refresh]);

  const handleAlbumClick = (e, albumId) => {
    e.preventDefault();
    navigate(`/thu-vien/${albumId}`);
  };

  return (
    <React.Fragment>
      <Navbar />
      <div style={{ padding: '0px 20px' }}>
      <div className="album-container">  

        <ImageList cols={5} gap={16} sx={{ width: '100%' }}>
          <ImageListItem key="Subheader" cols={5}>
            <Typography variant="h5">Thư viện</Typography>
            <div className="counter mt-2">
              {albums.length} mục
            </div>
            {/* <Typography variant="caption" color="textSecondary">
              {albums.length} album
            </Typography> */}
            <Divider />
          </ImageListItem>

          {albums.map((album, key) => (
            <ImageListItem key={key}>
                <Card
                  hoverable
                  className="album-card"
                  cover={
                    <>
                    <div key={key} style={{ position: "relative" }}>
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
                    </div>
                    </>
                  }
                />
              <ImageListItemBar
                title={<Typography variant="subtitle2" gutterBottom>{album.album_name}</Typography>}
                subtitle={<Typography variant="body2" className="text-muted" style={{ fontSize: '14px' }}>{album.photo_count} mục</Typography>}
                position="below"
              />
            </ImageListItem>
          ))}
        </ImageList>
        </div>

      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Gallery;
