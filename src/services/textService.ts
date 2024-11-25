import { Texts } from "../database/models/Texts";

class TextService {
  public async getAllText() {
    try {
      const texts = await Texts.findAll();

      return texts;
    } catch (error) {
      throw Error("Can Not fetch Texts");
    }
  }

  public async getTextById(id: number) {
    try {
      const text = await Texts.findByPk(id);

      return text;
    } catch (error) {
      throw Error("Can Not fetch Texts");
    }
  }

  public async createText(text: string) {
    try {
      const texts = await Texts.create({ text });

      return texts;
    } catch (error) {
      throw Error("Can Not fetch Texts");
    }
  }

  public async deleteText(id: number) {
    try {
      const text = await Texts.findByPk(id);

      if (!text) {
        throw Error("Text not found");
      }

      await text.destroy();

      return true;
    } catch (error) {
      throw Error("Can Not delete Text");
    }
  }

  public async updateText(id: number, newText: string) {
    try {
      const text = await Texts.findByPk(id);

      if (!text) {
        throw Error("Text not found");
      }

      await text.update({ text: newText });

      return text;
    } catch (error) {
      throw Error("Can Not update Text");
    }
  }
}

export default TextService;
