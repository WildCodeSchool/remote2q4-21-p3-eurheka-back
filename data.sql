DROP TABLE IF EXISTS `category_events`;
CREATE TABLE IF NOT EXISTS `category_events` (
  `id_category` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(200) NOT NULL,
  PRIMARY KEY (`id_category`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `cv`
--

DROP TABLE IF EXISTS `cv`;
CREATE TABLE IF NOT EXISTS `cv` (
  `id_cv` int NOT NULL AUTO_INCREMENT,
  `path` varchar(200) NOT NULL,
  PRIMARY KEY (`id_cv`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `cv_to_user`
--

DROP TABLE IF EXISTS `cv_to_user`;
CREATE TABLE IF NOT EXISTS `cv_to_user` (
  `id_cv` int NOT NULL,
  `id_user` int NOT NULL,
  `is_owner` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_cv`,`id_user`),
  KEY `fk_user_idx` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `enterprise`
--

DROP TABLE IF EXISTS `enterprise`;
CREATE TABLE IF NOT EXISTS `enterprise` (
  `id_enterprise` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `adress` text NOT NULL,
  `id_activity` int NOT NULL,
  `Nb_employes` int NOT NULL,
  PRIMARY KEY (`id_enterprise`),
  KEY `fk_category_job_idx` (`id_activity`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `enterprise`
--

INSERT INTO `enterprise` (`id_enterprise`, `name`, `adress`, `id_activity`, `Nb_employes`) VALUES
(1, 'None', 'adresse', 15, 0),
(2, 'Eurhéka', '', 5, 1);

-- --------------------------------------------------------

--
-- Structure de la table `event`
--

DROP TABLE IF EXISTS `event`;
CREATE TABLE IF NOT EXISTS `event` (
  `id_event` int NOT NULL AUTO_INCREMENT,
  `id_cat` int NOT NULL,
  `name` varchar(200) NOT NULL,
  `date_event` datetime NOT NULL,
  PRIMARY KEY (`id_event`),
  KEY `fk_category_idx` (`id_cat`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `event_to_user`
--

DROP TABLE IF EXISTS `event_to_user`;
CREATE TABLE IF NOT EXISTS `event_to_user` (
  `id_event` int NOT NULL,
  `id_user` int NOT NULL,
  `is_owner` tinyint(1) NOT NULL DEFAULT '1',
  `is_valid` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_event`,`id_user`),
  KEY `fk_user_idx` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `job_category`
--

DROP TABLE IF EXISTS `job_category`;
CREATE TABLE IF NOT EXISTS `job_category` (
  `id_job_category` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id_job_category`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `job_category`
--

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

-- --------------------------------------------------------

--
-- Structure de la table `job_offer`
--

DROP TABLE IF EXISTS `job_offer`;
CREATE TABLE IF NOT EXISTS `job_offer` (
  `id_job_offer` int NOT NULL AUTO_INCREMENT,
  `cat_job` int NOT NULL,
  `path` varchar(200) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id_job_offer`),
  KEY `fk_job_cat` (`cat_job`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `job_to_user`
--

DROP TABLE IF EXISTS `job_to_user`;
CREATE TABLE IF NOT EXISTS `job_to_user` (
  `id_job` int NOT NULL,
  `id_user` int NOT NULL,
  `is_owner` tinyint DEFAULT '1',
  PRIMARY KEY (`id_job`,`id_user`),
  KEY `fk_user_idx` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `offer_type`
--

DROP TABLE IF EXISTS `offer_type`;
CREATE TABLE IF NOT EXISTS `offer_type` (
  `id_offer_type` int NOT NULL AUTO_INCREMENT,
  `name_offer` varchar(100) NOT NULL,
  PRIMARY KEY (`id_offer_type`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `offer_type`
--

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

-- --------------------------------------------------------

--
-- Structure de la table `offer_type_to_job`
--

DROP TABLE IF EXISTS `offer_type_to_job`;
CREATE TABLE IF NOT EXISTS `offer_type_to_job` (
  `id_job` int NOT NULL,
  `id_type` int NOT NULL,
  PRIMARY KEY (`id_job`,`id_type`),
  KEY `fk_job_type_idx` (`id_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `offer_type_to_user`
--

DROP TABLE IF EXISTS `offer_type_to_user`;
CREATE TABLE IF NOT EXISTS `offer_type_to_user` (
  `id_offer_type` int NOT NULL,
  `id_user` int NOT NULL,
  PRIMARY KEY (`id_offer_type`,`id_user`),
  KEY `fk_user_offer_type_idx` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `opinion`
--

DROP TABLE IF EXISTS `opinion`;
CREATE TABLE IF NOT EXISTS `opinion` (
  `id_opinion` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `opinion` text NOT NULL,
  `id_enterprise` int NOT NULL DEFAULT '2',
  `is_valid` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_opinion`),
  KEY `fk_user_idx` (`id_user`),
  KEY `fk_enterprise_opinion_idx` (`id_enterprise`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `report`
--

DROP TABLE IF EXISTS `report`;
CREATE TABLE IF NOT EXISTS `report` (
  `id_report` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `path` varchar(200) NOT NULL,
  PRIMARY KEY (`id_report`),
  KEY `fk_user_idx` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `resource`
--

DROP TABLE IF EXISTS `resource`;
CREATE TABLE IF NOT EXISTS `resource` (
  `id_resource` int NOT NULL AUTO_INCREMENT,
  `id_cat` int NOT NULL,
  `name` varchar(70) NOT NULL,
  `path` varchar(200) NOT NULL,
  `visibility` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_resource`),
  KEY `id_cat_idx` (`id_cat`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `resource_category`
--

DROP TABLE IF EXISTS `resource_category`;
CREATE TABLE IF NOT EXISTS `resource_category` (
  `id_resource_category` int NOT NULL AUTO_INCREMENT,
  `name_resource_category` varchar(100) NOT NULL,
  PRIMARY KEY (`id_resource_category`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `resource_category`
--

INSERT INTO `resource_category` (`id_resource_category`, `name_resource_category`) VALUES
(1, 'Vidéo'),
(2, 'Documents à télécharger'),
(3, 'Fiches métiers');

-- --------------------------------------------------------

--
-- Structure de la table `resource_to_user`
--

DROP TABLE IF EXISTS `resource_to_user`;
CREATE TABLE IF NOT EXISTS `resource_to_user` (
  `id_user` int NOT NULL,
  `id_resource` int NOT NULL,
  `is_prefered` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_user`,`id_resource`),
  KEY `fk_resource_idx` (`id_resource`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `theme`
--

DROP TABLE IF EXISTS `theme`;
CREATE TABLE IF NOT EXISTS `theme` (
  `id_theme` int NOT NULL AUTO_INCREMENT,
  `name` varchar(70) NOT NULL,
  PRIMARY KEY (`id_theme`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `theme_to_ressources`
--

DROP TABLE IF EXISTS `theme_to_ressources`;
CREATE TABLE IF NOT EXISTS `theme_to_ressources` (
  `id_theme` int NOT NULL,
  `id_ressource` int NOT NULL,
  PRIMARY KEY (`id_theme`,`id_ressource`),
  KEY `fk_resource_idx` (`id_ressource`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `theme_to_user`
--

DROP TABLE IF EXISTS `theme_to_user`;
CREATE TABLE IF NOT EXISTS `theme_to_user` (
  `id_theme` int NOT NULL,
  `id_user` int NOT NULL,
  `is_prefered` tinyint DEFAULT '0',
  PRIMARY KEY (`id_theme`,`id_user`),
  KEY `fk_user_idx` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id_users` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(70) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(14) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `user_level` tinyint NOT NULL DEFAULT '1',
  `adresse` text,
  `in_post` tinyint DEFAULT '0',
  `free_date` date DEFAULT NULL,
  `job_search` tinyint DEFAULT '0',
  `job_name` varchar(100) DEFAULT NULL,
  `job_date` date DEFAULT NULL,
  `id_enterprise` int DEFAULT NULL,
  `enterprise_name` varchar(150) DEFAULT NULL,
  `signin_options` tinyint NOT NULL DEFAULT '0',
  `token_lost` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_users`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_user_enterprise_idx` (`id_enterprise`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `user_to_job_cat`
--

DROP TABLE IF EXISTS `user_to_job_cat`;
CREATE TABLE IF NOT EXISTS `user_to_job_cat` (
  `id_user` int NOT NULL,
  `id_job_cat` int NOT NULL,
  PRIMARY KEY (`id_user`,`id_job_cat`),
  KEY `fk_job_cat_idx` (`id_job_cat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `view_admin_job`
-- (Voir ci-dessous la vue réelle)
--
DROP VIEW IF EXISTS `view_admin_job`;
CREATE TABLE IF NOT EXISTS `view_admin_job` (
`cat_job` int
,`category_name` varchar(100)
,`id_job` int
,`id_type` int
,`id_user` int
,`is_owner` tinyint
,`name` varchar(255)
,`name_offer` varchar(100)
,`path` varchar(200)
);

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `view_event_display`
-- (Voir ci-dessous la vue réelle)
--
DROP VIEW IF EXISTS `view_event_display`;
CREATE TABLE IF NOT EXISTS `view_event_display` (
`category_name` varchar(200)
,`date_event` datetime
,`date_eventFR` varchar(21)
,`id_cat` int
,`id_event` int
,`name` varchar(200)
);

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `view_event_user`
-- (Voir ci-dessous la vue réelle)
--
DROP VIEW IF EXISTS `view_event_user`;
CREATE TABLE IF NOT EXISTS `view_event_user` (
`cat` varchar(200)
,`event` datetime
,`eventid` int
,`id_users` int
,`idCategorie` int
,`is_owner` tinyint(1)
,`is_valid` tinyint(1)
,`name` varchar(200)
);

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `view_opinion`
-- (Voir ci-dessous la vue réelle)
--
DROP VIEW IF EXISTS `view_opinion`;
CREATE TABLE IF NOT EXISTS `view_opinion` (
`firstname` varchar(50)
,`id_enterprise` int
,`id_opinion` int
,`id_user` int
,`is_valid` tinyint
,`lastname` varchar(70)
,`name` varchar(150)
,`opinion` text
);

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `view_resource_theme`
-- (Voir ci-dessous la vue réelle)
--
DROP VIEW IF EXISTS `view_resource_theme`;
CREATE TABLE IF NOT EXISTS `view_resource_theme` (
`id_cat` int
,`id_resource` int
,`id_ressource` int
,`id_theme` int
,`name` varchar(70)
,`name_resource_category` varchar(100)
,`path` varchar(200)
,`themename` varchar(70)
,`visibility` int
);

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `view_user_admin`
-- (Voir ci-dessous la vue réelle)
--
DROP VIEW IF EXISTS `view_user_admin`;
CREATE TABLE IF NOT EXISTS `view_user_admin` (
`id_enterprise` int
,`id_users` int
,`name` varchar(150)
,`user_level` tinyint
,`userName` varchar(121)
);

-- --------------------------------------------------------

--
-- Structure de la vue `view_admin_job`
--
DROP TABLE IF EXISTS `view_admin_job`;

DROP VIEW IF EXISTS `view_admin_job`;
CREATE  VIEW `view_admin_job`  AS SELECT `ju`.`is_owner` AS `is_owner`, `ju`.`id_user` AS `id_user`, `ju`.`id_job` AS `id_job`, `j`.`name` AS `name`, `j`.`path` AS `path`, `o`.`name_offer` AS `name_offer`, `oj`.`id_type` AS `id_type`, `c`.`name` AS `category_name`, `j`.`cat_job` AS `cat_job` FROM ((((`job_to_user` `ju` join `job_offer` `j` on((`j`.`id_job_offer` = `ju`.`id_job`))) join `offer_type_to_job` `oj` on((`oj`.`id_job` = `j`.`id_job_offer`))) join `offer_type` `o` on((`o`.`id_offer_type` = `oj`.`id_type`))) join `job_category` `c` on((`c`.`id_job_category` = `j`.`cat_job`)))  ;

-- --------------------------------------------------------

--
-- Structure de la vue `view_event_display`
--
DROP TABLE IF EXISTS `view_event_display`;

DROP VIEW IF EXISTS `view_event_display`;
CREATE VIEW `view_event_display`  AS SELECT `e`.`id_event` AS `id_event`, `e`.`id_cat` AS `id_cat`, `e`.`name` AS `name`, date_format(`e`.`date_event`,'%d/%m/%Y %H:%i') AS `date_eventFR`, `e`.`date_event` AS `date_event`, `c`.`category_name` AS `category_name` FROM (`event` `e` join `category_events` `c` on((`e`.`id_cat` = `c`.`id_category`))) WHERE (`e`.`id_cat` <> 1)  ;

-- --------------------------------------------------------

--
-- Structure de la vue `view_event_user`
--
DROP TABLE IF EXISTS `view_event_user`;

DROP VIEW IF EXISTS `view_event_user`;
CREATE  VIEW `view_event_user`  AS SELECT `e`.`id_event` AS `eventid`, `e`.`name` AS `name`, `e`.`date_event` AS `event`, `e`.`id_cat` AS `idCategorie`, `c`.`category_name` AS `cat`, `eu`.`is_owner` AS `is_owner`, `u`.`id_users` AS `id_users`, `eu`.`is_valid` AS `is_valid` FROM (((`users` `u` join `event_to_user` `eu` on((`eu`.`id_user` = `u`.`id_users`))) join `event` `e` on((`e`.`id_event` = `eu`.`id_event`))) join `category_events` `c` on((`c`.`id_category` = `e`.`id_cat`)))  ;

-- --------------------------------------------------------

--
-- Structure de la vue `view_opinion`
--
DROP TABLE IF EXISTS `view_opinion`;

DROP VIEW IF EXISTS `view_opinion`;
CREATE VIEW `view_opinion`  AS SELECT `o`.`id_opinion` AS `id_opinion`, `o`.`is_valid` AS `is_valid`, `o`.`id_enterprise` AS `id_enterprise`, `o`.`id_user` AS `id_user`, `o`.`opinion` AS `opinion`, `u`.`firstname` AS `firstname`, `u`.`lastname` AS `lastname`, `e`.`name` AS `name` FROM ((`opinion` `o` join `users` `u` on((`o`.`id_user` = `u`.`id_users`))) join `enterprise` `e` on((`o`.`id_enterprise` = `e`.`id_enterprise`)))  ;

-- --------------------------------------------------------

--
-- Structure de la vue `view_resource_theme`
--
DROP TABLE IF EXISTS `view_resource_theme`;

DROP VIEW IF EXISTS `view_resource_theme`;
CREATE VIEW `view_resource_theme`  AS SELECT `r`.`id_resource` AS `id_resource`, `r`.`id_cat` AS `id_cat`, `r`.`name` AS `name`, `r`.`path` AS `path`, `r`.`visibility` AS `visibility`, `tt`.`id_theme` AS `id_theme`, `tt`.`id_ressource` AS `id_ressource`, `theme`.`name` AS `themename`, `resource_category`.`name_resource_category` AS `name_resource_category` FROM (((`resource` `r` left join `theme_to_ressources` `tt` on((`tt`.`id_ressource` = `r`.`id_resource`))) left join `theme` on((`theme`.`id_theme` = `tt`.`id_theme`))) join `resource_category` on((`r`.`id_cat` = `resource_category`.`id_resource_category`))) ORDER BY `r`.`id_resource` ASC  ;

-- --------------------------------------------------------

--
-- Structure de la vue `view_user_admin`
--
DROP TABLE IF EXISTS `view_user_admin`;

DROP VIEW IF EXISTS `view_user_admin`;
CREATE VIEW `view_user_admin`  AS SELECT `u`.`id_users` AS `id_users`, concat(`u`.`lastname`,' ',`u`.`firstname`) AS `userName`, `u`.`user_level` AS `user_level`, `u`.`id_enterprise` AS `id_enterprise`, `e`.`name` AS `name` FROM (`users` `u` left join `enterprise` `e` on((`u`.`id_enterprise` = `e`.`id_enterprise`)))  ;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `cv_to_user`
--
ALTER TABLE `cv_to_user`
  ADD CONSTRAINT `fk_cv_user` FOREIGN KEY (`id_cv`) REFERENCES `cv` (`id_cv`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_user_cv` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_users`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `enterprise`
--
ALTER TABLE `enterprise`
  ADD CONSTRAINT `fk_category_job_enterprise` FOREIGN KEY (`id_activity`) REFERENCES `job_category` (`id_job_category`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `fk_category_event` FOREIGN KEY (`id_cat`) REFERENCES `category_events` (`id_category`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `event_to_user`
--
ALTER TABLE `event_to_user`
  ADD CONSTRAINT `fk_event_user` FOREIGN KEY (`id_event`) REFERENCES `event` (`id_event`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_user_event` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_users`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `job_offer`
--
ALTER TABLE `job_offer`
  ADD CONSTRAINT `fk_job_cat` FOREIGN KEY (`cat_job`) REFERENCES `job_category` (`id_job_category`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `job_to_user`
--
ALTER TABLE `job_to_user`
  ADD CONSTRAINT `fk_job_user` FOREIGN KEY (`id_job`) REFERENCES `job_offer` (`id_job_offer`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_user_job` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_users`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `offer_type_to_job`
--
ALTER TABLE `offer_type_to_job`
  ADD CONSTRAINT `fk_job_type_offer` FOREIGN KEY (`id_type`) REFERENCES `offer_type` (`id_offer_type`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_offer_jobtype` FOREIGN KEY (`id_job`) REFERENCES `job_offer` (`id_job_offer`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `offer_type_to_user`
--
ALTER TABLE `offer_type_to_user`
  ADD CONSTRAINT `fk_offer_type_user` FOREIGN KEY (`id_offer_type`) REFERENCES `offer_type` (`id_offer_type`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_user_offer_type` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_users`);

--
-- Contraintes pour la table `opinion`
--
ALTER TABLE `opinion`
  ADD CONSTRAINT `fk_enterprise_opinion` FOREIGN KEY (`id_enterprise`) REFERENCES `enterprise` (`id_enterprise`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_user_opinion` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_users`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `report`
--
ALTER TABLE `report`
  ADD CONSTRAINT `fk_user_report` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_users`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `resource`
--
ALTER TABLE `resource`
  ADD CONSTRAINT `fk_cat_resource` FOREIGN KEY (`id_cat`) REFERENCES `resource_category` (`id_resource_category`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `resource_to_user`
--
ALTER TABLE `resource_to_user`
  ADD CONSTRAINT `fk_resource_user` FOREIGN KEY (`id_resource`) REFERENCES `resource` (`id_resource`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_user_resource` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_users`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `theme_to_ressources`
--
ALTER TABLE `theme_to_ressources`
  ADD CONSTRAINT `fk_resource_theme` FOREIGN KEY (`id_ressource`) REFERENCES `resource` (`id_resource`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_theme_resource` FOREIGN KEY (`id_theme`) REFERENCES `theme` (`id_theme`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `theme_to_user`
--
ALTER TABLE `theme_to_user`
  ADD CONSTRAINT `fk_theme_user` FOREIGN KEY (`id_theme`) REFERENCES `theme` (`id_theme`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_user_theme` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_users`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_user_enterprise` FOREIGN KEY (`id_enterprise`) REFERENCES `enterprise` (`id_enterprise`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `user_to_job_cat`
--
ALTER TABLE `user_to_job_cat`
  ADD CONSTRAINT `fk_job_cat_user` FOREIGN KEY (`id_job_cat`) REFERENCES `job_category` (`id_job_category`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_user_job_cat` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_users`) ON DELETE RESTRICT ON UPDATE RESTRICT;

INSERT INTO `category_events` (id_category,`category_name`) VALUES
(1,'RDV');

