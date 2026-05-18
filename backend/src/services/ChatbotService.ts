import { AppointmentRepository } from "../repositories/AppointmentRepository";

import { AppointmentService } from "./AppointmentService";

import { Barber } from "../models/Barber";

import { Customer } from "../models/Customer";

import { Service } from "../models/Service";

type FlowState =
  | "START"
  | "MENU"
  | "SELECT_DATE"
  | "SELECT_BARBER"
  | "SELECT_SERVICE"
  | "SELECT_TIME"
  | "CONFIRM";

type Session = {
  remoteJid: string;

  dbPhone: string;

  userName: string;

  state: FlowState;

  selectedDate?: string;

  selectedBarberId?: string;

  selectedServiceId?: string;

  selectedTime?: string;
};

const sessions =
  new Map<string, Session>();

const ACTIVATION_KEYWORDS = [
  "oi",
  "olá",
  "ola",
  "bom dia",
  "boa tarde",
  "boa noite",
  "quero agendar",
  "agendar",
  "opa",
];

export class ChatbotService {

  private repo =
    new AppointmentRepository();

  private service =
    new AppointmentService();

  async handle(
    message: string,
    rawPhone: string,
    pushName: string
  ): Promise<string | null> {

    // =========================
    // 🔥 LIMPA NÚMERO
    // =========================

    let idUser =
      rawPhone
        .split("@")[0]
        .split(":")[0]
        .replace(/\D/g, "");

    let cleanNumber =
      idUser;

    if (
      cleanNumber.startsWith("108") &&
      cleanNumber.length > 15
    ) {

      const index55 =
        cleanNumber.indexOf("55");

      if (index55 !== -1) {
        cleanNumber =
          cleanNumber.substring(index55);
      }
    }

    if (
      cleanNumber.length >= 10 &&
      cleanNumber.length <= 11 &&
      !cleanNumber.startsWith("55")
    ) {
      cleanNumber =
        `55${cleanNumber}`;
    }

    const formattedForDB =
      `+${cleanNumber}`;

    // =========================
    // 🔥 MSG
    // =========================

    const msg =
      (message || "")
        .toLowerCase()
        .trim();

    let session =
      sessions.get(rawPhone);

    const isActivation =
      ACTIVATION_KEYWORDS.some(
        (k) => msg.includes(k)
      );

    if (
      !session &&
      !isActivation
    ) {
      return null;
    }

    if (!session) {

      session = {
        remoteJid: rawPhone,

        dbPhone: formattedForDB,

        state: "START",

        userName:
          pushName || "Cliente",
      };

      sessions.set(
        rawPhone,
        session
      );
    }

    // =========================
    // START
    // =========================

    if (session.state === "START") {

      if (!isActivation) {
        return "👋 Me chama com 'oi' para começar.";
      }

      session.state = "MENU";

      return `💈 Oi, ${session.userName}! Seja bem-vindo 😄

Como posso te ajudar hoje?

1 - Agendar horário ✂️
2 - Ver horários 🕒
3 - Falar com atendente 👤`;
    }

    // =========================
    // MENU
    // =========================

    if (session.state === "MENU") {

      if (
        msg.includes("1") ||
        msg.includes("agendar")
      ) {

        session.state =
          "SELECT_DATE";

        return this.showDates();
      }

      if (msg.includes("3")) {

        sessions.delete(rawPhone);

        return "Perfeito 👍 vou te encaminhar para um atendente humano.";
      }

      return "Escolha uma opção válida: 1, 2 ou 3.";
    }

    // =========================
    // DATE
    // =========================

    if (
      session.state ===
      "SELECT_DATE"
    ) {

      const parsed =
        this.parseDate(msg);

      if (!parsed) {
        return "Data inválida 😕 Digite como no exemplo: 10/06";
      }

      session.selectedDate =
        parsed;

      session.state =
        "SELECT_BARBER";

      const barbers =
        await Barber.find({
          active: true,
        });

      return `📅 Dia ${msg}

Escolha o barbeiro 👇

${barbers
  .map((b) => `• ${b.name}`)
  .join("\n")}

Ou digite: qualquer`;
    }

    // =========================
    // BARBER
    // =========================

    if (
      session.state ===
      "SELECT_BARBER"
    ) {

      let barberId: string;

      if (
        msg.includes("qualquer")
      ) {

        const barbers =
          await Barber.find({
            active: true,
          });

        barberId =
          barbers[0]?._id.toString();

      } else {

        const barber =
          await Barber.findOne({
            name: {
              $regex: msg,
              $options: "i",
            },
          });

        if (!barber) {
          return "Não achei esse barbeiro 😕 Tente novamente.";
        }

        barberId =
          barber._id.toString();
      }

      session.selectedBarberId =
        barberId;

      session.state =
        "SELECT_SERVICE";

      const services =
        await Service.find({
          active: true,
        });

      return `💈 Escolha o serviço:

${services
  .map(
    (s) =>
      `• ${s.name} - R$${s.price}`
  )
  .join("\n")}`;
    }

    // =========================
    // SERVICE
    // =========================

    if (
      session.state ===
      "SELECT_SERVICE"
    ) {

      const service =
        await Service.findOne({
          name: {
            $regex: msg,
            $options: "i",
          },
        });

      if (!service) {
        return "Serviço não encontrado 😕";
      }

      session.selectedServiceId =
        service._id.toString();

      session.state =
        "SELECT_TIME";

      const slots =
        await this.getSlots(
          session.selectedDate!,
          session.selectedBarberId!
        );

      return `🕒 Horários para ${session.selectedDate}:

${slots.join("\n")}`;
    }

    // =========================
    // TIME
    // =========================

    if (
      session.state ===
      "SELECT_TIME"
    ) {

      session.selectedTime =
        msg;

      session.state =
        "CONFIRM";

      return `📌 Confirmação:

📅 Data: ${session.selectedDate}
🕒 Horário: ${session.selectedTime}

1 - Confirmar ✅
2 - Cancelar ❌`;
    }

    // =========================
    // CONFIRM
    // =========================

    if (
      session.state ===
      "CONFIRM"
    ) {

      if (msg.includes("1")) {

        try {

          await this.createAppointment(
            session
          );

          sessions.delete(rawPhone);

          return "🎉 Agendado com sucesso! Te esperamos 👍";

        } catch (err: any) {

          return `❌ Erro: ${err.message}`;
        }
      }

      sessions.delete(rawPhone);

      return "Tudo bem 👍 agendamento cancelado.";
    }

    return "👋 Me chama com 'oi' para começar.";
  }

