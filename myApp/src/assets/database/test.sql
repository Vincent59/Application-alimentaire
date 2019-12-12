
CREATE TABLE IF NOT EXISTS `recette` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `nom` varchar(255) NOT NULL,
  `nb_pers` REAL NOT NULL,
  `source` varchar(255) NOT NULL,
  `page` varchar(255) DEFAULT NULL
  );

INSERT or IGNORE INTO `recette` VALUES (1,'Riz épicé au poulet',2,'Cuisine des étudiants','80'),(2,'Pizza patates chorizo',4,'Cuisine des étudiants','82');


CREATE TABLE IF NOT EXISTS `um` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `nom` varchar(255) NOT NULL
  );

INSERT or IGNORE INTO `um` VALUES (1,'unité'),(2,'gramme'),(3,'CàC'),(4,'pincée'),(5,'CàS'),(6,'tranche'),(7,'centilitre'),(8,'brin'),(9,'feuille');


CREATE TABLE IF NOT EXISTS `ingredients` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `nom` varchar(255) NOT NULL,
  `um_id` int(11) NOT NULL,
  CONSTRAINT `fk_Ingrédients_UM1` FOREIGN KEY (`um_id`) REFERENCES `um` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);
CREATE INDEX IF NOT EXISTS `fk_Ingrédients_UM1_idx` ON `ingredients` (`um_id`);

INSERT or IGNORE INTO `ingredients` VALUES (1,'Concombre',1),(2,'Carottes',1),(3,'Feuilles de menthe',2),(4,'Blanc de poulet',2),(5,'Riz',2),(6,'Yaourt',2),(7,'Miel clair',3),(8,'Piment',4),(9,'Patates',1),(10,'Oignon',1),(11,'Chorizo',2),(12,'Tomate',1),(13,'Gruyère',2),(14,'Poivre noir',4),(15,'Tortillas',1),(16,'Crème fraiche',5),(17,'Vinaigre de balsamique',3),(18,'Roquette',2);



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

INSERT or IGNORE INTO `recette_ingredients` VALUES (1,1,'1/3'),(1,2,'2'),(1,3,'20'),(1,4,'200'),(1,5,'250'),(1,6,'150'),(1,7,'1'),(1,8,'1'),(2,9,'3'),(2,10,'1/2'),(2,11,'50'),(2,12,'3'),(2,13,'25'),(2,14,'4'),(2,15,'4'),(2,16,'6'),(2,17,'2'),(2,18,'25');
