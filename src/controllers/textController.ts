import { NextFunction, Request, Response } from "express";
import TextService from "../services/textService";

export class TextController {
  static async getAllText(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const textSerive = new TextService();
      const text = await textSerive.getAllText();

      res.json(text);
    } catch (error) {
      next(error);
    }
  }

  static async createText(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const body = await req.body;
      const textSerive = new TextService();
      const text = await textSerive.createText(body.text);

      res.json(text);
    } catch (error) {
      next(error);
    }
  }

  static async deleteText(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const textService = new TextService();
      await textService.deleteText(Number(id));

      console.log(id);

      res.status(204).send("Text deleted successfully");
    } catch (error) {
      next(error);
    }
  }

  static async updateText(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const { text } = req.body;
      const textService = new TextService();
      const updatedText = await textService.updateText(Number(id), text);

      res.json(updatedText);
    } catch (error) {
      next(error);
    }
  }
}
