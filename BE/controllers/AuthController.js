const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authenticateToken = require('../middleware/auth');
const db = require('../database/db');


class AuthController {
    login(req, res) {
        const { email, password } = req.body

        if(!email || !password) {
            res.status(400).json({ message: 'Vui lòng nhập email và mật khẩu'})
            return;
        }
        User.getUserByEmail(email).then((user) => {

            if (!user || !User.comparePassword(password, user.password)) {
                return res.status(401).json({message: 'Thông tin đăng nhập không đúng'});
                
            } else {

                const token = jwt.sign({ userId: user.userID }, process.env.TOKEN_SECRET, {expiresIn: '1h'});

                //Set cookie
                res.cookie('token', token, { httpOnly: true, secure: true })

                //Update status db
                db.query('UPDATE users SET isLoggedIn = ? WHERE userID = ?', [true, user.userID], (error) => {
                    if (error) {
                        console.log(error)
                        return res.status(500).json('Lỗi truy vấn cơ sở dữ liệu')
                    }
                    res.json({ message: 'Đăng nhập thành công.', token, user });
                })
            }
        })
        .catch((err) => {
            res.status(500).json({ message: 'Lỗi truy vấn cơ sở dữ liệu'})
        })
    }

    logout(req, res) {

        const token = req.cookies.token;

        let access_token;
        try {
            access_token = jwt.verify(token, process.env.TOKEN_SECRET);
        } catch (err) {
            return res.status(401).json({ message: 'Token không hợp lệ.' });
        }
        
        db.query('UPDATE users SET isLoggedIn = ? WHERE userID = ?', [false, access_token.userId], (error) => {
            if (error) {
              console.log(error);
              return res.status(500).json({ message: 'Lỗi truy vấn cơ sở dữ liệu.' });
            }
            
            res.clearCookie('token')
            
            res.json('Đăng xuất thành công');
            

          });
    }

    
}

module.exports = new AuthController();