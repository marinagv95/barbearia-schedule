import request from "supertest";
import app from "../../src/app";

describe("AVAILABLE SLOTS EDGE", () => {
  it("deve remover horário quando atingir 3 agendamentos", async () => {
    for (let i = 0; i < 3; i++) {
      await request(app).post("/appointments").send({
        clientName: `User ${i}`,
        phone: `9000${i}`,
        service: "Corte",
        scheduledAt: "2026-05-05T13:00:00.000Z",
      });
    }

    const res = await request(app).get(
      "/appointments/available-slots?date=2026-05-05"
    );

    expect(res.body.includes("13:00")).toBe(false);
  });
});