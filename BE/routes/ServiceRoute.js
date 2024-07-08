const express = require("express");

const router = express.Router();
const createMulterMiddleware = require('../middleware/multerConfig'); 

const upload = createMulterMiddleware('uploads');


const ServiceController = require('../controllers/ServiceController');

const AuthController = require('../controllers/AuthController');

const auth = require('../middleware/auth')


//API - Service

router.get('/getAllService', ServiceController.showService);

router.get('/get/:id', ServiceController.findOneService);

router.post('/addService', upload.single('image'), ServiceController.addService);

router.delete('/deleteService/:id', ServiceController.deleteService)

router.put('/upload/:id', upload.single('image'), ServiceController.updateService)




module.exports = router