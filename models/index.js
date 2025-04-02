import sequelize from "../config/database.js"
import Gadget from "./gadget.js"
import User from "./user.js"

// Define relationships between models if needed
// For example: User.hasMany(Gadget);

export { sequelize, Gadget, User }

