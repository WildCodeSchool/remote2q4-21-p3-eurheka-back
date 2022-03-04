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

INSERT INTO `users` (`id_users`, `firstname`, `lastname`, `email`, `password`, `phone`, `birthday`, `user_level`, `adresse`, `in_post`, `free_date`, `job_search`, `job_name`, `job_date`, `id_enterprise`, `enterprise_name`, `signin_options`) VALUES
(1, 'Pierre', 'Dupont', 'pdupont@gmail.com', '$argon2id$v=19$m=65536,t=5,p=1$TjBtb7+zxRDu+ruGC6w6/w$/gLrwRKGswrdhW6OqIoMUuPKqoMUoyTvfFvGmjD2huI', NULL, NULL, 1, NULL, 0, NULL, 0, NULL, NULL, NULL, NULL, 7),
(4, 'jean', 'Némarre', 'jean.nemarre@gmail.com', '$argon2id$v=19$m=65536,t=5,p=1$PDNntMzECe/hvaNaZUkxnQ$sT4D7lEjO3OFQENYEqVQUDQbW1FK75ghUp/Fe52Wjak', NULL, NULL, 2, NULL, 0, NULL, 0, NULL, NULL, NULL, NULL, 3),
(5, 'jean', 'Cérien', 'jean.cerien@gmail.com', '$argon2id$v=19$m=65536,t=5,p=1$HvvTsaK9/0Xc1hZx8ZHqgg$gfp2/WvoOLYP6Lvm3LDGIKf9lpBhAPECTESNTNA/ZHc', NULL, NULL, 2, NULL, 0, NULL, 0, NULL, NULL, NULL, NULL, 2),
(6, 'Jérémie', 'Piazza', 'jeremie@gmail.com', '$argon2id$v=19$m=65536,t=5,p=1$vZNOjRxkfrnoAUN7+dsrxg$Z5SmKLyLIcFZQ6Xz2KCY4D8y/Aw8FQIHzaxw5fXMA7U', NULL, NULL, 2, NULL, 0, NULL, 0, NULL, NULL, NULL, NULL, 1),
(7, 'a', 'b', 'ab@b.com', '$argon2id$v=19$m=65536,t=5,p=1$LQZcR0ErvGgZZhUmP+lKSA$u/DzN3UQpZGeKLFRWuO8fAQAdGD2VNKSPV61T9NrDIE', NULL, NULL, 2, NULL, 0, NULL, 0, NULL, NULL, NULL, NULL, 1),
(8, 'a', 'v', 'av@b.com', '$argon2id$v=19$m=65536,t=5,p=1$ZiJAZPuvPNRXiUtWQrhPwA$hWt9iNEhfSyPh35F46vNv5kZ9Alcq3rJGvoUMHbs3uw', NULL, NULL, 2, NULL, 0, NULL, 0, NULL, NULL, NULL, NULL, 1),
(9, 'titi', 'Toto', 'toto@gmail.com', '$argon2id$v=19$m=65536,t=5,p=1$mBk+Q4oDHB/0Vgq/y0NNwA$LJJBZ1aNhE98odOLnDXkp61vhsjs0FhKg0nhAMG9i3Y', NULL, NULL, 2, NULL, 0, NULL, 0, NULL, NULL, NULL, NULL, 1),
(10, 'titi', 'Toto', 'toto2@gmail.com', '$argon2id$v=19$m=65536,t=5,p=1$CeuyhQxON2gkIlALwRayMw$NlpBYc7Y1UnJBYo5nDdm72MMZjMaBiMw3lgTKQ/67ss', NULL, NULL, 2, NULL, 0, NULL, 0, NULL, NULL, NULL, NULL, 1),
(11, 'toto', 'tutu', 'baba@free.fr', '$argon2id$v=19$m=65536,t=5,p=1$bdMdajVyC7Z6NYFKbDm/6Q$pymfsEkOXSFa44q2x6ZHIM5WlyMOVKVzeW1CavyLBtc', NULL, NULL, 5, NULL, 0, NULL, 0, NULL, NULL, NULL, NULL, 1);

INSERT INTO `opinion` (`id_opinion`, `id_user`, `opinion`, `id_enterprise`, `is_valid`) VALUES
(1, 1, 'Sed erat ante, porta in ultrices id, porttitor at lacus. Vivamus tellus lacus, mollis in lectus nec, molestie pulvinar nibh. Nunc tempus tempus odio, nec faucibus ante molestie ac. Sed vitae nulla lorem. Nam et scelerisque risus. Etiam convallis, ex in vehicula convallis, ipsum dui aliquet mi, et hendrerit quam lectus pellentesque lacus. Phasellus ullamcorper, nibh id ultrices iaculis, urna lacus molestie massa, quis scelerisque arcu est ac sapien. ', 2, 1),
(5, 5, 'Très bonne entreprise', 2, 1),
(6, 10, 'Expérience parfaite', 2, 1),
(7, 8, 'A refaire', 2, 0),
(8, 7, 'A refaire', 2, 0);