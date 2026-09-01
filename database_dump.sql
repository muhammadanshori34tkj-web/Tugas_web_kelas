/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.8.6-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: tugas_web_tkj3
-- ------------------------------------------------------
-- Server version	11.8.6-MariaDB-6 from Debian

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `siswa`
--

DROP TABLE IF EXISTS `siswa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `siswa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama_lengkap` varchar(100) NOT NULL,
  `nama_panggilan` varchar(50) DEFAULT NULL,
  `kelas` varchar(20) NOT NULL DEFAULT 'XI TKJ 3',
  `keahlian` varchar(100) DEFAULT NULL,
  `skill` text DEFAULT NULL,
  `minat_hobi` text DEFAULT NULL,
  `cita_cita` varchar(150) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `siswa`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `siswa` WRITE;
/*!40000 ALTER TABLE `siswa` DISABLE KEYS */;
INSERT INTO `siswa` VALUES
(1,'Aang Burhanudin Badsah',NULL,'XI TKJ 3',NULL,NULL,NULL,NULL,NULL,'aang-burhanudin-badsah.jpg','2026-08-31 23:57:48'),
(2,'Adinda Ramadhani',NULL,'XI TKJ 3',NULL,NULL,NULL,NULL,NULL,'adinda-ramadhani.jpg','2026-08-31 23:57:48'),
(3,'Anantadewa Wiwasata Putra Maharani',NULL,'XI TKJ 3',NULL,NULL,NULL,NULL,NULL,'anantadewa-wiwasata-putra-maharani.jpg','2026-08-31 23:57:48'),
(4,'Annisa Ramadhani Putri Adiwanto',NULL,'XI TKJ 3',NULL,NULL,NULL,NULL,NULL,'annisa-ramadhani-putri-adiwanto.jpg','2026-08-31 23:57:48'),
(5,'Ariel Ardanta Nurrohman Reyhandy',NULL,'XI TKJ 3',NULL,NULL,NULL,NULL,NULL,'ariel-ardanta-nurrohman-reyhandy.jpg','2026-08-31 23:57:48'),
(6,'Bima Gusto Mahatsafa',NULL,'XI TKJ 3',NULL,NULL,NULL,NULL,NULL,'bima-gusto-mahatsafa.jpg','2026-08-31 23:57:48'),
(7,'Byantara Al Hakim Nadhif',NULL,'XI TKJ 3',NULL,NULL,NULL,NULL,NULL,'byantara-al-hakim-nadhif.jpg','2026-08-31 23:57:48'),
(8,'Cleosya Kapita Bilqist',NULL,'XI TKJ 3',NULL,NULL,NULL,NULL,NULL,'cleosya-kapita-bilqist.jpg','2026-08-31 23:57:48'),
(9,'Devina Aurelia Hapsari',NULL,'XI TKJ 3',NULL,NULL,NULL,NULL,NULL,'devina-aurelia-hapsari.jpg','2026-08-31 23:57:48'),
(10,'Ezar Brilliant Sugiono',NULL,'XI TKJ 3',NULL,NULL,NULL,NULL,NULL,'ezar-brilliant-sugiono.jpg','2026-08-31 23:57:48'),
(11,'Farhan Auliya Abrar',NULL,'XI TKJ 3',NULL,NULL,NULL,NULL,NULL,'farhan-auliya-abrar.jpg','2026-08-31 23:57:48'),
(12,'Flavia Annisa Kurniawan',NULL,'XI TKJ 3',NULL,NULL,NULL,NULL,NULL,'flavia-annisa-kurniawan.jpg','2026-08-31 23:57:48'),
(13,'Gusti Putra Khakim Khaqiqi',NULL,'XI TKJ 3',NULL,NULL,NULL,NULL,NULL,'gusti-putra-khakim-khaqiqi.jpg','2026-08-31 23:57:48'),
(14,'Hatta Muhlasin Luhtari',NULL,'XI TKJ 3',NULL,NULL,NULL,NULL,NULL,'hatta-muhlasin-luhtari.jpg','2026-08-31 23:57:48'),
(15,'Intan Alshani Raffisya',NULL,'XI TKJ 3',NULL,NULL,NULL,NULL,NULL,'intan-alshani-raffisya.jpg','2026-08-31 23:57:48'),
(16,'Iqbal Ilmi',NULL,'XI TKJ 3',NULL,NULL,NULL,NULL,NULL,'iqbal-ilmi.jpg','2026-08-31 23:57:48'),
(17,'Ivander Ardell Alvaro',NULL,'XI TKJ 3',NULL,NULL,NULL,NULL,NULL,'ivander-ardell-alvaro.jpg','2026-08-31 23:57:48'),
(18,'Kenza Almira Yasmin',NULL,'XI TKJ 3',NULL,NULL,NULL,NULL,NULL,'kenza-almira-yasmin.jpg','2026-08-31 23:57:48'),
(19,'M. Rafa Rizky Effendi',NULL,'XI TKJ 3',NULL,NULL,NULL,NULL,NULL,'m-rafa-rizky-effendi.jpg','2026-08-31 23:57:48'),
(20,'Mochammad Davin Al Fida',NULL,'XI TKJ 3',NULL,NULL,NULL,NULL,NULL,'mochammad-davin-al-fida.jpg','2026-08-31 23:57:48'),
(21,'Muhammad Faris Anshori',NULL,'XI TKJ 3',NULL,NULL,NULL,NULL,NULL,'muhammad-faris-anshori.jpg','2026-08-31 23:57:48'),
(22,'Muhammad Hamizan Zuhri',NULL,'XI TKJ 3',NULL,NULL,NULL,NULL,NULL,'muhammad-hamizan-zuhri.jpg','2026-08-31 23:57:48'),
(23,'Muhammad Kemal Faza',NULL,'XI TKJ 3',NULL,NULL,NULL,NULL,NULL,'muhammad-kemal-faza.jpg','2026-08-31 23:57:48'),
(24,'Muhammad Rifqi Nasywan Athallah',NULL,'XI TKJ 3',NULL,NULL,NULL,NULL,NULL,'muhammad-rifqi-nasywan-athallah.jpg','2026-08-31 23:57:48'),
(25,'Nazriel Abiy Putra Veangga',NULL,'XI TKJ 3',NULL,NULL,NULL,NULL,NULL,'nazriel-abiy-putra-veangga.jpg','2026-08-31 23:57:48'),
(26,'Nizar Zulmi Firmansyah',NULL,'XI TKJ 3',NULL,NULL,NULL,NULL,NULL,'nizar-zulmi-firmansyah.jpg','2026-08-31 23:57:48'),
(27,'Radine Dygtastya Rahmadhani',NULL,'XI TKJ 3',NULL,NULL,NULL,NULL,NULL,'radine-dygtastya-rahmadhani.jpg','2026-08-31 23:57:48'),
(28,'Rahel Maryam',NULL,'XI TKJ 3',NULL,NULL,NULL,NULL,NULL,'rahel-maryam.jpg','2026-08-31 23:57:48'),
(29,'Satria Banyu Seki',NULL,'XI TKJ 3',NULL,NULL,NULL,NULL,NULL,'satria-banyu-seki.jpg','2026-08-31 23:57:48'),
(30,'Valvizzy Piscesio Lois',NULL,'XI TKJ 3',NULL,NULL,NULL,NULL,NULL,'valvizzy-piscesio-lois.jpg','2026-08-31 23:57:48'),
(31,'Yohan Alim Wijaya',NULL,'XI TKJ 3',NULL,NULL,NULL,NULL,NULL,'yohan-alim-wijaya.jpg','2026-08-31 23:57:48'),
(32,'Ziyadatul Ilman Nafiah',NULL,'XI TKJ 3',NULL,NULL,NULL,NULL,NULL,'ziyadatul-ilman-nafiah.jpg','2026-08-31 23:57:48');
/*!40000 ALTER TABLE `siswa` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2026-09-01 10:15:26
