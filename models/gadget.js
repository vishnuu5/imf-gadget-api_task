import { DataTypes } from "sequelize"
import { v4 as uuidv4 } from "uuid"
import sequelize from "../config/database.js"

const Gadget = sequelize.define(
  "Gadget",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    codename: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Available", "Deployed", "Destroyed", "Decommissioned"),
      defaultValue: "Available",
    },
    decommissionedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  },
)

export default Gadget

