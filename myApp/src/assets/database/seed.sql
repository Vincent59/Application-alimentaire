﻿
CREATE TABLE IF NOT EXISTS `recette` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `nom` varchar(255) NOT NULL,
  `nb_pers` REAL NOT NULL,
  `source` varchar(255) NOT NULL,
  `page` varchar(255) DEFAULT NULL
  );

INSERT or IGNORE INTO `recette` VALUES (1,'Riz épicé au poulet',2,'Cuisine des étudiants','80'),(2,'Pizza patates chorizo',4,'Cuisine des étudiants','82'),(3,'Sauté de poulet au sésame',2,'Cuisine des étudiants','90'),(4,'Pâtes brocolis et prosciutto',2,'Cuisine des étudiants','114'),(5,'Croissants épinard brie',2,'Cuisine des étudiants','120'),(6,'Pizza putanesca',2,'Cuisine des étudiants','122'),(7,'Bagel au thon',4,'Cuisine des étudiants','130'),(8,'Salade de pêches prosciutto',2,'Cuisine des étudiants','134'),(9,'Pâtes noisettes',4,'Cuisine des étudiants','138'),(10,'Poulet sauce aigre-douce',4,'Cuisine des étudiants','140'),(11,'Croque Madame tomate',4,'Cuisine des étudiants','154'),(12,'Burger champignons',4,'Cuisine des étudiants','156'),(13,'Burger poulet citron',4,'Cuisine des étudiants','168'),(14,'Oeufs pochés',1,'Venez diner dans 20 min','51'),(15,'Croque madame classique',2,'Venez diner dans 20 min','53'),(16,'Omelette nature',1,'Venez diner dans 20 min','55'),(17,'Burritos',4,'Venez diner dans 20 min','58'),(18,'Shaksouka',4,'Venez diner dans 20 min','60'),(19,'Poêlée patate pancetta et oignon rouge',2,'Venez diner dans 20 min','62'),(20,'Gazpacho',4,'Venez diner dans 20 min','80'),(21,'Sopa al couarto de hora',4,'Venez diner dans 20 min','84'),(22,'Salade waldorf',4,'Venez diner dans 20 min','92'),(23,'Salade tomate mozarella oignon rouge',4,'Venez diner dans 20 min','93'),(24,'Salade de semoule aux pépites de grenade',5,'Venez diner dans 20 min','94'),(25,'Salade Asiatique épicée au poulet',4,'Venez diner dans 20 min','98'),(26,'Taboulé poivron chèvre',4,'Venez diner dans 20 min','99'),(27,'Salade thon artichauts',4,'Venez diner dans 20 min','102'),(28,'Salade maquereaux herbes',4,'Venez diner dans 20 min','115'),(29,'Escalope de poulet sauce citron',4,'Cuisine des étudiants','100'),(30,'Boeuf à la thailandaise sur feuille de laitue',5,'Venez diner dans 20 min',''),(31,'Pad thaï',4,'Venez diner dans 20 min','129'),(32,'Pâtes petits pois pancetta',4,'Venez diner dans 20 min','140'),(33,'Fajitas au poulet',4,'Venez diner dans 20 min','142'),(34,'Curry de haricots tomate et épinards',4,'Venez diner dans 20 min','148'),(35,'Pizza margherita',1,'Venez diner dans 20 min','152'),(36,'Saumun cajun',4,'Venez diner dans 20 min','157'),(37,'Crevette à la marocaine',5,'Venez diner dans 20 min','171'),(38,'Tarte à la tomate feta et pesto rouge',6,'Venez diner dans 20 min','183'),(39,'Spaghettis à la crème et au saumon fumé',4,'Venez diner dans 20 min','190'),(40,'Salade Thai de Bœuf aux nouilles',2,'Cuisine des étudiants','48'),(41,'Salade de lentilles à la feta',2,'Cuisine des étudiants','52'),(42,'Linguine au chèvre et aux tomates',2,'Cuisine des étudiants','64'),(43,'Linguine au thon',2,'Cuisine des étudiants','70'),(44,'Riz cantonais express',2,'Cuisine des étudiants','74'),(45,'Gnocchis à la sauce tomate et aux épinards',4,'Cuisine des étudiants','76'),(46,'Nouille Dan Dan',4,'Venez diner dans 20 min','123'),(47,'Risotto',4,'Venez diner dans 20 min','130'),(48,'Gratin de potimarron au comté',4,'Internet','http://www.epicurien.be/blog/recettes/gratins/gratin-de-potiron-au-parmesan.asp'),(49,'Boeuf bourguignon',6,'Internet','http://cuisine.journaldesfemmes.fr/recette/346736-boeuf-bourguignon');


