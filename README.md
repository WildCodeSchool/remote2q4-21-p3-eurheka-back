Eurheka Back End.
Ce dépot contient la partie back-end du projet Eurheka!

Prérequis :
Node.js : https://nodejs.org/en/download/
MySQL : https://dev.mysql.com/downloads/mysql/

Dependances :
    - argon2
    - cookie-parser
    - cors
    - dotenv
    - express
    - joi
    - jsonwebtoken
    - multer
    - mysql2
    - nodemailer
    - nodemon
Clonage du dépot :
    git clone https://github.com/WildCodeSchool/remote2q4-21-p3-eurheka-back.git

Déploiement :
    Dans le repertoire de destination, créer les répertoires suivants, à la racine du projet :
    uploads/jobs/
    uploads/cvs/
    uploads/docs/
    uploads/offers/

    Configurer le fichier .env avec les informations nécessaires (connexion à la base de données, serveur messagerie SMTP).

    Executer la commande npm install

La structure de la base de données est contenue dans le fichier data.sql

Lancement
npm start

Lien vers le dépot front : 
https://github.com/WildCodeSchool/remote2q4-21-p3-eurheka-front/