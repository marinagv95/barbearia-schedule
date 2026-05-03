import { Request, Response } from "express";
import { ChatbotService } from "../services/ChatbotService";

const chatbot = new ChatbotService();

export class WppController {
  // 🔥 WEBHOOK DO WHATSAPP
  async webhook(req: Request, res: Response) {
    try {
      // mensagem enviada pelo usuário
      const message: string = req.body.message?.body || "";

      // telefone do usuário (identificação)
      const phone: string = req.body.sender?.id || "";

      if (!message || !phone) {
        return res.status(400).json({
          message: "Payload inválido",
        });
      }

      // 🔥 chama o cérebro do chatbot
      const reply = await chatbot.handle(message, phone);

      return res.json({
        success: true,
        reply,
      });
    } catch (err: any) {
      return res.status(500).json({
        message: "Erro no webhook do WhatsApp",
        error: err.message,
      });
    }
  }

  // 🔥 opcional: teste manual (sem WhatsApp)
  async test(req: Request, res: Response) {
    try {
      const { message, phone } = req.body;

      const reply = await chatbot.handle(message, phone);

      return res.json({
        input: message,
        reply,
      });
    } catch (err: any) {
      return res.status(500).json({
        message: "Erro no teste do chatbot",
        error: err.message,
      });
    }
  }
}