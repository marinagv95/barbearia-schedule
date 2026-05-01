import request from "supertest";
import app from "../../src/app";
it("deve remarcar agendamento", async () => {
  const create = await request(app).post("/appointments").send({
    clientName: "Teste",
    phone: "666666666",
    service: "Corte",
    scheduledAt: "2026-05-04T16:00:00.000Z",
  });

  const id = create.body._id;

  const res = await request(app)
    .patch(`/appointments/${id}/reschedule`)
    .send({
      scheduledAt: "2026-05-04T17:00:00.000Z",
    });

  expect(res.status).toBe(200);
});