CREATE TABLE IF NOT EXISTS `um` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `nom` varchar(255) NOT NULL
  );

INSERT or IGNORE INTO `um` VALUES (1,'Unité'),(2,'Gramme'),(3,'CAC'),(4,'Pincée'),(5,'CAS'),(6,'Tranche'),(7,'Centilitre'),(8,'Brin'),(9,'Feuille');


CREATE TABLE IF NOT EXISTS `ingredients` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `nom` varchar(255) NOT NULL,
  `um_id` int(11) NOT NULL,
  CONSTRAINT `fk_Ingrédients_UM1` FOREIGN KEY (`um_id`) REFERENCES `um` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);
CREATE INDEX IF NOT EXISTS `fk_Ingrédients_UM1_idx` ON `ingredients` (`um_id`);

INSERT or IGNORE INTO `ingredients` VALUES (1,'Concombre',1),(2,'Carottes',1),(3,'Feuilles de menthe',2),(4,'Blanc de poulet',2),(5,'Riz',2),(6,'Yaourt',2),(7,'Miel clair',3),(8,'Piment',4),(9,'Patates',1),(10,'Oignon',1),(11,'Chorizo',2),(12,'Tomate',1),(13,'Gruyère',2),(14,'Poivre noir',4),(15,'Tortillas',1),(16,'Crème fraiche',5),(17,'Vinaigre de balsamique',3),(18,'Roquette',2),(19,'Pates',2),(20,'Huile de tournesol',3),(21,'Citron vert',1),(22,'Sauce soja',5),(23,'Graines de sésame',5),(24,'Coriandre',1),(25,'Brocolis',2),(26,"Huile d'olive",5),(27,'Ail',1),(28,'Prosciutto',6),(29,'Parmesan',5),(30,'Epinards',2),(31,'Beurre',2),(32,'Croissant',1),(33,'Brie',6),(34,'Pâte à pizza',1),(35,'Sauce tomate',5),(36,'Anchois',1),(37,'Olives',1),(38,'Capres',2),(39,'Tomate séchée',2),(40,'Feuille de basilic',1),(41,'Bagels',1),(42,'Thon',2),(43,'Mayonnaise',7),(44,'Jus de citron',7),(45,'Pêche',1),(46,'Mozzarella',2),(47,'Pignon de pin',5),(48,'Vinaigrette',7),(49,'Citron',1),(50,'Persil',2),(51,'Noisette',2),(52,'Poivrons',1),(53,'Ketchup',5),(54,'Vinaigre de malt',5),(55,'Sucre roux',5),(56,'Ananas',1),(57,'Pois gourmand',2),(58,'Noix de cajou',2),(59,'Cheddar',2),(60,'Pain de campagne',6),(61,'Jambon Blanc',6),(62,'Oeufs',1),(63,'Champignon',2),(64,'Oignon rouge',1),(65,'Pain burger',1),(66,'Salade',2),(67,'Emmental',1),(68,'Moutarde',3),(69,'Pain de mie',6),(70,'Bacon fumé',6),(71,'Paprika',3),(72,'Tomate pelée',2),(73,'Sucre',3),(74,'Pancetta',2),(75,'Vinaigre de xeres',5),(76,'Bouillon de volaille',7),(77,'Pommes',1),(78,'Branche de celeri',1),(79,'Grappe de raisin rouge',1),(80,'Noix',1),(81,'Coeur de laitue',1),(82,'Tomate cerise',1),(83,'Semoule de blé',2),(84,'Bouillon de légumes',7),(85,'Abricots secs',2),(86,'Germe de soja',2),(87,'Cacahuètes',2),(88,'Sucre en poudre',2),(89,'Boulgour',2),(90,'Fromage de chèvre',2),(91,'Haricots verts',2),(92,'Haricots blancs',2),(93,'Coeurs artichaut',2),(94,'Aneth',2),(95,'Ciboulette',2),(96,'Betterave cuite',2),(97,'Filet de poulet',1),(98,'Farine',2),(99,'Botte oignon',1),(100,'Gingembre',2),(101,'Boeuf haché',2),(102,'Nouilles de riz',2),(103,'Petits pois',2),(104,'Lardons',2),(105,'Origan séché',3),(106,'Piment de cayenne',3),(107,'Sauce salsa',7),(108,'Cumin',3),(109,'Curry',3),(110,'Piment',1),(111,'Coriandre en poudre',3),(112,'Curcuma en poudre',3),(113,'Yaourt nature',1),(114,'Ail en poudre',3),(115,'Thym séché',3),(116,'Sel',3),(117,'Pavé de saumon',1),(118,'Crevettes roses décortiquées',2),(119,'Pâte feuillettée',1),(120,'Pesto rouge',5),(121,'Feta',2),(122,'Spaghettis',2),(123,'Capres',5),(124,'Filets de maquereaux fumés',2),(125,'Jambon de serrano',6),(126,'Sauce Nuoc mam',3),(127,'Steak',2),(128,'Sauce thai',5),(129,'Lentilles',2),(130,'Radis',2),(131,'Linguine',2),(132,'Basilic',1),(133,'Mascarpone',2),(134,'Gnocchis',2),(135,'Nouilles Chinoises',2),(136,'Porc Haché',2),(137,'Oignon nouveau',1),(138,'Tahini (crème de sesame)',5),(139,'Fécule de mais',5),(140,'Huile de sesame',3),(141,'Huile pimentée',3),(142,'Vin blanc',7),(143,'Potiron',2),(144,'Comté',2),(145,'Bœuf Bourguignon',2),(146,'Vin rouge',7),(147,'Bouillon de viande',7),(148,'Bouquet Garni',1);



