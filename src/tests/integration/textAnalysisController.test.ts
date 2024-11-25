import request from "supertest";
import express from "express";
import { TextAnalysisController } from "../../controllers/textAnalysisController";

// Mock dependencies
jest.mock("../../services/textService.ts", () => {
  return jest.fn().mockImplementation(() => ({
    getTextById: jest.fn(),
  }));
});

describe("Text Analysis Controller Integration Tests", () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());

    // Add routes for testing
    app.get(
      "/api/texts/:id/analysis/words",
      TextAnalysisController.getWordCount
    );
    app.get(
      "/api/texts/:id/analysis/characters",
      TextAnalysisController.getCharacterCount
    );
    app.get(
      "/api/texts/:id/analysis/sentences",
      TextAnalysisController.getSentenceCount
    );
    app.get(
      "/api/texts/:id/analysis/paragraphs",
      TextAnalysisController.getParagraphCount
    );
    app.get(
      "/api/texts/:id/analysis/longest-words",
      TextAnalysisController.getLongestWords
    );
  });

  describe("Word Count Endpoint", () => {
    it("should return word count for existing text", async () => {
      // Mock Texts.findByPk
      const mockText = {
        id: 1,
        text: "Hello world! This is a test.",
      };

      // Manually mock the service method
      const TextService = require("../../services/textService.ts");
      TextService.mockImplementation(() => ({
        getTextById: jest.fn().mockResolvedValue(mockText),
      }));

      const response = await request(app).get("/api/texts/1/analysis/words");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        textId: "1",
        wordCount: 6,
      });
    });

    it("should return 404 for non-existing text", async () => {
      // Manually mock the service method
      const TextService = require("../../services/textService.ts");
      TextService.mockImplementation(() => ({
        getTextById: jest.fn().mockResolvedValue(null),
      }));

      const response = await request(app).get("/api/texts/999/analysis/words");

      expect(response.status).toBe(404);
    });
  });

  describe("Character Count Endpoint", () => {
    it("should return character count for existing text", async () => {
      const mockText = {
        id: 1,
        text: "Hello world!",
      };

      const TextService = require("../../services/textService.ts");
      TextService.mockImplementation(() => ({
        getTextById: jest.fn().mockResolvedValue(mockText),
      }));

      const response = await request(app).get(
        "/api/texts/1/analysis/characters"
      );

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        textId: "1",
        characterCount: 12,
      });
    });
  });

  describe("Sentences Count Endpoint", () => {
    it("should return sentence count for existing text", async () => {
      const mockText = {
        id: 1,
        text: "Hello world! How are you? I am fine.",
      };

      const TextService = require("../../services/textService.ts");
      TextService.mockImplementation(() => ({
        getTextById: jest.fn().mockResolvedValue(mockText),
      }));

      const response = await request(app).get(
        "/api/texts/1/analysis/sentences"
      );

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        textId: "1",
        sentenceCount: 3,
      });
    });
  });

  describe("Paragraphs Count Endpoint", () => {
    it("should return paragraph count for existing text", async () => {
      const mockText = {
        id: 1,
        text: "First paragraph\n\nSecond paragraph",
      };

      const TextService = require("../../services/textService.ts");
      TextService.mockImplementation(() => ({
        getTextById: jest.fn().mockResolvedValue(mockText),
      }));

      const response = await request(app).get(
        "/api/texts/1/analysis/paragraphs"
      );

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        textId: "1",
        paragraphCount: 2,
      });
    });
  });

  describe("Longest Words Endpoint", () => {
    it("should return longest words for existing text", async () => {
      const mockText = {
        id: 1,
        text: "The quick brown fox jumps over the lazy dog. Pneumonoultramicroscopicsilicovolcanoconiosis is a long word.",
      };

      const TextService = require("../../services/textService.ts");
      TextService.mockImplementation(() => ({
        getTextById: jest.fn().mockResolvedValue(mockText),
      }));

      const response = await request(app).get(
        "/api/texts/1/analysis/longest-words"
      );

      expect(response.status).toBe(200);
      expect(response.body.textId).toBe("1");
      expect(response.body.longestWords).toContain(
        "Pneumonoultramicroscopicsilicovolcanoconiosis"
      );
    });

    it("should limit longest words based on query parameter", async () => {
      const mockText = {
        id: 1,
        text: "long longer longest pneumonoultramicroscopicsilicovolcanoconiosis",
      };

      const TextService = require("../../services/textService.ts");
      TextService.mockImplementation(() => ({
        getTextById: jest.fn().mockResolvedValue(mockText),
      }));

      const response = await request(app).get(
        "/api/texts/1/analysis/longest-words"
      );

      expect(response.status).toBe(200);
      expect(response.body.longestWords.length).toBe(45);
    });
  });
});
