import request from "supertest";
import app from "../../src/app";

describe("VALIDATION", () => {
  it("não deve criar agendamento sem clientName", async () => {
    const res = await request(app).post("/appointments").send({
      phone: "111111111",
      service: "Corte",
      scheduledAt: "2026-05-05T13:00:00.000Z",
    });

    expect(res.status).toBe(400);
  });

  it("não deve criar agendamento sem phone", async () => {
    const res = await request(app).post("/appointments").send({
      clientName: "Maria",
      service: "Corte",
      scheduledAt: "2026-05-05T13:00:00.000Z",
    });

    expect(res.status).toBe(400);
  });

  it("não deve aceitar data inválida", async () => {
    const res = await request(app).post("/appointments").send({
      clientName: "Maria",
      phone: "111111111",
      service: "Corte",
      scheduledAt: "data-invalida",
    });

    expect(res.status).toBe(400);
  });
});