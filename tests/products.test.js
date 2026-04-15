jest.mock("../db/connect", () => ({
  connectToDb: jest.fn(),
  getDb: jest.fn()
}));

const request = require("supertest");
const app = require("../server");
const { getDb } = require("../db/connect");

describe("Products GET routes", () => {
  beforeEach(() => {
    getDb.mockReturnValue({
      collection: jest.fn().mockReturnValue({
        find: jest.fn().mockReturnValue({
          toArray: jest.fn().mockResolvedValue([{ name: "Gaming Monitor" }])
        }),
        findOne: jest.fn().mockResolvedValue({ name: "Gaming Monitor" })
      })
    });
  });

  it("GET /products should return 200", async () => {
    const res = await request(app).get("/products");
    expect(res.statusCode).toBe(200);
  });

  it("GET /products/:id should return 200", async () => {
    const res = await request(app).get("/products/507f1f77bcf86cd799439011");
    expect(res.statusCode).toBe(200);
  });
});