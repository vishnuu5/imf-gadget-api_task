import jwt from "jsonwebtoken"
import { User } from "../models/index.js"

// Register a new user
export const register = async (req, res, next) => {
  try {
    const { username, password, role } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ where: { username } })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      })
    }

    // Create new user
    const user = await User.create({
      username,
      password,
      role: role || "agent",
    })

    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    })

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
    })
  } catch (error) {
    next(error)
  }
}

// Login user
export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body

    // Check if user exists
    const user = await User.findOne({ where: { username } })
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      })
    }

    // Check if password is correct
    const isMatch = await user.isValidPassword(password)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      })
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    })

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    })
  } catch (error) {
    next(error)
  }
}

// Get current user
export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    res.status(200).json({
      success: true,
      data: user,
    })
  } catch (error) {
    next(error)
  }
}

