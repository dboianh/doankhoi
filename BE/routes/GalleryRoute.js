const express = require("express");

const router = express.Router();

const GalleryController  = require('../controllers/GalleryController');

const createMulterMiddleware = require('../middleware/multerConfig'); 

const upload = createMulterMiddleware('uploads');


const auth = require('../middleware/auth')


//API - News

router.get('/get', GalleryController.getAll);

router.get('/getById/:id', GalleryController.getAlbumById);

router.post('/create', GalleryController.createNew);

router.post('/upload', upload.any('photo', 4), GalleryController.uploadImage);

router.get('/getPhotoByAlbum/:id', GalleryController.getPhotoListById);

router.put('/rename/:id', GalleryController.renameAlbum);

router.delete('/delete/:id', GalleryController.deleteAlbum);

router.post('/delete', GalleryController.deleteSelectedPhotos);

router.put('/update/:id', GalleryController.setCoverAlbum);



module.exports = router