const {
    find, findById, create, update, delete: del,
    checkAnswerExist, checkAnswerer,
} = require('../../src/controllers/answers');
const request = require("supertest");
const app = require("../../src/index");


beforeEach(async () => {
    server = request(app);
})

describe("routes: index", () => {
    test("should respond as expected", async () => {
      const response = await server.get("/");
      expect(response.status).toEqual(200);
    });
  });

afterEach(async () => {
  server.close();
})