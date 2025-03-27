-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: todo_app
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `logs`
--

DROP TABLE IF EXISTS `logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `action` varchar(255) NOT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logs`
--

LOCK TABLES `logs` WRITE;
/*!40000 ALTER TABLE `logs` DISABLE KEYS */;
INSERT INTO `logs` VALUES (1,2,'Created task: buy sav some flowers','2025-03-18 08:34:10'),(2,2,'Updated task ID 34: New Title - buy sav and mom some flowers','2025-03-18 08:37:13'),(3,2,'Updated task ID 34: New Title - buy sav and mom some flowers','2025-03-18 08:37:14'),(4,5,'Created task: na parw game sto play','2025-03-18 09:30:09'),(5,5,'Created task: na parw dwro sth marianna','2025-03-18 09:30:22'),(6,5,'Updated task ID 36: New Title - na parw dwro sth marianna kai ston mpampa','2025-03-18 09:31:16'),(7,2,'Created subtask: \"tshirts, bag, deorant\" for Task ID: 30','2025-03-18 14:30:35'),(8,2,'Created task: apply to KIT','2025-03-18 14:34:11'),(9,2,'Created task: go for swimming','2025-03-18 14:50:37'),(10,5,'Created subtask: \"on monday, tuesday, wednesday\" for Task ID: 38','2025-03-18 14:51:05'),(11,5,'Created task: go for swimming','2025-03-18 14:52:55'),(12,5,'Created subtask: \"test test 12\" for Task ID: 39','2025-03-18 14:53:15'),(13,5,'Deleted subtask 19','2025-03-18 14:56:04'),(14,5,'Deleted subtask 18','2025-03-18 15:03:45'),(15,5,'Created subtask: liposan, krema mallia for Task ID: 36','2025-03-18 15:04:48'),(16,5,'Created task: go to grandma','2025-03-18 15:49:04'),(17,5,'Created subtask: giagia mariana for Task ID: 40','2025-03-18 15:49:23'),(18,5,'Admin updated Task ID 36','2025-03-19 13:32:33'),(19,5,'Admin updated Subtask ID 21 under Task ID 36','2025-03-19 14:13:50'),(20,2,'Admin updated Subtask ID 17 under Task ID 30','2025-03-19 14:17:11'),(21,2,'Admin deleted Task ID 32','2025-03-19 14:22:09'),(22,5,'Admin deleted Subtask ID 21 under Task ID undefined','2025-03-19 14:27:32'),(23,2,'Created task: go to the gym at 12','2025-03-21 08:54:04'),(24,2,'Created task: go to friends house','2025-03-21 09:34:53'),(25,2,'Created task: go to friends house','2025-03-21 09:36:11'),(26,2,'Created task: go to friends house','2025-03-21 09:40:05'),(27,2,'Created task: go to friends house','2025-03-21 09:42:10'),(28,2,'Created task: go to friends house','2025-03-21 09:42:26'),(29,2,'Created task: go to friends house','2025-03-21 09:54:59'),(30,2,'Created task: go to friends house','2025-03-21 09:59:22'),(31,2,'Created task: go to friends house','2025-03-21 10:05:40'),(32,2,'Created task: go to friends house','2025-03-21 10:07:00'),(33,2,'Created task: go to friends house','2025-03-21 10:17:47'),(34,2,'Created task: go to friends house','2025-03-21 10:18:32'),(35,6,'Created task: hello thats a test task','2025-03-21 11:56:26'),(36,6,'Created task: thats a second test task','2025-03-21 11:56:40'),(37,7,'Created task: thats a second test task','2025-03-21 11:58:49'),(38,7,'Admin updated Task ID 55','2025-03-21 12:01:04'),(39,7,'Admin updated Task ID 55','2025-03-21 12:03:47'),(40,7,'Admin updated Task ID 55','2025-03-21 12:05:26'),(41,7,'Admin updated Task ID 55','2025-03-21 12:06:02'),(42,7,'Admin updated Task ID 55','2025-03-21 12:20:09'),(43,7,'Admin updated Task ID 55','2025-03-21 12:25:45'),(44,7,'Admin updated Task ID 55','2025-03-21 12:25:54'),(45,7,'Admin updated Task ID 55','2025-03-21 12:27:48'),(46,7,'Admin updated Task ID 55','2025-03-21 13:04:11'),(47,7,'Created task: i need to fix the mail problem','2025-03-21 13:05:42'),(48,7,'Deleted task ID 55','2025-03-21 13:06:52'),(49,7,'Deleted task ID 56','2025-03-21 13:07:23'),(50,2,'Created task: im expecting a single email as admin','2025-03-21 13:13:19'),(51,2,'Updated task ID 57: New Title - updated task 57','2025-03-21 13:14:27'),(52,2,'Completed task ID 57','2025-03-21 13:15:04'),(53,2,'Deleted task ID 57','2025-03-21 13:15:30'),(54,2,'Created task: test task for subtask mails','2025-03-21 13:16:38'),(55,2,'Created subtask: checking the subtask for Task ID: 58','2025-03-21 13:17:13'),(56,2,'Updated subtask 23','2025-03-21 13:18:01'),(57,2,'Completed subtask 23','2025-03-21 13:18:16'),(58,2,'Deleted subtask 23','2025-03-21 13:18:47'),(59,7,'Created task: new one with chatgpt idea','2025-03-21 13:40:36'),(60,7,'Created task: new one with chatgpt idea 2','2025-03-21 13:45:10'),(61,7,'Created task: new one with chatgpt idea 2','2025-03-21 13:47:14'),(62,7,'Created task: new one with chatgpt idea 2','2025-03-21 13:48:20'),(63,7,'Admin updated Task ID 62','2025-03-21 13:51:35'),(64,7,'Created task: new one with chatgpt idea 5','2025-03-21 13:53:58'),(65,2,'Created task: new one with chatgpt idea 5','2025-03-21 13:55:52'),(66,2,'Created task: new one with chatgpt idea 5','2025-03-21 14:02:23'),(67,7,'Created task: fixed test final','2025-03-21 14:03:19'),(68,7,'Updated task ID 66: New Title - update check','2025-03-21 14:03:50'),(69,7,'Completed task ID 66','2025-03-21 14:04:03'),(70,7,'Deleted task ID 66','2025-03-21 14:04:13'),(71,7,'Admin updated Task ID 62','2025-03-21 14:10:54'),(72,7,'Created subtask: by fixing the env file for Task ID: 62','2025-03-21 14:18:20'),(73,7,'Admin updated Subtask ID 24 under Task ID 62','2025-03-21 14:20:09'),(74,7,'Admin updated Subtask ID 24 under Task ID 62','2025-03-21 14:22:07'),(75,7,'Admin deleted Task ID 59','2025-03-21 14:31:12'),(76,7,'Admin deleted Task ID 60','2025-03-21 14:33:20'),(77,7,'Admin deleted Subtask ID 24 under Task ID 62','2025-03-21 14:39:37'),(78,2,'Admin has created a new task: trying create task as admin for aristeidis.','2025-03-27 09:10:53'),(79,2,'Admin has created a new subtask under Task ID: 62.','2025-03-27 09:35:13'),(80,2,'Admin has created a new subtask under Task ID: 62.','2025-03-27 09:36:55'),(81,2,'Admin has created a new subtask under Task ID: 62.','2025-03-27 09:38:01'),(82,7,'Admin has created a new subtask under Task ID: 62.','2025-03-27 09:44:25'),(83,7,'Admin has created a new task: final task testing.','2025-03-27 09:56:42');
/*!40000 ALTER TABLE `logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `message` text NOT NULL,
  `status` enum('unread','read') DEFAULT 'unread',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subtasks`
--

DROP TABLE IF EXISTS `subtasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subtasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `task_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `status` enum('pending','completed') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `task_id` (`task_id`),
  CONSTRAINT `subtasks_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subtasks`
--

LOCK TABLES `subtasks` WRITE;
/*!40000 ALTER TABLE `subtasks` DISABLE KEYS */;
INSERT INTO `subtasks` VALUES (17,30,'test subtask update for admin','pending','2025-03-18 14:30:35','2025-03-19 14:17:11'),(25,62,'test subtask creation','pending','2025-03-27 09:35:13','2025-03-27 09:35:13'),(26,62,'test subtask creation','pending','2025-03-27 09:36:55','2025-03-27 09:36:55'),(27,62,'test subtask creation','pending','2025-03-27 09:38:01','2025-03-27 09:38:01'),(28,62,'test subtask creation','pending','2025-03-27 09:44:25','2025-03-27 09:44:25');
/*!40000 ALTER TABLE `subtasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `status` enum('pending','completed') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (13,3,'call mum and go shopping','','pending','2025-02-24 14:05:30','2025-03-19 13:17:49'),(14,3,'call george','for payment issues','pending','2025-02-24 14:05:52','2025-03-04 14:07:27'),(21,2,'go for shopping','nike adidas','pending','2025-03-04 09:23:59','2025-03-04 09:23:59'),(23,4,'buy gift for bf','shoes loafers','pending','2025-03-04 09:47:05','2025-03-04 09:47:05'),(29,3,'go to the mall with tzw','','pending','2025-03-04 14:20:52','2025-03-19 10:57:00'),(30,2,'buy army clothes and soap','','pending','2025-03-04 14:39:12','2025-03-19 10:55:34'),(31,2,'filippa','','pending','2025-03-04 14:39:25','2025-03-04 14:39:25'),(33,2,'mother','','pending','2025-03-04 14:39:35','2025-03-04 14:39:35'),(34,2,'buy sav and mom some flowers','black and white','pending','2025-03-18 08:34:10','2025-03-18 08:36:43'),(35,5,'na parw game sto play','','pending','2025-03-18 09:30:09','2025-03-18 09:30:09'),(36,5,'call mum and go shopping','','pending','2025-03-18 09:30:22','2025-03-19 13:30:05'),(37,2,'apply to KIT','','pending','2025-03-18 14:34:11','2025-03-18 14:34:11'),(38,2,'go for swimming','','pending','2025-03-18 14:50:37','2025-03-18 14:50:37'),(40,5,'go to grandma','','pending','2025-03-18 15:49:04','2025-03-18 15:49:04'),(41,2,'go to the gym at 12','','pending','2025-03-21 08:54:04','2025-03-21 08:54:04'),(42,2,'go to friends house','','pending','2025-03-21 09:34:53','2025-03-21 09:34:53'),(43,2,'go to friends house','','pending','2025-03-21 09:36:11','2025-03-21 09:36:11'),(44,2,'go to friends house','','pending','2025-03-21 09:40:05','2025-03-21 09:40:05'),(45,2,'go to friends house','','pending','2025-03-21 09:42:10','2025-03-21 09:42:10'),(46,2,'go to friends house','','pending','2025-03-21 09:42:26','2025-03-21 09:42:26'),(47,2,'go to friends house','','pending','2025-03-21 09:54:59','2025-03-21 09:54:59'),(48,2,'go to friends house','','pending','2025-03-21 09:59:22','2025-03-21 09:59:22'),(49,2,'go to friends house','','pending','2025-03-21 10:05:40','2025-03-21 10:05:40'),(50,2,'go to friends house','','pending','2025-03-21 10:07:00','2025-03-21 10:07:00'),(51,2,'go to friends house','','pending','2025-03-21 10:17:47','2025-03-21 10:17:47'),(52,2,'go to friends house','','pending','2025-03-21 10:18:32','2025-03-21 10:18:32'),(53,6,'hello thats a test task','','pending','2025-03-21 11:56:26','2025-03-21 11:56:26'),(54,6,'thats a second test task','','pending','2025-03-21 11:56:40','2025-03-21 11:56:40'),(58,2,'test task for subtask mails','','pending','2025-03-21 13:16:38','2025-03-21 13:16:38'),(61,7,'new one with chatgpt idea 2','','pending','2025-03-21 13:47:14','2025-03-21 13:47:14'),(62,7,'and fixed it','','pending','2025-03-21 13:48:20','2025-03-21 14:10:54'),(63,7,'new one with chatgpt idea 5','','pending','2025-03-21 13:53:58','2025-03-21 13:53:58'),(64,2,'new one with chatgpt idea 5','','pending','2025-03-21 13:55:52','2025-03-21 13:55:52'),(65,2,'new one with chatgpt idea 5','','pending','2025-03-21 14:02:23','2025-03-21 14:02:23'),(67,5,'trying create task as admin for aristeidis','','pending','2025-03-27 09:10:53','2025-03-27 09:10:53'),(68,7,'final task testing','','pending','2025-03-27 09:56:42','2025-03-27 09:56:42');
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'John Doe','john@example.com','$2b$10$7aHmYnK11NvRU3BXPQPdvepZQl6CPhBqtAd4VpW6QqEc3IX6UAroa','user','2025-02-24 09:22:34'),(2,'Vasilis Koutsos','koutsosbilly@gmail.com','$2b$10$dAAHQ9VrdUogpboTj1zJVe6svqJXU62BXbSc4xM36dpcCnwIt5pGq','admin','2025-02-24 09:36:43'),(3,'Panos Gantsos','pg@gmail.com','$2b$10$/h7HoRXGPnSVO8wIlvRddOz4/vFcZPiLhxRnVN7MSlgz8ecIJjDDi','user','2025-02-24 14:04:41'),(4,'maria savvidou','ms@gmail.com','$2b$10$yBGsd18/SRhjv6DGTnF2LOEcdkR5uK8qcCk3tHyMoZXEcv5uVOWIC','user','2025-03-04 09:45:54'),(5,'aris koutsos','arkou@gmail.com','$2b$10$QzZnSd0RRsAF6BTldPA6geCwZGAIyFbTLmr/nR90qvazqWYHMreTu','user','2025-03-18 09:28:46'),(6,'Test Mail','liyay31413@doishy.com','$2b$10$KzTSqCKBoeHOAjz5972nIetFQ298hljkwfTcvvq0jycNnwNYG5rMi','user','2025-03-21 11:55:39'),(7,'test mail 2','pixoka1340@evluence.com','$2b$10$0BojHII25i7A/qb.ekVRD.FD43CY6ZPosJXHnIC0P2vxyayKAYrEO','user','2025-03-21 11:58:23');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-27 13:11:10
