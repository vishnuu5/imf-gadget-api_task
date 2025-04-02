import express from "express"
import {
  getAllGadgets,
  getGadget,
  createGadget,
  updateGadget,
  deleteGadget,
  selfDestruct,
} from "../controllers/gadgetController.js"
import { protect, authorize } from "../middleware/auth.js"

const router = express.Router()

// Apply authentication middleware to all routes
router.use(protect)

// Gadget routes
router.route("/").get(getAllGadgets).post(authorize("admin"), createGadget)

router.route("/:id").get(getGadget).patch(authorize("admin"), updateGadget).delete(authorize("admin"), deleteGadget)

// Self-destruct route
router.post("/:id/self-destruct", authorize("admin"), selfDestruct)

export default router

