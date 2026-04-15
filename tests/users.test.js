jest.mock("../db/connect", () => ({
  connectToDb: jest.fn(),
  getDb: jest.fn()
}));

const request = require("supertest");
const app = require("../server");
const { getDb } = require("../db/connect");

describe("Users GET routes", () => {
  beforeEach(() => {
    getDb.mockReturnValue({
      collection: jest.fn().mockReturnValue({
        find: jest.fn().mockReturnValue({
          toArray: jest.fn().mockResolvedValue([{ username: "herwin" }])
        }),
        findOne: jest.fn().mockResolvedValue({ username: "herwin" })
      })
    });
  });

  it("GET /users should return 200", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toBe(200);
  });

  it("GET /users/:id should return 200", async () => {
    const res = await request(app).get("/users/507f1f77bcf86cd799439011");
    expect(res.statusCode).toBe(200);
  });
});