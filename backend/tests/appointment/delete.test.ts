import request from "supertest";
import app from "../../src/app";
it("deve deletar agendamento", async () => {
  const create = await request(app).post("/appointments").send({
    clientName: "Teste",
    phone: "123456789",
    service: "Corte",
    scheduledAt: "2026-05-04T14:00:00.000Z",
  });

  const id = create.body._id;

  const res = await request(app).delete(`/appointments/${id}`);

  expect(res.status).toBe(200);
});