import request from "supertest";
import app from "../../src/app";

describe("STATUS FLOW", () => {
  it("deve seguir fluxo correto de status", async () => {
    const create = await request(app).post("/appointments").send({
      clientName: "Teste",
      phone: "999",
      service: "Corte",
      scheduledAt: "2026-05-05T13:00:00.000Z",
    });

    const id = create.body._id;

    const confirm = await request(app)
      .patch(`/appointments/${id}/status`)
      .send({ status: "confirmed" });

    expect(confirm.status).toBe(200);

    const done = await request(app)
      .patch(`/appointments/${id}/status`)
      .send({ status: "done" });

    expect(done.status).toBe(200);

    const invalid = await request(app)
      .patch(`/appointments/${id}/status`)
      .send({ status: "pending" });

    expect(invalid.status).toBe(400);
  });
});