-- MySQL Script generated by MySQL Workbench
-- Mon Feb 21 15:43:57 2022
-- Model: Eurheka!    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';


-- -----------------------------------------------------
-- Table `category_events`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `category_events` ;

CREATE TABLE IF NOT EXISTS `category_events` (
  `id_category` INT NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id_category`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `event`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `event` ;

CREATE TABLE IF NOT EXISTS `event` (
  `id_event` INT NOT NULL AUTO_INCREMENT,
  `id_cat` INT NOT NULL,
  `name` VARCHAR(200) NOT NULL,
  `date_event` DATETIME NOT NULL,
  PRIMARY KEY (`id_event`),
  INDEX `fk_category_idx` (`id_cat` ASC) VISIBLE,
  CONSTRAINT `fk_category_event`
    FOREIGN KEY (`id_cat`)
    REFERENCES `category_events` (`id_categoriy`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `job_category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `job_category` ;

CREATE TABLE IF NOT EXISTS `job_category` (
  `id_job_category` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id_job_category`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `enterprise`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `enterprise` ;

CREATE TABLE IF NOT EXISTS `enterprise` (
  `id_enterprise` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  `adress` TEXT NOT NULL,
  `id_activity` INT NOT NULL,
  `Nb_employes` INT NOT NULL,
  PRIMARY KEY (`id_enterprise`),
  INDEX `fk_category_job_idx` (`id_activity` ASC) VISIBLE,
  CONSTRAINT `fk_category_job_enterprise`
    FOREIGN KEY (`id_activity`)
    REFERENCES `job_category` (`id_job_category`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `users` ;

CREATE TABLE IF NOT EXISTS `users` (
  `id_users` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(50) NOT NULL,
  `lastname` VARCHAR(70) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(14) NULL,
  `birthday` DATE NULL,
  `user_level` TINYINT NOT NULL DEFAULT 1,
  `adresse` TEXT NULL,
  `in_post` TINYINT NULL DEFAULT 0,
  `free_date` DATE NULL,
  `job_search` TINYINT NULL DEFAULT 0,
  `job_name` VARCHAR(100) NULL,
  `job_date` DATE NULL,
  `id_enterprise` INT NULL,
  `enterprise_name` VARCHAR(150) NULL,
  `signin_options` TINYINT NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_users`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `fk_user_enterprise_idx` (`id_enterprise` ASC) VISIBLE,
  CONSTRAINT `fk_user_enterprise`
    FOREIGN KEY (`id_enterprise`)
    REFERENCES `enterprise` (`id_enterprise`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `event_to_user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `event_to_user` ;

CREATE TABLE IF NOT EXISTS `event_to_user` (
  `id_event` INT NOT NULL,
  `id_user` INT NOT NULL,
  PRIMARY KEY (`id_event`, `id_user`),
  INDEX `fk_user_idx` (`id_user` ASC) VISIBLE,
  CONSTRAINT `fk_event_user`
    FOREIGN KEY (`id_event`)
    REFERENCES `event` (`id_event`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_user_event`
    FOREIGN KEY (`id_user`)
    REFERENCES `users` (`id_users`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `report`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `report` ;

CREATE TABLE IF NOT EXISTS `report` (
  `id_report` INT NOT NULL AUTO_INCREMENT,
  `id_user` INT NOT NULL,
  `path` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id_report`),
  INDEX `fk_user_idx` (`id_user` ASC) VISIBLE,
  CONSTRAINT `fk_user_report`
    FOREIGN KEY (`id_user`)
    REFERENCES `users` (`id_users`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `job_offer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `job_offer` ;

CREATE TABLE IF NOT EXISTS `job_offer` (
  `id_job_offer` INT NOT NULL AUTO_INCREMENT,
  `path` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id_job_offer`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `job_to_user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `job_to_user` ;

CREATE TABLE IF NOT EXISTS `job_to_user` (
  `id_job` INT NOT NULL,
  `id_user` INT NOT NULL,
  `is_owner` TINYINT NULL DEFAULT 1,
  PRIMARY KEY (`id_job`, `id_user`),
  INDEX `fk_user_idx` (`id_user` ASC) VISIBLE,
  CONSTRAINT `fk_job_user`
    FOREIGN KEY (`id_job`)
    REFERENCES `job_offer` (`id_job_offer`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_user_job`
    FOREIGN KEY (`id_user`)
    REFERENCES `users` (`id_users`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cv`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cv` ;

CREATE TABLE IF NOT EXISTS `cv` (
  `id_cv` INT NOT NULL AUTO_INCREMENT,
  `path` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id_cv`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cv_to_user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cv_to_user` ;

CREATE TABLE IF NOT EXISTS `cv_to_user` (
  `id_cv` INT NOT NULL,
  `id_user` INT NOT NULL,
  `is_owner` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_cv`, `id_user`),
  INDEX `fk_user_idx` (`id_user` ASC) VISIBLE,
  CONSTRAINT `fk_user_cv`
    FOREIGN KEY (`id_user`)
    REFERENCES `users` (`id_users`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_cv_user`
    FOREIGN KEY (`id_cv`)
    REFERENCES `cv` (`id_cv`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `opinion`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `opinion` ;

CREATE TABLE IF NOT EXISTS `opinion` (
  `id_opinion` INT NOT NULL AUTO_INCREMENT,
  `id_user` INT NOT NULL,
  `opinion` TEXT NOT NULL,
  `id_enterprise` INT NOT NULL DEFAULT 2,
  `is_valid` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id_opinion`),
  INDEX `fk_user_idx` (`id_user` ASC) VISIBLE,
  INDEX `fk_enterprise_opinion_idx` (`id_enterprise` ASC) VISIBLE,
  CONSTRAINT `fk_user_opinion`
    FOREIGN KEY (`id_user`)
    REFERENCES `users` (`id_users`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_enterprise_opinion`
    FOREIGN KEY (`id_enterprise`)
    REFERENCES `enterprise` (`id_enterprise`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `theme`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `theme` ;

CREATE TABLE IF NOT EXISTS `theme` (
  `id_theme` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(70) NOT NULL,
  PRIMARY KEY (`id_theme`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `theme_to_user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `theme_to_user` ;

CREATE TABLE IF NOT EXISTS `theme_to_user` (
  `id_theme` INT NOT NULL,
  `id_user` INT NOT NULL,
  `is_prefered` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`id_theme`, `id_user`),
  INDEX `fk_user_idx` (`id_user` ASC) VISIBLE,
  CONSTRAINT `fk_theme_user`
    FOREIGN KEY (`id_theme`)
    REFERENCES `theme` (`id_theme`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_user_theme`
    FOREIGN KEY (`id_user`)
    REFERENCES `users` (`id_users`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `resource_category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `resource_category` ;

CREATE TABLE IF NOT EXISTS `resource_category` (
  `id_resource_category` INT NOT NULL AUTO_INCREMENT,
  `name_resource_category` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id_resource_category`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `resource`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `resource` ;

CREATE TABLE IF NOT EXISTS `resource` (
  `id_resource` INT NOT NULL AUTO_INCREMENT,
  `id_cat` INT NOT NULL,
  `name` VARCHAR(70) NOT NULL,
  `path` VARCHAR(200) NOT NULL,
  `visibility` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id_resource`),
  INDEX `id_cat_idx` (`id_cat` ASC) VISIBLE,
  CONSTRAINT `fk_cat_resource`
    FOREIGN KEY (`id_cat`)
    REFERENCES `resource_category` (`id_resource_category`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `theme_to_ressources`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `theme_to_ressources` ;

CREATE TABLE IF NOT EXISTS `theme_to_ressources` (
  `id_theme` INT NOT NULL,
  `id_ressource` INT NOT NULL,
  PRIMARY KEY (`id_theme`, `id_ressource`),
  INDEX `fk_resource_idx` (`id_ressource` ASC) VISIBLE,
  CONSTRAINT `fk_resource_theme`
    FOREIGN KEY (`id_ressource`)
    REFERENCES `resource` (`id_resource`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_theme_resource`
    FOREIGN KEY (`id_theme`)
    REFERENCES `theme` (`id_theme`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `resource_to_user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `resource_to_user` ;

CREATE TABLE IF NOT EXISTS `resource_to_user` (
  `id_user` INT NOT NULL,
  `id_resource` INT NOT NULL,
  `is_prefered` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id_user`, `id_resource`),
  INDEX `fk_resource_idx` (`id_resource` ASC) VISIBLE,
  CONSTRAINT `fk_resource_user`
    FOREIGN KEY (`id_resource`)
    REFERENCES `resource` (`id_resource`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_user_resource`
    FOREIGN KEY (`id_user`)
    REFERENCES `users` (`id_users`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `offer_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `offer_type` ;

CREATE TABLE IF NOT EXISTS `offer_type` (
  `id_offer_type` INT NOT NULL AUTO_INCREMENT,
  `name_offer` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id_offer_type`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `offer_type_to_job`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `offer_type_to_job` ;

CREATE TABLE IF NOT EXISTS `offer_type_to_job` (
  `id_job` INT NOT NULL,
  `id_type` INT NOT NULL,
  PRIMARY KEY (`id_job`, `id_type`),
  INDEX `fk_job_type_idx` (`id_type` ASC) VISIBLE,
  CONSTRAINT `fk_job_type_offer`
    FOREIGN KEY (`id_type`)
    REFERENCES `offer_type` (`id_offer_type`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_offer_jobtype`
    FOREIGN KEY (`id_job`)
    REFERENCES `job_offer` (`id_job_offer`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user_to_job_cat`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user_to_job_cat` ;

CREATE TABLE IF NOT EXISTS `user_to_job_cat` (
  `id_user` INT NOT NULL,
  `id_job_cat` INT NOT NULL,
  PRIMARY KEY (`id_user`, `id_job_cat`),
  INDEX `fk_job_cat_idx` (`id_job_cat` ASC) VISIBLE,
  CONSTRAINT `fk_user_job_cat`
    FOREIGN KEY (`id_user`)
    REFERENCES `users` (`id_users`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_job_cat_user`
    FOREIGN KEY (`id_job_cat`)
    REFERENCES `job_category` (`id_job_category`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `offer_type_to_user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `offer_type_to_user` ;

CREATE TABLE IF NOT EXISTS `offer_type_to_user` (
  `id_offer_type` INT NOT NULL,
  `id_user` INT NOT NULL,
  PRIMARY KEY (`id_offer_type`, `id_user`),
  INDEX `fk_user_offer_type_idx` (`id_user` ASC) VISIBLE,
  CONSTRAINT `fk_user_offer_type`
    FOREIGN KEY (`id_user`)
    REFERENCES `users` (`id_users`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_offer_type_user`
    FOREIGN KEY (`id_offer_type`)
    REFERENCES `offer_type` (`id_offer_type`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------
-- Feedind `job_category`, `offer_type`
-- -----------------------------------------------
INSERT INTO `job_category` (`id_job_category`, `name`) VALUES
(1, 'Agriculture, agroalimentaire'),
(2, 'Armée, sécurité'),
(3, 'Art, Design'),
(4, 'Audiovisuel, Spectacle, Cinéma'),
(5, 'Audit, Conseil, Expertise'),
(6, 'Automobile'),
(7, 'Banque, Assurance'),
(8, 'BTP, architecture'),
(9, 'Chimie, pharmacie'),
(10, 'Commerce, distribution, e-commerce'),
(11, 'Construction aéronautique, ferroviaire et navale'),
(12, 'Culture, Artisanat d\'art'),
(13, 'Droit, justice'),
(14, 'Edition, Journalisme'),
(15, 'Electronique, Electrotechnique'),
(16, 'Energie'),
(17, 'Enseignement'),
(18, 'Environnement'),
(19, 'Habillement, Mode'),
(20, 'Hôtellerie, Restauration, Tourisme'),
(21, 'Informatique, Numérique et Réseaux'),
(22, 'Logistique, transport'),
(23, 'Maintenance, entretien'),
(24, 'Marketing, publicité, Communication'),
(25, 'Matériaux, Transformations'),
(26, 'Mécanique'),
(27, 'Santé, médical'),
(28, 'Social, Services à la personne'),
(29, 'Sport et loisirs');

DROP VIEW IF EXISTS `view_opinion`;
CREATE ALGORITHM=UNDEFINED  VIEW `view_opinion`  AS SELECT `o`.`id_opinion` AS `id_opinion`, `o`.`is_valid` AS `is_valid`, `o`.`id_enterprise` AS `id_enterprise`, `o`.`id_user` AS `id_user`, `o`.`opinion` AS `opinion`, `u`.`firstname` AS `firstname`, `u`.`lastname` AS `lastname`, `e`.`name` AS `name` FROM ((`opinion` `o` join `users` `u` on((`o`.`id_user` = `u`.`id_users`))) join `enterprise` `e` on((`o`.`id_enterprise` = `e`.`id_enterprise`)))  ;


INSERT INTO `offer_type` (`id_offer_type`, `name_offer`) VALUES
(1, 'Temps plein'),
(2, 'Temps partiel'),
(3, 'CDI'),
(4, 'CDD'),
(5, 'Interim'),
(6, 'Indépendant'),
(7, 'Service civique'),
(8, 'Alternance'),
(9, 'Stage');

INSERT INTO `enterprise` (`id_enterprise`, `name`, `adress`, `id_activity`, `Nb_employes`) VALUES
(1, 'None', '', 15, 0),
(2, 'Eurhéka', '', 5, 1);
