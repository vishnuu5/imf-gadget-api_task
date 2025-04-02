import { Gadget } from "../models/index.js"
import { generateCodename, generateConfirmationCode } from "../utils/codeGenerator.js"

// Get all gadgets
export const getAllGadgets = async (req, res, next) => {
  try {
    const { status } = req.query

    // Build query based on status filter if provided
    const query = status ? { where: { status } } : {}

    const gadgets = await Gadget.findAll(query)

    // Add mission success probability to each gadget
    const gadgetsWithProbability = gadgets.map((gadget) => {
      const successProbability = Math.floor(Math.random() * 100) + 1 // 1-100%
      const gadgetData = gadget.toJSON()
      return {
        ...gadgetData,
        missionSuccessProbability: `${successProbability}%`,
      }
    })

    res.status(200).json({
      success: true,
      count: gadgetsWithProbability.length,
      data: gadgetsWithProbability,
    })
  } catch (error) {
    next(error)
  }
}

// Get a single gadget
export const getGadget = async (req, res, next) => {
  try {
    const gadget = await Gadget.findByPk(req.params.id)

    if (!gadget) {
      return res.status(404).json({
        success: false,
        message: "Gadget not found",
      })
    }

    // Add mission success probability
    const successProbability = Math.floor(Math.random() * 100) + 1 // 1-100%
    const gadgetData = gadget.toJSON()

    res.status(200).json({
      success: true,
      data: {
        ...gadgetData,
        missionSuccessProbability: `${successProbability}%`,
      },
    })
  } catch (error) {
    next(error)
  }
}

// Create a new gadget
export const createGadget = async (req, res, next) => {
  try {
    const { name, description } = req.body

    // Generate a unique codename
    const codename = generateCodename()

    const gadget = await Gadget.create({
      name,
      description,
      codename,
      status: "Available",
    })

    res.status(201).json({
      success: true,
      message: "Gadget created successfully",
      data: gadget,
    })
  } catch (error) {
    next(error)
  }
}

// Update a gadget
export const updateGadget = async (req, res, next) => {
  try {
    const { name, description, status } = req.body

    const gadget = await Gadget.findByPk(req.params.id)

    if (!gadget) {
      return res.status(404).json({
        success: false,
        message: "Gadget not found",
      })
    }

    // Update gadget
    await gadget.update({
      name: name || gadget.name,
      description: description || gadget.description,
      status: status || gadget.status,
    })

    res.status(200).json({
      success: true,
      message: "Gadget updated successfully",
      data: gadget,
    })
  } catch (error) {
    next(error)
  }
}

// Delete a gadget (mark as decommissioned)
export const deleteGadget = async (req, res, next) => {
  try {
    const gadget = await Gadget.findByPk(req.params.id)

    if (!gadget) {
      return res.status(404).json({
        success: false,
        message: "Gadget not found",
      })
    }

    // Mark as decommissioned instead of deleting
    await gadget.update({
      status: "Decommissioned",
      decommissionedAt: new Date(),
    })

    res.status(200).json({
      success: true,
      message: "Gadget decommissioned successfully",
      data: gadget,
    })
  } catch (error) {
    next(error)
  }
}

// Trigger self-destruct sequence
export const selfDestruct = async (req, res, next) => {
  try {
    const { confirmationCode } = req.body
    const gadget = await Gadget.findByPk(req.params.id)

    if (!gadget) {
      return res.status(404).json({
        success: false,
        message: "Gadget not found",
      })
    }

    // If no confirmation code provided, generate one and return it
    if (!confirmationCode) {
      const code = generateConfirmationCode()
      return res.status(200).json({
        success: true,
        message: "Self-destruct sequence initiated. Confirmation required.",
        confirmationCode: code,
        note: "Please confirm self-destruct by sending this code in the request body.",
      })
    }

    // If confirmation code provided, validate it (in a real app, store and validate)
    // For this demo, we'll accept any code provided

    // Update gadget status to Destroyed
    await gadget.update({
      status: "Destroyed",
    })

    res.status(200).json({
      success: true,
      message: `Gadget ${gadget.codename} has been destroyed. This message will self-destruct in 5 seconds.`,
      data: gadget,
    })
  } catch (error) {
    next(error)
  }
}

