const { News, Event } = require("../models/newsModel");
const jwt = require('jsonwebtoken')
const moment = require("moment")
const fs = require("fs");


class NewsController {

    async viewAllPosts(req, res) {
        try {
            const posts = await News.getAll();
            res.json(posts);
        } catch (error) {
            console.log(error);
            res.status(500).json("Đã xảy ra lỗi");
        }
    }


    async getAllByAdmin(req, res) {
        try {
            const posts = await News.getAllByAdmin(req.params.id);
            res.json(posts);
        } catch (error) {
            console.log(error);
            res.status(500).json("Đã xảy ra lỗi");
        }
    }


    

    async viewOnePost(req, res) {
        try {
          const post = await News.getById(req.params.id);
      
          if (post) {
            const newDate = new Date(post.date);
            const formattedDate = moment(newDate).format('DD-MM-YYYY');
      
            // ================
            res.json(post);
          } else {
            res.status(404).json({ message: "Không tìm thấy" });
          }
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: "Có lỗi xảy ra" });
        }
      }

    async getMostViewedNews(req, res) {
        try {
            const posts = await News.getTrendingNews();
            res.json(posts);
        } catch (error) {
            console.log(error);
            res.status(500).json("Đã xảy ra lỗi");
        }
    }

    
    async getRecentAnnouncements(req, res) {
        try {
            const posts = await News.getAnnouncements();
            res.json(posts);
        } catch (error) {
            console.log(error);
            res.status(500).json("Đã xảy ra lỗi");
        }
    }

    async getByUserCreate(req, res) {
        try {
            const posts = await News.getByUserCreate(req.params.id);
            res.json(posts);
        } catch (error) {
            console.log(error);
            res.status(500).json("Đã xảy ra lỗi");
        }
    }


    async getLatestPost(req, res) {
        try {
            const posts = await News.getLatestNews(req.params.id);
            res.json(posts);
        } catch (error) {
            console.log(error);
            res.status(500).json("Đã xảy ra lỗi");
        }
    }

    async getByCategory(req, res) {
        try {
            const posts = await News.getNewsByCategory(req.params.id);
            res.json(posts);
        } catch (error) {
            console.log(error);
            res.status(500).json("Đã xảy ra lỗi");
        }
    }


    async approveNews (req, res) {
        try {
            await News.approve(req.params.id)
            res.status(200).json({ success: true, message: 'Phê duyệt thành công' })
        } catch (error) {
            console.log(error);
            res.status(500).json("Đã xảy ra lỗi");
        }
    }

    async refuseNews (req, res) {
        try {
            await News.refuse(req.params.id)
            res.status(200).json({ success: true, message: 'Từ chối thành công' })
        } catch (error) {
            console.log(error);
            res.status(500).json("Đã xảy ra lỗi");
        }
    }

    async reSend (req, res) {
        try {
            await News.resend(req.params.id)
            res.status(200).json({ success: true, message: 'Gởi lại thành công' })
        } catch (error) {
            console.log(error);
            res.status(500).json("Đã xảy ra lỗi");
        }
    }


    async EditPost(req, res) {
        try {
            const {title, content, category, image, date, updated_by, description, status} = req.body
            
            const news = await News.getById(req.params.id);

            const currentDate = new Date();

            
            if ((req.file && news.image !== null)) {
                fs.unlink(`uploads/${news.image}`, (err) => {
                  if (err) console.log(err);
                });
            }
    
            const data = {
                title: title,
                content: content,
                category: category,
                image: req.file ? req.file.filename : news.image,
                updated_date: moment(currentDate).format("YYYY-MM-DD HH:mm:ss"),
                updated_by: updated_by,
                description: description,
                status: status
            };
      
            const updatedRows = await News.update(req.params.id, data)

            res.json({ 
            success: true,
            message: 'Cập nhật thành công!', 
            status: updatedRows.message})
    
        } catch (error) {
          console.log(error)
    
          res.status(500).json({ success: false, message: 'Đã xảy ra lỗi' })
        }
    }


    async increaseView(req, res) {
        try {            
            const updatedRows = await News.increaseViews(req.params.id)

            res.json({ 
            success: true,
            message: 'Đã cập nhật lượt xem', 
            status: updatedRows.message})
    
        } catch (error) {
          console.log(error)
    
          res.status(500).json({ success: false, message: 'Đã xảy ra lỗi' })
        }
    }

    
    async createPost(req, res) {
        try {
            const { title, content, category, userID, image, description, updated_by, status } = req.body
            //get token
            const token = req.cookies.token;
            const decodedToken = jwt.decode(token);
            //Format current date
            const currentDate = new Date();

            if (title === '' || content === '' || category === '') {
                return res.status(400).json({ message: 'Các trường không được để trống'})
            }

            const data = {
                // userID: decodedToken.userId,
                userID: userID,
                title: title,
                content: content,
                category: category,
                date: moment(currentDate).format("YYYY-MM-DD HH:mm:ss"),
                updated_date: moment(currentDate).format("YYYY-MM-DD HH:mm:ss"),
                image: req.file ? req.file.filename : null,
                updated_by: updated_by,
                description: description,
                status: status
            };
            const results = await News.create(data);


            res.status(200).json({
                success: true,
                message: status === 'Nhập tin' ? 'Lưu thành công' : 'Chuyển đi thành công',
                nid: results.insertId
            })

        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra" });
        }
    }

    async deletePost(req, res) {
        try {
            const news = await News.getById(req.params.id);

            if (news.image !== null) {
                fs.unlink(`uploads/${news.image}`, (err) => {
                if (err) console.log(err);
                });
            }

            await News.delete(req.params.id);

            res.json({ success: true, message: 'Xóa bản tin thành công' });
            
        } catch (error) {
          console.error('Lỗi: ', error);
          res.status(500).json({ message: 'Có lỗi xảy ra' });
        }
    }
    
    async searchPost(req, res) {
        try {
            const searchKey = req.query.keyword
            const results = await News.search(searchKey, req.params.id)

            res.status(200).json(results)
        } catch (error) {
            console.error('Lỗi: ', error);
            res.status(500).json({ message: 'Có lỗi xảy ra' });
        }
    }

    //Controller Topic
    async getAllTopic(req, res) {
        try {
            const posts = await News.getAllTopic();
            res.json(posts);
        } catch (error) {
            console.log(error);
            res.status(500).json("Đã xảy ra lỗi");
        }
    }


    async getTopicByParentID(req, res) {
        try {
            const posts = await News.getTopicByParentId(req.params.id);
            res.json(posts);
        } catch (error) {
            console.log(error);
            res.status(500).json("Đã xảy ra lỗi");
        }
    }


    async getDisplayHomeTopic(req, res) {
        try {
            const posts = await News.getDisplayHomeTopic();
            res.json(posts);
        } catch (error) {
            console.log(error);
            res.status(500).json("Đã xảy ra lỗi");
        }
    }




    async deleteTopic(req, res) {
        try {
            await News.deleteTopic(req.params.id);

            res.json({ success: true, message: 'Xóa chủ đề thành công' });
            
        } catch (error) {
          res.status(500).json({ message: 'Không thể xóa chủ đề này' });
        }
    }

    async createNewTopic(req, res) {
        try {
            await News.createTopic(req.body);
            res.status(200).json({
                success: true,
                message: 'Tạo chủ đề thành công'
            })

        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra" });
        }
    }

    async updateNewTopic(req, res) {
        try {

            const updatedRows = await News.updateTopic(req.params.id, req.body)

            res.json({ 
            success: true,
            message: 'Cập nhật thành công!', 
            status: updatedRows.message})
    
        } catch (error) {
          console.log(error)
    
          res.status(500).json({ success: false, message: 'Đã xảy ra lỗi' })
        }
    }



    
}

