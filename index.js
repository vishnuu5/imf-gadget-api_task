import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { sequelize } from "./models/index.js"
import authRoutes from "./routes/authRoutes.js"
import gadgetRoutes from "./routes/gadgetRoutes.js"
import errorHandler from "./middleware/errorHandler.js"

// Load environment variables
dotenv.config()

// Initialize Express app
const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(helmet()) // Security headers
app.use(cors()) // Enable CORS
app.use(morgan("dev")) // Logging
app.use(express.json()) // Parse JSON bodies
app.use(express.urlencoded({ extended: true })) // Parse URL-encoded bodies

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/gadgets", gadgetRoutes)

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the IMF Gadget API",
    documentation: "/api/docs",
    version: "1.0.0",
  })
})

// Error handling middleware
app.use(errorHandler)

// Database connection and server start
const startServer = async () => {
  try {
    await sequelize.authenticate()
    console.log("Database connection established successfully.")

    // Sync database models (in development)
    if (process.env.NODE_ENV === "development") {
      await sequelize.sync({ alter: true })
      console.log("Database models synchronized.")
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error("Unable to connect to the database:", error)
    process.exit(1)
  }
}

startServer()

export default app

