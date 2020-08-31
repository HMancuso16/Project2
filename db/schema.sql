DROP DATABASE IF EXISTS users_db;
CREATE DATABASE users_db;
USE users_db;

CREATE TABLE prompt
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL, 
    image VARCHAR(255) NOT NULL, 
    prompt_id INT UNSIGNED NOT NULL,
    INDEX prompt_ind (prompt_id),
    CONSTRAINT fk_prompt FOREIGN KEY (prompt_id) REFERENCES prompt(id) ON DELETE CASCADE
    
)

-- CREATE TABLE materials (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     picture_name REFERENCES prompt(id) VARCHAR (100) NOT NULL,
    

-- )

-- CREATE TABLE pictures (
--     id INT AUTO_INCREMENT PRIMARY KEY, 
--     name VARCHAR(200) NOT NULL, 
--     image VARCHAR(255) NOT NULL,
--     foreign key 
--     prompt_id INT UNSIGNED NOT NULL,
--     INDEX 
-- )

