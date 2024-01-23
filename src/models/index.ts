import { Sequelize } from "sequelize";
import config from "../config";
import user from "./user";
import contactList from "./contactList";
import globalContacts from "./globalContacts";

const sequelize = new Sequelize(
  config.database.name,
  config.database.user,
  config.database.password,
  {
    host: config.database.host,
    dialect: "mysql",
  }
);

const db: any = { sequelize, Sequelize };
db.user = user(sequelize);
db.contactList = contactList(sequelize);
db.globalContacts = globalContacts(sequelize)

;export default db;
