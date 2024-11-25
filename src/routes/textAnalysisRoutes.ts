import { Router } from "express";
import { TextAnalysisController } from "../controllers/textAnalysisController";

/**
 * @swagger
 * /api/texts/{id}/analysis/words:
 *   get:
 *     summary: Count words in a specific text
 *     description: Returns the total number of words in a text
 *     tags: [Text Analysis]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique identifier of the text
 *     responses:
 *       200:
 *         description: Word count retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 textId:
 *                   type: integer
 *                 wordCount:
 *                   type: integer
 *       404:
 *         description: Text not found
 *
 * /api/texts/{id}/analysis/characters:
 *   get:
 *     summary: Count characters in a specific text
 *     description: Returns the total number of characters in a text
 *     tags: [Text Analysis]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique identifier of the text
 *     responses:
 *       200:
 *         description: Character count retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 textId:
 *                   type: integer
 *                 characterCount:
 *                   type: integer
 *       404:
 *         description: Text not found
 *
 * /api/texts/{id}/analysis/sentences:
 *   get:
 *     summary: Count sentences in a specific text
 *     description: Returns the total number of sentences in a text
 *     tags: [Text Analysis]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique identifier of the text
 *     responses:
 *       200:
 *         description: Sentence count retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 textId:
 *                   type: integer
 *                 sentenceCount:
 *                   type: integer
 *       404:
 *         description: Text not found
 *
 * /api/texts/{id}/analysis/paragraphs:
 *   get:
 *     summary: Count paragraphs in a specific text
 *     description: Returns the total number of paragraphs in a text
 *     tags: [Text Analysis]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique identifier of the text
 *     responses:
 *       200:
 *         description: Paragraph count retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 textId:
 *                   type: integer
 *                 paragraphCount:
 *                   type: integer
 *       404:
 *         description: Text not found
 *
 * /api/texts/{id}/analysis/longest-words:
 *   get:
 *     summary: Find longest words in a specific text
 *     description: Returns the longest words in the text
 *     tags: [Text Analysis]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique identifier of the text
 *     responses:
 *       200:
 *         description: Longest words retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 textId:
 *                   type: integer
 *                 longestWords:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Text not found
 */

const router = Router();

router.get("/texts/:id/analysis/words", TextAnalysisController.getWordCount);
router.get(
  "/texts/:id/analysis/characters",
  TextAnalysisController.getCharacterCount
);
router.get(
  "/texts/:id/analysis/sentences",
  TextAnalysisController.getSentenceCount
);
router.get(
  "/texts/:id/analysis/paragraphs",
  TextAnalysisController.getParagraphCount
);
router.get(
  "/texts/:id/analysis/longest-words",
  TextAnalysisController.getLongestWords
);

export default router;
