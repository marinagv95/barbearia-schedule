import request from "supertest";
import app from "../../src/app";

describe("LIST", () => {
  it("deve listar agendamentos", async () => {
    const res = await request(app).get("/appointments");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});