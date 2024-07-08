const Service = require("../models/serviceModel");
const fs = require("fs");

class ServiceController {
    async showService(req, res) {
        try {
          const services = await Service.getAll();
          res.json(services);
        } catch (error) {
          console.log(error);
          res.status(500).json("Đã xảy ra lỗi");
        }
    }

    async findOneService(req, res) {
      try {
        const data = await Service.getById(req.params.id);
        // ================
        res.json(data);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Không tìm thấy" });
      }
    }

    async addService(req, res) {
      try {
        const data = {
          service_name: req.body.service_name,
          description: req.body.description,
          img_url: req.file ? req.file.filename : null,
        };

        await Service.create(data);

        res.status(200).json({
          success: true,
          message: "Tạo dịch vụ thành công!",
        });
      } catch (error) {
        console.error("Lỗi: ", error);
        res.status(500).json({ message: "Không thể tạo dịch vụ mới" });
      }
    }

    async deleteService(req, res) {
      try {
        const service = await Service.getById(req.params.id);

        if (service.img_url !== null) {
            fs.unlink(`uploads/${service.img_url}`, (err) => {
              if (err) console.log(err);
            });
        }
        Service.delete(req.params.id);

        res.json({ success: true, message: "Xóa thành công" });
      } catch (error) {
        console.error("Lỗi: ", error);
        res.status(500).json({ message: "Có lỗi xảy ra" });
      }
    }

    async updateService(req, res) {
      try {
        const service = await Service.getById(req.params.id);
        
        const data = {
          service_name: req.body.service_name,
          description: req.body.description,
          img_url: req.file ? req.file.filename : service.img_url,
        };

        if ((req.file && service.img_url !== null)) {
          fs.unlink(`uploads/${service.img_url}`, (err) => {
            if (err) console.log(err);
          });
        }

        const updatedRows = await Service.update(req.params.id, data);

        res.json({
          success: true,
          message: "Cập nhật thành công!",
          status: updatedRows.message,
        });
      } catch (error) {
        if(error.errno === 1406) {
          return res.status(403).json({
            success: false,
            message: 'Tiêu đề hoặc mô tả quá dài !!'
          })
        }
        res.status(500).json({ success: false, message: "Đã xảy ra lỗi" });
      }
    }
}

module.exports = new ServiceController();
