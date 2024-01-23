import { DataTypes, Sequelize } from "sequelize";

export default function (sequelize: Sequelize) {
  return sequelize.define(
    "contactList",
    {
      ContactListId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      contacts: {
        type: DataTypes.JSON,
        defaultValue: null,
      },
    },
    {
      tableName: "contactList",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
}