//Class sự kiện


class EventController {

    async findAllEvent(req, res) {
        try {
            const results = await Event.findAll();
            res.json(results);
        } catch (error) {
            console.log(error);
            res.status(500).json("Đã xảy ra lỗi");
        }
    }

    async createEvent(req, res) {
        try {
            const {title, description, location, organization, category, image, start_date, end_date} = req.body

            const token = req.cookies.token;

            const decodedToken = jwt.decode(token);

            if (!req.body) {
                return res.send('Các trường không được để trống')
            }

            const data = {
                userID: decodedToken.userId,
                title: title,
                description: description,
                location: location,
                organization: organization,
                category: category,
                image: req.file ? req.file.filename : null,
                start_date: start_date,
                end_date: end_date
            };
            await Event.create(data);
            res.status(200).json({
                success: true,
                message: 'Đăng tải thành công 1 sự kiện'
            })

        } catch (error) {
            console.error("Lỗi: ", error);
            res.status(500).json({ message: "Có lỗi xảy ra" });
        }
    }

    async updateEvent(req, res) {
        try {

            const {title, description, location, organization, category, image, start_date, end_date} = req.body
            const event = await Event.getById(req.params.id);
  
            fs.unlink(`uploads/${event.image}`, (err) => {
                if (err) console.log(err);
                console.log("Deleted image");
            });
    
            const data = {
                title: title,
                description: description,
                location: location,
                organization: organization,
                category: category,
                image: req.file ? req.file.filename : null,
                start_date: start_date,
                end_date: end_date
            };
  
            const updatedRows = await Event.update(req.params.id, data);
  
            res.json({
                success: true,
                message: "Cập nhật thành công!",
                status: updatedRows.message,
            });
        } catch (error) {
            console.log(error);
  
            res.status(500).json({ success: false, message: "Something was off" });
        }
    }

    async deleteEvent(req, res) {
        try {
          const event = await Event.getById(req.params.id);

          await Event.delete(req.params.id);

          fs.unlink(`uploads/${event.image}`, (err) => {
            if (err) console.log(err);            
            res.json({ success: true, message: 'Xóa sự kiện thành công' });
          });
  
    
        } catch (error) {
          console.error('Lỗi: ', error);
          res.status(500).json({ message: 'Có lỗi xảy ra' });
        }
    }

    async showEventUpComing(req, res) {
        try {
            var currentDate = moment().format("YYYY-MM-DD");

            const results = await Event.getByUpcomingDate(currentDate, req.body.state)

            res.status(200).json(results)
        } catch (error) {
            console.log(error)
            res.send('Có lỗi xảy ra')
        }


    }

}

//
const newsControllerIns = new NewsController()

const eventControllerIns = new EventController()


module.exports = {
    NewsController: newsControllerIns,
    EventController: eventControllerIns
}
