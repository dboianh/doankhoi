use baclieuict;


/* CREATED TABLE */

CREATE TABLE info (
	id int auto_increment,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    PRIMARY KEY (id)
);

CREATE TABLE users (
  userID int auto_increment,
  username varchar(50) NOT NULL,
  password varchar(255) NOT NULL,
  email varchar(50) UNIQUE NOT NULL,
  avatar varchar(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  isLoggedIn BOOLEAN DEFAULT false,
  roleID int NOT NULL,
  PRIMARY KEY (`userID`),
  FOREIGN KEY (roleID) REFERENCES roles(roleID)

);

CREATE TABLE contact (
	cid int auto_increment,
	fullname varchar(50) NOT NULL,
    email varchar(30),
    address varchar(255),
    phone varchar(15) NOT NULL,
    message varchar(255) NOT NULL,
    sending_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isChecked BOOLEAN DEFAULT false,
    PRIMARY KEY (`cid`),
    CHECK (length(email) <= 30),
    CHECK (length(phone) <= 15)
);


CREATE TABLE services (
	service_id int auto_increment,
    service_name varchar(50),
    description TEXT,
    img_url varchar(255),
    PRIMARY KEY (`service_id`)
);

CREATE TABLE news (
	news_id int auto_increment,
    userID int NOT NULL,
    title varchar(255) NOT NULL,
    content LONGTEXT,
    category varchar(100),
    image varchar(255),
    views int DEFAULT 0,
    description TEXT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by varchar(50) NOT NULL,
	status ENUM('Đã duyệt', 'Chờ duyệt', 'Từ chối', 'Nhập tin'),
    PRIMARY KEY (news_id),
    FOREIGN KEY (userID) REFERENCES users(userID)
);

CREATE TABLE events (
	event_id INT auto_increment,
    userID INT NOT NULL,
    title varchar(255) NOT NULL,
    description TEXT,
    location varchar(255) NOT NULL,
    organization varchar(255) NOT NULL,
    category varchar(50),
    image varchar(255),
	start_date DATE,
    end_date DATE,
    PRIMARY KEY (event_id),
    FOREIGN KEY (userID) REFERENCES users(userID)
);

CREATE TABLE portals (
	portal_id INT AUTO_INCREMENT,
    portal_name varchar(255),
    image varchar(255),
    website_url varchar(255),
    PRIMARY KEY (portal_id)
);

CREATE TABLE categories (
	cid INT AUTO_INCREMENT,
    cname varchar(100),
    PRIMARY KEY (cid)
);

CREATE TABLE roles (
	roleID INT AUTO_INCREMENT,
    roleName varchar(100),
    alias varchar(20) UNIQUE NOT NULL,
    PRIMARY KEY (roleID)
);


CREATE TABLE attachments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  file_path VARCHAR(255) NOT NULL,
  file_type VARCHAR(50), -- Loại file (ví dụ: "PDF", "JPEG", "PNG", ...)
  file_size INT, -- Kích thước của file (đơn vị: byte)
  filename VARCHAR(255),
  originalname VARCHAR(255),
  nid INT, -- Cột khóa ngoại liên kết với bảng tin tức
  FOREIGN KEY (nid) REFERENCES news(news_id)
);


CREATE TABLE albums (
  album_id INT PRIMARY KEY AUTO_INCREMENT,
  album_name VARCHAR(255) NOT NULL,
  cover_photo_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_cover_photo FOREIGN KEY (cover_photo_id) REFERENCES photos(photo_id) ON DELETE SET NULL
);


CREATE TABLE photos (
  photo_id INT PRIMARY KEY AUTO_INCREMENT,
  album_id INT,
  photo_url VARCHAR(255) NOT NULL,
  photo_size INT,
  filename VARCHAR(255),
  photo_name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (album_id) REFERENCES albums(album_id) ON DELETE CASCADE
);


