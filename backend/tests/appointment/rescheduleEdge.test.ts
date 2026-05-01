import request from "supertest";
import app from "../../src/app";

describe("RESCHEDULE EDGE", () => {
  it("não deve remarcar para data inválida", async () => {
    const create = await request(app).post("/appointments").send({
      clientName: "Teste",
      phone: "888",
      service: "Corte",
      scheduledAt: "2026-05-05T13:00:00.000Z",
    });

    const id = create.body._id;

    const res = await request(app)
      .put(`/appointments/${id}/reschedule`)
      .send({ scheduledAt: "2026-05-04T10:00:00.000Z" });

    expect(res.status).toBe(400);
  });
});