import TextAnalysisService from "../../services/textAnalysisService";

describe("TextAnalysisService", () => {
  let textAnalysisService: TextAnalysisService;

  describe("Word Count", () => {
    beforeEach(() => {
      textAnalysisService = new TextAnalysisService(
        "Hello world! This is a test sentence."
      );
    });

    test("should count words correctly", () => {
      const wordCount = textAnalysisService.countWords();
      expect(wordCount).toBe(7);
    });

    test("should handle multiple spaces", () => {
      textAnalysisService = new TextAnalysisService("  Hello   world  test  ");
      const wordCount = textAnalysisService.countWords();
      expect(wordCount).toBe(3);
    });
  });

  describe("Character Count", () => {
    beforeEach(() => {
      textAnalysisService = new TextAnalysisService("Hello world!");
    });

    test("should count characters with spaces", () => {
      const charCount = textAnalysisService.countCharacters(true);
      expect(charCount).toBe(12);
    });

    test("should count characters without spaces", () => {
      const charCount = textAnalysisService.countCharacters(false);
      expect(charCount).toBe(11);
    });
  });

  describe("Sentence Count", () => {
    test("should count sentences with different endings", () => {
      textAnalysisService = new TextAnalysisService(
        "Hello world! How are you? I am fine."
      );
      const sentenceCount = textAnalysisService.countSentences();
      expect(sentenceCount).toBe(3);
    });

    test("should handle empty text", () => {
      textAnalysisService = new TextAnalysisService("");
      const sentenceCount = textAnalysisService.countSentences();
      expect(sentenceCount).toBe(0);
    });
  });

  describe("Paragraph Count", () => {
    test("should count paragraphs", () => {
      textAnalysisService = new TextAnalysisService(
        "First paragraph\n\nSecond paragraph"
      );
      const paragraphCount = textAnalysisService.countParagraphs();
      expect(paragraphCount).toBe(2);
    });

    test("should handle multiple newlines", () => {
      textAnalysisService = new TextAnalysisService(
        "First paragraph\n\n\nSecond paragraph\n\nThird paragraph"
      );
      const paragraphCount = textAnalysisService.countParagraphs();
      expect(paragraphCount).toBe(3);
    });
  });

  describe("Longest Words", () => {
    beforeEach(() => {
      textAnalysisService = new TextAnalysisService(
        "The quick brown fox jumps over the lazy dog. Pneumonoultramicroscopicsilicovolcanoconiosis is a long word."
      );
    });

    test("should find longest words", () => {
      const longestWords = textAnalysisService.findLongestWords();
      expect(longestWords).toContain(
        "Pneumonoultramicroscopicsilicovolcanoconiosis"
      );
    });

    test("should remove duplicates", () => {
      textAnalysisService = new TextAnalysisService("long long longer longest");
      const longestWords = textAnalysisService.findLongestWords();
      expect(longestWords.length).toBe(7);
    });
  });
});
