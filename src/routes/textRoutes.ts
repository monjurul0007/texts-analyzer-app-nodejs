import { Router } from "express";
import { TextController } from "../controllers/textController";

/**
 * @swagger
 * components:
 *   schemas:
 *     Text:
 *       type: object
 *       required:
 *         - text
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the text
 *         text:
 *           type: string
 *           description: The content of the text
 *       example:
 *         id: 1
 *         text: "Sample text content"
 *
 * /api/texts:
 *   get:
 *     summary: Retrieve all texts
 *     description: Fetch a list of all texts from the database
 *     tags: [Texts]
 *     responses:
 *       200:
 *         description: A list of texts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Text'
 *       500:
 *         description: Server error
 *
 *   post:
 *     summary: Create a new text
 *     description: Add a new text to the database
 *     tags: [Texts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: The content of the text
 *                 example: "New text to be added"
 *     responses:
 *       200:
 *         description: Text created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Text'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 *
 * /api/texts/{id}:
 *   put:
 *     summary: Update an existing text
 *     description: Update the content of an existing text by its ID
 *     tags: [Texts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique identifier of the text
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: The updated text content
 *                 example: "Updated text content"
 *     responses:
 *       200:
 *         description: Text updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Text'
 *       404:
 *         description: Text not found
 *       500:
 *         description: Server error
 *
 *   delete:
 *     summary: Delete a text
 *     description: Remove a text from the database by its ID
 *     tags: [Texts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique identifier of the text to delete
 *     responses:
 *       204:
 *         description: Text deleted successfully
 *       404:
 *         description: Text not found
 *       500:
 *         description: Server error
 */

const router = Router();

router.get("/texts", TextController.getAllText);
router.post("/texts", TextController.createText);
router.put("/texts/:id", TextController.updateText);
router.delete("/texts/:id", TextController.deleteText);

export default router;
