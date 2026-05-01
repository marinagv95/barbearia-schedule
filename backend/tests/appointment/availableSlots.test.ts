import request from "supertest";
import app from "../../src/app";

describe("AVAILABLE SLOTS", () => {
  it("deve retornar horários disponíveis", async () => {
    const res = await request(app).get(
      "/appointments/available-slots?date=2026-05-04"
    );

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("não deve permitir domingo", async () => {
    const res = await request(app).get(
      "/appointments/available-slots?date=2026-05-03"
    );

    expect(res.status).toBe(400);
  });
});