jest.mock("../db/connect", () => ({
  connectToDb: jest.fn(),
  getDb: jest.fn()
}));

const request = require("supertest");
const app = require("../server");
const { getDb } = require("../db/connect");

describe("Orders GET routes", () => {
  beforeEach(() => {
    getDb.mockReturnValue({
      collection: jest.fn().mockReturnValue({
        find: jest.fn().mockReturnValue({
          toArray: jest.fn().mockResolvedValue([{ customerName: "Alice Smith" }])
        }),
        findOne: jest.fn().mockResolvedValue({ customerName: "Alice Smith" })
      })
    });
  });

  it("GET /orders should return 200", async () => {
    const res = await request(app).get("/orders");
    expect(res.statusCode).toBe(200);
  });

  it("GET /orders/:id should return 200", async () => {
    const res = await request(app).get("/orders/507f1f77bcf86cd799439011");
    expect(res.statusCode).toBe(200);
  });
});