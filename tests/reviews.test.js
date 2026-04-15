jest.mock("../db/connect", () => ({
  connectToDb: jest.fn(),
  getDb: jest.fn()
}));

const request = require("supertest");
const app = require("../server");
const { getDb } = require("../db/connect");

describe("Reviews GET routes", () => {
  beforeEach(() => {
    getDb.mockReturnValue({
      collection: jest.fn().mockReturnValue({
        find: jest.fn().mockReturnValue({
          toArray: jest.fn().mockResolvedValue([{ title: "Great monitor" }])
        }),
        findOne: jest.fn().mockResolvedValue({ title: "Great monitor" })
      })
    });
  });

  it("GET /reviews should return 200", async () => {
    const res = await request(app).get("/reviews");
    expect(res.statusCode).toBe(200);
  });

  it("GET /reviews/:id should return 200", async () => {
    const res = await request(app).get("/reviews/507f1f77bcf86cd799439011");
    expect(res.statusCode).toBe(200);
  });
});