CREATE TABLE banners (
  id INT PRIMARY KEY AUTO_INCREMENT,
  image_url VARCHAR(255) NOT NULL,
  link_url VARCHAR(255),
  order_index INT DEFAULT 0,
  is_active BOOLEAN DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE visits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ip_address VARCHAR(45),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



/* QUERY FUNCTION */

/* ALTER */
ALTER TABLE users ADD isLoggedIn BOOLEAN DEFAULT false;
ALTER TABLE users ADD avatar varchar(255);
ALTER TABLE users ADD address varchar(255);
ALTER TABLE users ADD phone varchar(15);


ALTER TABLE news ADD image varchar(255);
ALTER TABLE events ADD image varchar(255);
ALTER TABLE news ADD category varchar(50);
ALTER TABLE portals ADD portal_name varchar(50);
ALTER TABLE contact ADD isChecked BOOLEAN DEFAULT false;
ALTER TABLE contact MODIFY address varchar(255);
ALTER TABLE news MODIFY content LONGTEXT;
ALTER TABLE news ADD updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE news MODIFY updated_by VARCHAR(50) NOT NULL;
ALTER TABLE news MODIFY date TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE news MODIFY category VARCHAR(100);
ALTER TABLE news ADD description TEXT;
ALTER TABLE users MODIFY email varchar(50) UNIQUE NOT NULL;
ALTER TABLE news MODIFY status ENUM('Đã duyệt', 'Chờ duyệt', 'Từ chối', 'Nhập tin');
ALTER TABLE news MODIFY category INT NOT NULL, ADD FOREIGN KEY (category) REFERENCES categories(cid);
ALTER TABLE users MODIFY roleID INT NOT NULL, ADD FOREIGN KEY (roleID) REFERENCES roles(roleID);
ALTER TABLE roles ADD alias varchar(20) UNIQUE;
ALTER TABLE portals MODIFY portal_name varchar(255);
ALTER TABLE albums ADD CONSTRAINT fk_cover_photo FOREIGN KEY (cover_photo_id) REFERENCES photos(photo_id) ON DELETE SET NULL;
ALTER TABLE albums DROP FOREIGN KEY fk_cover_photo;
ALTER TABLE photos ADD photo_name VARCHAR(255);
ALTER TABLE albums DROP COLUMN photo_count;




/* SELECT  */

SELECT * FROM users;
SELECT * FROM contact;
SELECT * FROM services;
SELECT * FROM info;
SELECT * FROM news;
SELECT * FROM events;
SELECT * FROM portals;
SELECT * FROM categories;
SELECT * FROM roles;
SELECT * FROM attachments;
SELECT * FROM albums;
SELECT * FROM photos;
SELECT * FROM banners;
SELECT * FROM visits;

SELECT * FROM photos WHERE album_id = 1;
SELECT * FROM users WHERE user_ID = 1;
SELECT * FROM services WHERE service_id = 1;
SELECT * FROM events WHERE "2023-07-28" between start_date AND end_date;
SELECT news_id, title, category, image, views, date, username, avatar, updated_date, updated_by 
FROM news INNER JOIN users ON news.userID = users.userID;

SELECT news_id, title, category, image, views, date, cname FROM news INNER JOIN categories ON news.category = categories.cid WHERE category = 2;
SELECT * FROM users INNER JOIN roles ON users.roleID = roles.roleID;

SELECT * FROM news INNER JOIN users ON news.userID = users.userID INNER JOIN categories ON news.category = categories.cid WHERE news.userID = 5;
/*Get statistics*/
SELECT 'Users' AS Field, COUNT(*) AS Total FROM users UNION ALL
SELECT 'News' AS Field, COUNT(*) AS Total FROM news UNION ALL
SELECT 'Services' AS Field, COUNT(*) AS Total FROM services UNION ALL
SELECT categories.cname AS Field, COUNT(news.news_id) AS Total FROM news JOIN categories ON news.category = categories.cid GROUP BY categories.cname;

SELECT * FROM news INNER JOIN attachments ON news.news_id = attachments.nid;



SELECT
  albums.*,
  COUNT(distinct photos.photo_id) AS photo_count,
  cover_photo.photo_url AS cover_photo_url,
  cover_photo.photo_name AS cover_photo_name,
  cover_photo.filename AS cover_photo_filename
FROM albums
LEFT JOIN photos ON albums.album_id = photos.album_id
LEFT JOIN photos AS cover_photo ON albums.cover_photo_id = cover_photo.photo_id
GROUP BY albums.album_id, albums.album_name, cover_photo_url, cover_photo_name, cover_photo_filename;


SELECT * FROM albums LEFT JOIN photos ON albums.album_id = photos.album_id WHERE albums.album_id = 2;



/* INSERT */
INSERT INTO users (username, password, email) VALUES ('boido', '1234', 'boido@gmail.com');

/*UPDATE */
UPDATE albums
SET photo_count = (
    SELECT COUNT(*)
    FROM photos
    WHERE photos.album_id = albums.album_id
);


/* DROP */
DROP TABLE users;
DROP TABLE contact;
DROP TABLE services;
DROP TABLE general_info;
DROP TABLE events;
DROP TABLE portals;
DROP TABLE news;
DROP TABLE categories;
DROP TABLE attachments;
DROP TABLE albums;
DROP TABLE photos;