  // =========================
  // CREATE APPOINTMENT
  // =========================

  private async createAppointment(
    session: Session
  ) {

    let customer =
      await Customer.findOne({
        phone:
          session.dbPhone,
      });

    if (!customer) {

      customer =
        await Customer.create({
          name:
            session.userName,

          phone:
            session.dbPhone,
        });
    }

    const service =
      await Service.findById(
        session.selectedServiceId
      );

    const start =
      new Date(
        `${session.selectedDate}T${session.selectedTime}:00.000-03:00`
      );

    return this.repo.create({
      customerId: customer._id,

      barberId:
        session.selectedBarberId,

      serviceId:
        service!._id,

      scheduledAt: start,

      service:
        service!.name,

      duration:
        service!.duration,

      status: "pending",
    });
  }

  // =========================
  // GET SLOTS
  // =========================

  private async getSlots(
    date: string,
    barberId: string
  ) {

    const start =
      new Date(
        `${date}T00:00:00.000-03:00`
      );

    const end =
      new Date(
        `${date}T23:59:59.999-03:00`
      );

    const appointments =
      await this.repo.findByDateRange(
        start,
        end,
        barberId
      );

    const slots: string[] = [];

    for (let h = 8; h < 18; h++) {

      for (let m of [0, 30]) {

        const key =
          `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;

        const isOccupied =
          appointments.some(
            (a: any) => {

              const d =
                new Date(
                  a.scheduledAt
                );

              return (
                `${String(d.getHours()).padStart(2, "0")}:${d.getMinutes() < 30 ? "00" : "30"}`
                === key
              );
            }
          );

        if (!isOccupied) {
          slots.push(key);
        }
      }
    }

    return slots;
  }

  private showDates() {
    return "📅 Escolha uma data:\nEx: 10/06, 11/06...";
  }

  private parseDate(
    msg: string
  ): string | null {

    const match =
      msg.match(/\d{2}\/\d{2}/);

    if (!match) {
      return null;
    }

    const [
      day,
      month,
    ] = match[0].split("/");

    return `${new Date().getFullYear()}-${month}-${day}`;
  }
}