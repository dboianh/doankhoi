const { Album, Photo } = require("../models/galleryModel");
const fs = require("fs");
const path = require('path');


class GalleryController {
    async getAll(req, res) {
        try {
            const results = await Album.get();
            res.json(results);
        } catch (error) {
            console.error("Lỗi: ", error);
            res.status(500).json({ message: "Có lỗi xảy ra" });
        }
    } 


    async getAlbumById(req, res) {
        try {
            const album = await Album.getById(req.params.id);
            if (album) {

                const allNullPhotoIds = album.photos.every(
                    (photo) => photo.photo_id === null
                );

                const filteredAlbum = {
                    album_id: album.album_id,
                    album_name: album.album_name,
                    created_at: album.created_at,
                    photos: allNullPhotoIds ? [] : album.photos,
                };

                res.json(filteredAlbum);
            } else {
                res.status(404).json({ message: "Không tìm thấy album" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Lỗi server" });
        }
    }


    async getPhotoListById(req, res) {
        try {
            const data = await Photo.getById(req.params.id);
            res.json(data);
        } catch (error) {
            console.log(error);
            res.status(500).json("Đã xảy ra lỗi");
        }
    }


    async setCoverAlbum(req, res) {
        try {        
            const coverId = req.body.cover_photo_id;
    
            await Album.setCover(req.params.id, coverId);
    
            return res.json({
              success: true,
              message: "Cập nhật thành công!",
            });
            } catch (error) {
                return res.status(500).json({ success: false, message: "Đã xảy ra lỗi" });
        }
    }

  async createNew(req, res) {
    try {
        const album = { album_name: req.body.album_name };
        await Album.create(album);

        res.status(200).json({
            success: true,
            message: "Tạo album thành công!",
        });
    } catch (error) {
        console.log("Lỗi", error);
        res.status(500).json({ message: "Có lỗi xảy ra" });
    }
  }

  async renameAlbum(req, res) {
    try {        
        const album_name = { album_name: req.body.album_name };

        const updatedRows = await Album.rename(req.params.id, album_name);

        return res.json({
          success: true,
          message: "Cập nhật thành công!",
          status: updatedRows.message,
        });
        } catch (error) {
            return res.status(500).json({ success: false, message: "Đã xảy ra lỗi" });
        }
    }



    async deleteAlbum (req, res) {
        try {
            const results = await Album.getById(req.params.id)

            const isAlbumEmpty = results.photos.every(
                (photo) => photo.photo_id === null
            );


            if (!isAlbumEmpty) {
                await Promise.all(
                    results.photos.map(async (item) => {
                        // Sử dụng Promise để đảm bảo xử lý đồng bộ và kiểm tra lỗi
                        return new Promise((resolve, reject) => {
                            fs.unlink(`${item.photo_url}/${item.filename}`, (err) => {
                                if (err) {
                                    console.log(err);
                                    reject(err);
                                } else {
                                    resolve();
                                }
                            });
                        });
                    })
                );
            }
            await Album.delete(req.params.id)

            res.json({ success: true, message: 'Xóa thành công' });
        } catch (error) {
            console.log(error)
            res.send('Có lỗi xảy ra')
        }
    }


    async deleteSelectedPhotos(req, res) {
        try {
            const filenames = req.body.filenames;
    
            if (filenames.length > 0) {
            // Your existing code for unlinking files
                await Promise.all(
                    filenames.map(async (item) => {
                        const filePath = `uploads/${item}`;

                        return new Promise((resolve, reject) => {
                            fs.unlink(filePath, (err) => {
                                if (err) {
                                    console.log(err);
                                    reject(err);
                                } else {
                                    resolve();
                                }
                            });
                        });
                    })
                );
            }
            await Photo.delete(filenames);
    
            res.json({ success: true, message: 'Xóa thành công' });
        } catch (error) {
            console.log(error);
            res.send('Có lỗi xảy ra');
        }
    }


    async uploadImage(req, res) {
        try {
            const fileList = req.files;
            const album_id = req.body.id; // id => news
        
            if (fileList && fileList.length > 0) {
                const lastUploadedPhotoId = await Promise.all(fileList.map(async (file) => {
                    const data = {
                        photo_url: file.destination,
                        photo_size: file.size,
                        filename: file.filename,
                        photo_name: Buffer.from(file.originalname, "latin1").toString("utf8"),
                        album_id: album_id,
                    };
                    return await Photo.upload(data);
                })).then(photoIds => photoIds.pop()); // Get the last item from the array
        
                return res.json({ success: true, message: 'Upload thành công', lastUploadedPhotoId });
            }
            
            return res.json({ success: true, message: 'Không có ảnh để upload' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: 'Đã có lỗi xảy ra' });
        }
    }
    





  }


module.exports = new GalleryController();
