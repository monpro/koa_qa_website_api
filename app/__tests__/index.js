const {
    find, findById, create, update, delete: del,
    checkAnswerExist, checkAnswerer,
} = require('../src/controllers/answers');
const request = require("supertest");
const app = require("../src/index");
const mongoose = require("mongoose");
const {connectionString } = require('../src/config');



beforeAll(async () => {
  await mongoose.connect(connectionString, { useNewUrlParser: true } ,
    () => console.log('database connection succeed'));
  mongoose.connection.on('error',console.error);
    server = request(app);
})

describe("routes: index", () => {
    test("should respond as expected", async () => {
      const response = await server.get("/");
      expect(response.status).toEqual(200);
      expect(response.text).toEqual("this is main page")
    });
  });

afterAll(async () => {
  await mongoose.connection.close(() => {
    console.log("mongoose connection has closed")
  })
})
