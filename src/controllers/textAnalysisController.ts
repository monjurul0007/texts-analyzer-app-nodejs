import { NextFunction, Request, Response } from "express";
import TextAnalysisService from "../services/textAnalysisService";
import TextService from "../services/textService";

export class TextAnalysisController {
  static async getWordCount(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const textService = new TextService();
      const text = await textService.getTextById(Number(id));

      if (!text) {
        res.status(404).json({ message: "Text not found" });
        return;
      }

      const textAnalysisService = new TextAnalysisService(text.text);
      const wordCount = textAnalysisService.countWords();

      res.json({
        textId: id,
        wordCount,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCharacterCount(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const textService = new TextService();
      const text = await textService.getTextById(Number(id));

      if (!text) {
        res.status(404).json({ message: "Text not found" });
        return;
      }

      const textAnalysisService = new TextAnalysisService(text.text);
      const characterCount = textAnalysisService.countCharacters();

      res.json({
        textId: id,
        characterCount,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getSentenceCount(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const textService = new TextService();
      const text = await textService.getTextById(Number(id));

      if (!text) {
        res.status(404).json({ message: "Text not found" });
        return;
      }

      const textAnalysisService = new TextAnalysisService(text.text);
      const sentenceCount = textAnalysisService.countSentences();

      res.json({
        textId: id,
        sentenceCount,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getParagraphCount(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const textService = new TextService();
      const text = await textService.getTextById(Number(id));

      if (!text) {
        res.status(404).json({ message: "Text not found" });
        return;
      }

      const textAnalysisService = new TextAnalysisService(text.text);
      const paragraphCount = textAnalysisService.countParagraphs();

      res.json({
        textId: id,
        paragraphCount,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getLongestWords(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const { limit = 5 } = req.query;
      const textService = new TextService();
      const text = await textService.getTextById(Number(id));

      if (!text) {
        res.status(404).json({ message: "Text not found" });
        return;
      }

      const textAnalysisService = new TextAnalysisService(text.text);
      const longestWords = textAnalysisService.findLongestWords(Number(limit));

      res.json({
        textId: id,
        longestWords,
      });
    } catch (error) {
      next(error);
    }
  }
}
