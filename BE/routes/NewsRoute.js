const express = require("express");
const { NewsController, EventController } = require('../controllers/NewsController');

const AuthController = require('../controllers/AuthController');

const auth = require('../middleware/auth')

const createMulterMiddleware = require('../middleware/multerConfig');

const router = express.Router();

const upload = createMulterMiddleware('uploads'); 




//API - News

router.get('/view', NewsController.viewAllPosts);

router.get('/getAllByAdmin/:id', NewsController.getAllByAdmin);

router.get('/viewById/:id', NewsController.viewOnePost);

router.get('/getMostViewedNews', NewsController.getMostViewedNews);

router.get('/getLatestNews/:id', NewsController.getLatestPost);

router.get('/getRecentAnnouncements', NewsController.getRecentAnnouncements);

router.get('/getByCategory/:id', NewsController.getByCategory);

router.get('/getByUserCreate/:id', NewsController.getByUserCreate);

router.get('/search', NewsController.searchPost);


router.post('/create', upload.single('image'), NewsController.createPost);

router.put('/update/:id', upload.single('image'), NewsController.EditPost);

router.put('/views/:id', NewsController.increaseView);

router.put('/approve/:id', NewsController.approveNews);

router.put('/refuse/:id', NewsController.refuseNews);

router.put('/resend/:id', NewsController.reSend);

router.delete('/delete/:id', NewsController.deletePost);

//Topic - API

router.get('/getCategory', NewsController.getAllTopic);

router.get('/getByPid/:id', NewsController.getTopicByParentID);

router.get('/getDisplayHomeTopic', NewsController.getDisplayHomeTopic);

router.delete('/topic-management/:id', NewsController.deleteTopic);

router.post('/topic-management', NewsController.createNewTopic);

router.put('/topic-management/:id', NewsController.updateNewTopic);
//API - Events

router.post('/createEvent', auth.authenToken, upload.single('image'), EventController.createEvent);

router.put('/updateEvent/:id', auth.authenToken, upload.single('image'), EventController.updateEvent);

router.delete('/deleteEvent/:id', auth.authenToken, upload.single('image'), EventController.deleteEvent);

router.get('/getByUpcomingDate', auth.authenToken, EventController.showEventUpComing);

router.get('/findAll', auth.authenToken, EventController.findAllEvent);



module.exports = router