CREATE TABLE IF NOT EXISTS `recette_ingredients` (
  `id_recette` int(11) NOT NULL,
  `id_ingredient` int(11) NOT NULL,
  `qte_ingredient` REAL NOT NULL,
  PRIMARY KEY (`id_recette`,`id_ingredient`),
  CONSTRAINT `fk_Recette_unique_has_Ingrédients_Ingrédients1` FOREIGN KEY (`id_ingredient`) REFERENCES `ingredients` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Recette_unique_has_Ingrédients_Recette_unique` FOREIGN KEY (`id_recette`) REFERENCES `recette` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);
CREATE INDEX IF NOT EXISTS `fk_Recette_unique_has_Ingrédients_Ingrédients1_idx` ON `recette_ingredients` (`id_ingredient`);
CREATE INDEX IF NOT EXISTS `fk_Recette_unique_has_Ingrédients_Recette_unique_idx` ON `recette_ingredients` (`id_recette`);

INSERT or IGNORE INTO `recette_ingredients` VALUES (1,1,'1/3'),(1,2,'2'),(1,3,'20'),(1,4,'200'),(1,5,'250'),(1,6,'150'),(1,7,'1'),(1,8,'1'),(2,9,'3'),(2,10,'1/2'),(2,11,'50'),(2,12,'3'),(2,13,'25'),(2,14,'4'),(2,15,'4'),(2,16,'6'),(2,17,'2'),(2,18,'25'),(3,2,'3'),(3,4,'2'),(3,7,'2'),(3,19,'175'),(3,20,'2'),(3,21,'2'),(3,22,'1'),(3,23,'3'),(3,24,'1/4'),(4,19,'150'),(4,25,'125'),(4,26,'3'),(4,27,'1/6'),(4,28,'4'),(4,29,'3'),(5,27,'3/6'),(5,30,'100'),(5,31,'5'),(5,32,'2'),(5,33,'6'),(6,27,'1/6'),(6,34,'2'),(6,35,'8'),(6,36,'6'),(6,37,'12'),(6,39,'100'),(6,40,'10'),(6,123,'50'),(7,10,'1'),(7,12,'2'),(7,13,'15'),(7,41,'4'),(7,42,'200'),(7,43,'10'),(7,44,'5'),(8,18,'100'),(8,28,'4'),(8,45,'2'),(8,46,'125'),(8,47,'2'),(8,48,'10'),(9,19,'1'),(9,26,'10'),(9,29,'50'),(9,50,'80'),(9,51,'100'),(10,4,'4'),(10,10,'1'),(10,27,'2/6'),(10,52,'2'),(10,53,'9'),(10,54,'3'),(10,55,'4'),(10,56,'2/10'),(10,57,'100'),(10,58,'30'),(11,12,'2'),(11,20,'1'),(11,31,'50'),(11,43,'3'),(11,50,'1/2'),(11,59,'100'),(11,60,'8'),(11,61,'8'),(11,62,'4'),(12,12,'3'),(12,26,'2'),(12,27,'1/6'),(12,63,'50'),(12,64,'1/2'),(12,65,'4'),(12,66,'50'),(12,67,'4'),(12,68,'1'),(13,4,'4'),(13,43,'4'),(13,49,'3/2'),(13,60,'3'),(13,62,'1'),(13,65,'4'),(13,68,'1'),(14,62,'4'),(15,13,'200'),(15,20,'1'),(15,31,'10'),(15,61,'4'),(15,62,'4'),(15,68,'1'),(15,69,'8'),(16,26,'1'),(16,62,'4'),(17,13,'100'),(17,15,'4'),(17,16,'1'),(17,20,'2'),(17,53,'6'),(17,62,'4'),(17,70,'12'),(17,71,'1'),(18,10,'1'),(18,26,'2'),(18,27,'2'),(18,50,'1/4'),(18,52,'2'),(18,62,'4'),(18,72,'400'),(18,73,'1'),(19,9,'500'),(19,29,'50'),(19,52,'1/2'),(19,64,'1'),(19,74,'50'),(20,1,'1'),(20,12,'1000'),(20,26,'3'),(20,27,'2'),(20,52,'1'),(20,62,'1'),(20,75,'4'),(21,5,'20'),(21,50,'1/4'),(21,62,'2'),(21,76,'100'),(21,125,'3'),(22,43,'6'),(22,49,'1'),(22,77,'2'),(22,78,'4'),(22,79,'1'),(22,80,'3'),(22,81,'2'),(23,12,'8'),(23,17,'3'),(23,18,'50'),(23,26,'3'),(23,40,'10'),(23,46,'60'),(23,64,'1'),(23,82,'6'),(24,24,'2/6'),(24,26,'1'),(24,47,'8'),(24,49,'1'),(24,83,'300'),(24,84,'50'),(24,85,'100'),(25,1,'1'),(25,2,'1'),(25,3,'10'),(25,4,'400'),(25,24,'1/6'),(25,52,'1'),(25,81,'1'),(25,82,'15'),(25,86,'100'),(25,87,'50'),(26,3,'10'),(26,10,'2'),(26,26,'2'),(26,49,'1'),(26,52,'2'),(26,71,'1'),(26,76,'30'),(26,89,'250'),(26,90,'125'),(27,19,'220'),(27,39,'10'),(27,40,'10'),(27,42,'200'),(27,44,'10'),(27,50,'15'),(27,68,'1'),(27,91,'100'),(27,92,'400'),(27,93,'250'),(28,9,'550'),(28,17,'5'),(28,66,'60'),(28,93,'200'),(28,94,'10'),(28,95,'10'),(28,96,'200'),(29,26,'1'),(29,49,'1'),(29,71,'1/2'),(29,97,'4'),(30,2,'1'),(30,20,'2'),(30,22,'2'),(30,24,'15'),(30,25,'100'),(30,27,'1/6'),(30,44,'10'),(30,73,'1'),(30,81,'1/2'),(30,87,'1'),(30,99,'1'),(30,100,'5'),(30,101,'400'),(31,20,'3'),(31,21,'1'),(31,24,'1/6'),(31,55,'1'),(31,62,'2'),(31,87,'150'),(31,93,'3'),(31,99,'1'),(31,102,'300'),(31,126,'2'),(32,19,'300'),(32,26,'2'),(32,27,'2/8'),(32,29,'50'),(32,31,'10'),(32,103,'150'),(32,104,'200'),(33,15,'8'),(33,20,'2'),(33,21,'1'),(33,26,'2'),(33,52,'1'),(33,64,'1'),(33,71,'1'),(33,97,'2'),(33,105,'1'),(33,106,'1'),(33,107,'20'),(33,108,'2'),(34,10,'1'),(34,12,'3'),(34,20,'3'),(34,30,'100'),(34,92,'400'),(34,109,'5'),(34,111,'1'),(34,112,'1/2'),(34,113,'2.5'),(35,34,'1'),(35,35,'10'),(35,40,'1/6'),(35,46,'150'),(36,26,'2'),(36,71,'1'),(36,106,'1'),(36,114,'1'),(36,115,'1/2'),(36,116,'1/2'),(36,117,'4'),(37,24,'1/6'),(37,26,'4'),(37,27,'3/8'),(37,50,'1/6'),(37,71,'1/2'),(37,100,'1'),(37,108,'1'),(37,111,'1/2'),(37,118,'500'),(38,12,'3'),(38,26,'1'),(38,119,'1'),(38,120,'2'),(38,121,'100'),(39,16,'15'),(39,29,'5'),(39,49,'1/2'),(39,94,'15'),(39,117,'2'),(39,122,'300'),(39,123,'1'),(40,21,'1'),(40,24,'0.3'),(40,102,'125'),(40,110,'1'),(40,126,'2'),(40,127,'300'),(40,128,'3'),(41,17,'2'),(41,37,'50'),(41,52,'2'),(41,81,'2'),(41,121,'200'),(41,129,'400'),(41,130,'100'),(42,37,'10'),(42,82,'250'),(42,90,'50'),(42,123,'1'),(42,131,'200'),(42,132,'1'),(43,10,'0.5'),(43,42,'200'),(43,49,'1'),(43,94,'20'),(43,131,'150'),(44,5,'100'),(44,22,'2'),(44,27,'1'),(44,62,'1'),(44,63,'175'),(44,88,'10'),(44,100,'4'),(44,103,'200'),(44,104,'200'),(45,27,'2'),(45,29,'4'),(45,30,'200'),(45,72,'400'),(45,132,'0.5'),(45,133,'140'),(45,134,'500'),(46,17,'1'),(46,22,'4'),(46,25,'200'),(46,27,'2'),(46,76,'15'),(46,87,'50'),(46,88,'1'),(46,100,'2.5'),(46,135,'300'),(46,136,'350'),(46,137,'1'),(46,138,'1'),(46,139,'1'),(46,140,'2'),(46,141,'2'),(47,4,'300'),(47,5,'400'),(47,10,'1'),(47,27,'2'),(47,29,'40'),(47,31,'25'),(47,50,'10'),(47,63,'300'),(47,84,'80'),(47,142,'15'),(48,16,'2'),(48,62,'4'),(48,143,'1200'),(48,144,'150'),(49,2,'2'),(49,10,'10'),(49,27,'2'),(49,31,'60'),(49,63,'250'),(49,98,'60'),(49,104,'200'),(49,145,'1500'),(49,146,'50'),(49,147,'50'),(49,148,'1');
