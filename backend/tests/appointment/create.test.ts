import request from "supertest";
import app from "../../src/app";
import { Appointment } from "../../src/models/Appointment";

describe("CREATE Appointment", () => {
  beforeEach(async () => {
    await Appointment.deleteMany({});
  });

  const baseValidDate = "2026-05-05T13:00:00.000Z";

  it("deve criar agendamento válido", async () => {
    const res = await request(app).post("/appointments").send({
      clientName: "Maria",
      phone: "111111111",
      service: "Corte",
      scheduledAt: baseValidDate,
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("scheduledAtFormatted");
  });

  it("não deve permitir horário passado", async () => {
    const pastDate = new Date();
    pastDate.setFullYear(2020);

    const res = await request(app).post("/appointments").send({
      clientName: "João",
      phone: "222222222",
      service: "Barba",
      scheduledAt: pastDate.toISOString(),
    });

    expect(res.status).toBe(400);
  });

  it("não deve permitir domingo", async () => {
    const sunday = "2026-05-03T13:00:00.000Z";

    const res = await request(app).post("/appointments").send({
      clientName: "Ana",
      phone: "333333333",
      service: "Corte",
      scheduledAt: sunday,
    });

    expect(res.status).toBe(400);
  });

  it("não deve permitir fora do horário", async () => {
    const res = await request(app).post("/appointments").send({
      clientName: "Carlos",
      phone: "444444444",
      service: "Corte",
      scheduledAt: "2026-05-05T23:00:00.000Z",
    });

    expect(res.status).toBe(400);
  });

  it("não deve permitir mais de 3 agendamentos no mesmo horário", async () => {
    const slotDate = baseValidDate;

    // 🔥 CRIA 3 NOVOS USUÁRIOS ISOLADOS DO RESTO DOS TESTES
    for (let i = 0; i < 3; i++) {
      await request(app).post("/appointments").send({
        clientName: `Teste Slot ${i}`,
        phone: `77777777${i}`, // garante isolamento total
        service: "Corte",
        scheduledAt: slotDate,
      });
    }

    // 🔥 4º deve falhar
    const res = await request(app).post("/appointments").send({
      clientName: "Teste Extra",
      phone: "999999999",
      service: "Corte",
      scheduledAt: slotDate,
    });

    expect(res.status).toBe(409);
  });
});