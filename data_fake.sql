INSERT INTO `resource` (`id_resource`, `id_cat`, `name`, `path`, `visibility`) VALUES
(11, 2, 'cvbcvb', 'cvbcvb', 0),
(12, 1, 'Vidéo 1', 'dsf', 1),
(13, 2, 'PDF 1', 'zeze', 3),
(14, 1, 'Vidéo 2', 'er', 1),
(15, 2, 'PDF 2', 'zeze', 1),
(16, 1, 'Vidéo fsdsfd', 'sdfsdf', 3),
(17, 1, 'Vidéo gfddsf', 'dff', 2),
(18, 2, 'PDF erfsdgdxdf', 'fdsfgfsdgfg', 3),
(19, 1, 'Vidéodsqfdfqsdf', 'sdfsdf', 3),
(20, 2, 'PDF zrzer', 'eter', 1),
(21, 1, 'Vidéodqdqd', 'sdf', 1),
(22, 2, 'PDF fdfgdfgfg', 'dsfgd', 1),
(23, 1, 'Vidéosdfsdf', 'sdfsdf', 1),
(24, 2, 'PDF\r\nhfghgfh', 'qsdqsdqsd', 1),
(25, 1, 'Vidéo sqdfqsdsd', 'qsfsddf', 1);

INSERT INTO `theme` (`id_theme`, `name`) VALUES
(1, 'RH'),
(2, 'TEST TH'),
(3, 'TEST2 THEME'),
(4, 'TEST 3 THEME');


INSERT INTO `theme_to_ressources` (`id_theme`, `id_ressource`) VALUES
(1, 15),
(3, 15),
(4, 17);
