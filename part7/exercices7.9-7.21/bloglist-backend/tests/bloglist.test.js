const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

describe("posting", () => {
  test("Status code 401 if token is not provide", async () => {
    await api
      .post("/api/blogs")
      .send({
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
      })
      .expect(401)
      .expect("Content-Type", /application\/json/);
  }, 200);
});
afterAll(async () => {
  await mongoose.connection.close();
});
