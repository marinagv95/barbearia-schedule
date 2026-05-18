import { Request, Response } from "express";

import { ChatbotService } from "../services/ChatbotService";

const chatbot =
  new ChatbotService();

export class WppController {

  // =========================
  // 🔥 WEBHOOK WHATSAPP
  // =========================

  async webhook(
    req: Request,
    res: Response
  ) {

    try {

      // 🔥 mensagem
      const message: string =
        req.body.message?.body || "";

      // 🔥 telefone
      const phone: string =
        req.body.sender?.id || "";

      // 🔥 nome do contato
      const pushName: string =
        req.body.sender?.pushName ||
        "Cliente";

      if (!message || !phone) {

        return res.status(400).json({
          message:
            "Payload inválido",
        });
      }

      // 🔥 chatbot
      const reply =
        await chatbot.handle(
          message,
          phone,
          pushName
        );

      return res.json({
        success: true,
        reply,
      });

    } catch (err: any) {

      return res.status(500).json({
        message:
          "Erro no webhook do WhatsApp",

        error: err.message,
      });
    }
  }

  // =========================
  // 🔥 TESTE MANUAL
  // =========================

  async test(
    req: Request,
    res: Response
  ) {

    try {

      const {
        message,
        phone,
        pushName,
      } = req.body;

      const reply =
        await chatbot.handle(
          message,
          phone,
          pushName || "Cliente"
        );

      return res.json({
        input: message,
        reply,
      });

    } catch (err: any) {

      return res.status(500).json({
        message:
          "Erro no teste do chatbot",

        error: err.message,
      });
    }
  }
}