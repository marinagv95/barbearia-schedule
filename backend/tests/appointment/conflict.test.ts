import request from "supertest";
import app from "../../src/app";

describe("CONFLICT", () => {
  it("não deve permitir conflito de 30 minutos", async () => {
    await request(app).post("/appointments").send({
      clientName: "A",
      phone: "111",
      service: "Corte",
      scheduledAt: "2099-05-05T10:00:00.000Z",
    });

    const res = await request(app).post("/appointments").send({
      clientName: "B",
      phone: "222",
      service: "Corte",
      scheduledAt: "2099-05-05T10:20:00.000Z",
    });

    expect(res.status).toBe(409);
  });

  it("deve permitir após janela de 30 minutos", async () => {
    await request(app).post("/appointments").send({
      clientName: "A",
      phone: "111",
      service: "Corte",
      scheduledAt: "2099-05-05T10:00:00.000Z",
    });

    const res = await request(app).post("/appointments").send({
      clientName: "C",
      phone: "333",
      service: "Corte",
      scheduledAt: "2099-05-05T10:31:00.000Z",
    });

    expect(res.status).toBe(201);
  });
});