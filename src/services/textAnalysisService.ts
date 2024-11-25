class TextAnalysisService {
  private text: string;

  constructor(text: string) {
    this.text = text;
  }

  countWords(): number {
    const words = this.text.trim().replace(/\s+/g, " ").split(" ");
    return words.filter((word) => word.length > 0).length;
  }

  countCharacters(includeSpaces: boolean = true): number {
    if (includeSpaces) {
      return this.text.length;
    }
    return this.text.replace(/\s/g, "").length;
  }

  countSentences(): number {
    const sentenceEndings = /[.!?]+/g;
    const sentences = this.text.split(sentenceEndings);

    return sentences.filter((sentence) => sentence.trim().length > 0).length;
  }

  countParagraphs(): number {
    const paragraphs = this.text.split(/\n\s*\n/);

    return paragraphs.filter((para) => para.trim().length > 0).length;
  }

  findLongestWords(limit: number = 5): string[] {
    const words = this.text.replace(/[^\w\s]/g, "").split(/\s+/);

    const sortedWords = words
      .sort((a, b) => b.length - a.length)
      .filter((word, index, self) => self.indexOf(word) === index);

    return sortedWords.slice(0, limit);
  }
}

export default TextAnalysisService;
