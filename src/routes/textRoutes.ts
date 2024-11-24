import { Router } from "express";
import { TextController } from "../controllers/textController";

const router = Router();

router.get("/texts", TextController.getAllText);
router.post("/texts", TextController.createText);
router.put("/texts/:id", TextController.updateText);
router.delete("/texts/:id", TextController.deleteText);

export default router;
