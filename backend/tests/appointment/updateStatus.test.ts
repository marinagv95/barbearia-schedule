import request from "supertest";
import app from "../../src/app";


it("deve atualizar status corretamente", async () => {
  const create = await request(app).post("/appointments").send({
    clientName: "Teste",
    phone: "555555555",
    service: "Corte",
    scheduledAt: "2026-05-04T15:00:00.000Z",
  });

  const id = create.body._id;

  const res = await request(app)
    .patch(`/appointments/${id}/status`)
    .send({ status: "confirmed" });

  expect(res.status).toBe(200);
});