import { Sequelize } from "sequelize";
import { ENV } from '../config/env.js';
import userModel from '../models/user.model.js';
import contentModel from "./content.model.js";
import inboxModel from '../models/inbox.model.js';

const connection = new Sequelize(
  ENV.DB_NAME,
  ENV.DB_USER,
  ENV.DB_PASSWORD,
  {
      host: ENV.DB_HOST,
      dialect: ENV.DB_DIALECT
  }
);

try {
  await connection.authenticate();
  console.log('La connexion à la base de données a été établie !');
} catch (error) {
  console.error('Impossible de se connecter à la base de données :', error);
}

userModel(connection, Sequelize); // lancement de la méthode userModel qui va créer l'objet modèle User avec la connection Sequelize intégrée
inboxModel(connection, Sequelize);
const {
    User,
    Inbox,
    Content,
} = connection.models; // Ajout des modèles dans une propriété models, par exemple User sera disponible dans connection.models.User

User.hasMany(Inbox, { foreignKey: 'inboxFromId', as: "inboxFrom" });
User.hasMany(Inbox, { foreignKey: 'inboxToId', as: "inboxTo"  });
// Inbox.belongsTo(User);
Inbox.hasMany(Inbox, { as: ""  });
Inbox.belongsTo(Inbox, { as: "thread"  });

/* ------------------------------------- */
/* SYNCHRONISATION DE LA BASE DE DONNEES */
/* ------------------------------------- */
// await connection.sync( {alter:true} ); // force la création/modification des tables et de leurc hamps. Attention peut créer des problèmes sur les clés uniques, à désactiver une fois les tables crées
await connection.sync(); // synchronise la base de données par rapport à nos modèles mais ne force pas la création modification, à activer une fois les tables et champs crée
console.log('Synchronisation OK');

export {
    User,
    Content,
    Inbox,
}