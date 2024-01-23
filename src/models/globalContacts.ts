import { DataTypes, Model, Sequelize } from "sequelize";

export default function (sequelize: Sequelize): typeof Model {
  const GlobalContacts = sequelize.define(
    "globalContacts",
    {
      GlobalContactId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isSpam: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isRegistered: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      contactListId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },

    {
      tableName: "globalContacts",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return GlobalContacts;
}
