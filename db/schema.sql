USE project2_db;

CREATE TABLE posts(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    shoe_name VARCHAR(50) NOT NULL,
    brand_name VARCHAR(30) NOT NULL,
    price INT UNSIGNED NOT NULL,
    -- how to connect/relate a user to their posts
)