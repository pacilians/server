INSERT INTO `user` (`id`, `email`, `password`, `name`, `npp`, `role`, `description`, `is_notify`)
VALUES  ('5c5e4a62-b4eb-45e0-b3b1-1089445c4c7b', 'admin@bni.co.id', 'admin', 'ADMIN', '001', 'admin', 'Admin user', 0);

-- 

CREATE TABLE `user` (
  `id` varchar(255) PRIMARY KEY,
  `email` varchar(255) UNIQUE,
  `password` varchar(255),
  `name` varchar(255),
  `photo` longblob DEFAULT null,
  `npp` varchar(255),
  `role` varchar(255),
  `description` varchar(255),
  `is_notify` int DEFAULT 0,
  `id_customer` int DEFAULT ""
);

CREATE TABLE `customer` (
  `id` varchar(255) PRIMARY KEY,
  `name` varchar(255),
  `address` varchar(255),
  `telephone` varchar(255),
  `expiry_date` datetime,
  `business_category` varchar(255),
  `service` varchar(255),
  `key_person_name` varchar(255),
  `key_person_dob` datetime,
  `key_person_hp` varchar(255),
  `created_at` timestamp,
  `updated_at` timestamp DEFAULT null,
  `status` int DEFAULT 0
);

CREATE TABLE `bank_account` (
  `id` varchar(255) PRIMARY KEY,
  `id_customer` varchar(255),
  `number` varchar(255),
  `name` varchar(255) DEFAULT ""
);

CREATE TABLE `category_mandatory` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255)
);

CREATE TABLE `category_service` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255)
);

CREATE TABLE `category_business` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255)
);

CREATE TABLE `log` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `id_customer` varchar(255),
  `id_file` int,
  `created_at` timestamp,
  `message` text
);

CREATE TABLE `customer_file` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `id_customer` varchar(255),
  `name` varchar(255),
  `type` varchar(255),
  `file` longblob DEFAULT null,
  `created_at` timestamp,
  `updated_at` timestamp DEFAULT null
);

CREATE TABLE `board_of_director` (
  `id` varchar(255) PRIMARY KEY,
  `id_customer` varchar(255),
  `name` varchar(255),
  `photo` longblob DEFAULT null,
  `npp` varchar(255),
  `role` varchar(255),
  `description` varchar(255)
);

CREATE TABLE `notification` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `id_customer` varchar(255),
  `id_bod` varchar(255),
  `created_at` timestamp,
  `message` text
);

CREATE TABLE `announcement` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `id_user` varchar(255),
  `title` text,
  `content` text,
  `is_pinned` int DEFAULT 0,
  `created_at` timestamp,
  `updated_at` timestamp DEFAULT null
);

CREATE TABLE `audit_period` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `start` datetime,
  `end` datetime
);

CREATE TABLE `audit_file` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `id_audit_period` int,
  `file` longblob DEFAULT null,
  `name` varchar(255)
);

CREATE TABLE `securities_account` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `id_customer` varchar(255),
  `action` varchar(255),
  `investor_type` varchar(255),
  `investor_client_type` varchar(255),
  `account_local_code` varchar(255),
  `account_client_code` varchar(255),
  `investor_company_name` varchar(255),
  `investor_company_bic_code` varchar(255),
  `account_tax_code` varchar(255)
);

ALTER TABLE `log` ADD FOREIGN KEY (`id`) REFERENCES `user` (`id`);

ALTER TABLE `announcement` ADD FOREIGN KEY (`id`) REFERENCES `user` (`id`);

ALTER TABLE `board_of_director` ADD FOREIGN KEY (`id_customer`) REFERENCES `customer` (`id`);

ALTER TABLE `notification` ADD FOREIGN KEY (`id`) REFERENCES `customer` (`id`);

ALTER TABLE `customer_file` ADD FOREIGN KEY (`id_customer`) REFERENCES `customer` (`id`);

ALTER TABLE `bank_account` ADD FOREIGN KEY (`id_customer`) REFERENCES `customer` (`id`);

ALTER TABLE `log` ADD FOREIGN KEY (`id`) REFERENCES `customer_file` (`id`);

ALTER TABLE `audit_file` ADD FOREIGN KEY (`id_audit_period`) REFERENCES `audit_period` (`id`);

ALTER TABLE `securities_account` ADD FOREIGN KEY (`id_customer`) REFERENCES `customer` (`id`);
