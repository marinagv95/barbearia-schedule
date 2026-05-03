import { AppointmentRepository } from "../repositories/AppointmentRepository";
import { AppointmentService } from "./AppointmentService";
import { Barber } from "../models/Barber";
import { User } from "../models/User";

type FlowState =
  | "START"
  | "MENU"
  | "SELECT_DATE"
  | "SELECT_BARBER"
  | "SELECT_TIME"
  | "CONFIRM";

type Session = {
  phone: string;
  state: FlowState;
  selectedDate?: string;
  selectedBarberId?: string;
  selectedTime?: string;
};

const sessions = new Map<string, Session>();

export class ChatbotService {
  private repo = new AppointmentRepository();
  private service = new AppointmentService();

  async handle(message: string, phone: string): Promise<string> {
    let session = sessions.get(phone);

    if (!session) {
      session = { phone, state: "START" };
      sessions.set(phone, session);
    }

    const msg = message.toLowerCase().trim();

    // =========================
    // START
    // =========================
    if (session.state === "START") {
      session.state = "MENU";

      return `
💈 *BARBEARIA*

Escolha uma opção:

1 - Agendar corte ✂️  
2 - Ver horários 🕒  
3 - Falar com atendente 👤  

Ou digite o que deseja.
      `;
    }

    // =========================
    // MENU INTELIGENTE
    // =========================
    if (session.state === "MENU") {
      if (msg.includes("1") || msg.includes("agendar")) {
        session.state = "SELECT_DATE";
        return this.showDates();
      }

      if (msg.includes("2") || msg.includes("horário")) {
        session.state = "SELECT_DATE";
        return this.showDates();
      }

      if (msg.includes("3") || msg.includes("atendente")) {
        sessions.delete(phone);
        return "👤 Um atendente vai te chamar em instantes.";
      }
    }

    // =========================
    // DATA
    // =========================
    if (session.state === "SELECT_DATE") {
      session.selectedDate = this.parseDate(msg) || msg;
      session.state = "SELECT_BARBER";

      const barbers = await Barber.find({ active: true });

      return `
📅 Dia: ${session.selectedDate}

👤 Escolha o barbeiro:

${barbers.map(b => `- ${b.name}`).join("\n")}

Ou digite "qualquer"
      `;
    }

    // =========================
    // BARBEIRO
    // =========================
    if (session.state === "SELECT_BARBER") {
      let barberId: string;

      if (msg.includes("qualquer")) {
        const barbers = await Barber.find({ active: true });
        barberId = barbers[0]._id.toString();
      } else {
        const barber = await Barber.findOne({
          name: { $regex: msg, $options: "i" },
        });

        if (!barber) return "❌ Barbeiro não encontrado";

        barberId = barber._id.toString();
      }

      session.selectedBarberId = barberId;
      session.state = "SELECT_TIME";

      const slots = await this.getSlots(
        session.selectedDate!,
        barberId
      );

      return `
🕒 Horários disponíveis:

${slots.join("\n")}

Digite o horário desejado
      `;
    }

    // =========================
    // HORÁRIO
    // =========================
    if (session.state === "SELECT_TIME") {
      session.selectedTime = msg;
      session.state = "CONFIRM";

      return `
📌 CONFIRMAÇÃO

📅 ${session.selectedDate}
🕒 ${session.selectedTime}

1 - Confirmar  
2 - Cancelar
      `;
    }

    // =========================
    // CONFIRM
    // =========================
    if (session.state === "CONFIRM") {
      if (msg.includes("1") || msg.includes("confirmar")) {
        await this.createAppointment(session);
        sessions.delete(phone);
        return "✅ Agendamento confirmado!";
      }

      sessions.delete(phone);
      return "❌ Cancelado.";
    }

    return "Digite 1 para começar.";
  }

  // =========================
  // SLOT
  // =========================
  private async getSlots(date: string, barberId: string) {
    const start = new Date(`${date}T00:00:00.000Z`);
    const end = new Date(`${date}T23:59:59.999Z`);

    const appointments = await this.repo.findByDateRange(
      start,
      end,
      barberId
    );

    const slots: string[] = [];

    for (let h = 8; h < 18; h++) {
      for (let m of [0, 30]) {
        const key = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;

        const isOccupied = appointments.some((a: any) => {
          const d = new Date(a.scheduledAt);
          const hh = String(d.getUTCHours()).padStart(2, "0");
          const mm = d.getUTCMinutes() < 30 ? "00" : "30";
          return `${hh}:${mm}` === key;
        });

        if (!isOccupied) slots.push(key);
      }
    }

    return slots;
  }

  // =========================
  // CREATE
  // =========================
  private async createAppointment(session: Session) {
    let user = await User.findOne({ phone: session.phone });

    if (!user) {
      user = await User.create({
        name: session.phone,
        phone: session.phone,
      });
    }

    const start = new Date(
      `${session.selectedDate}T${session.selectedTime}:00.000Z`
    );

    await this.service.validateSlot(
      start,
      session.selectedBarberId!
    );

    return this.repo.create({
      userId: user._id,
      barberId: session.selectedBarberId,
      scheduledAt: start,
      service: "Corte",
      status: "pending",
    });
  }

  // =========================
  // DATE UI
  // =========================
  private showDates() {
    return `
📅 Escolha uma data:

Ex:
10/06  
11/06  
12/06
    `;
  }

  private parseDate(msg: string): string | null {
    const match = msg.match(/\d{2}\/\d{2}/);
    if (!match) return null;

    const [day, month] = match[0].split("/");
    const year = new Date().getFullYear();

    return `${year}-${month}-${day}`;
  }
}