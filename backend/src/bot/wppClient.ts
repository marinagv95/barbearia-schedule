import * as wppconnect from "@wppconnect-team/wppconnect";
import { ChatbotService } from "../services/ChatbotService";

const chatbot = new ChatbotService();
let isReady = false;
let clientInstance: any = null;

export async function startWppBot() {
  if (clientInstance) return;

  try {
    clientInstance = await wppconnect.create({
      session: "barbearia-bot",

      // ✅ AQUI está a correção principal
      folderNameToken: "./backend/.wppconnect-tokens",

      catchQR: (base64Qr, asciiQR) => {
        console.log(asciiQR);
      },

      statusFind: (statusSession: string, session: string) => {
        console.log(`Status da Sessão (${session}): ${statusSession}`);
        isReady =
          statusSession === "isLogged" ||
          statusSession === "inChat";
      },
    });

    // Monitoramento de estado em tempo real
    clientInstance.onStateChange((state: string) => {
      console.log("Estado atual:", state);
      isReady = state === "CONNECTED";
    });

    clientInstance.onMessage(async (message: any) => {
      try {
        // 1. Filtros de segurança
        if (message.isGroupMsg || message.fromMe || !message.body) {
          return;
        }

        const text = message.body;
        const from = message.from;

        // 2. contato
        const contact = await clientInstance.getContact(from);

        // 3. nome
        const pushName =
          contact.pushname ||
          contact.verifiedName ||
          message.sender?.pushname ||
          "Cliente";

        // 4. telefone limpo
        const rawPhone =
          contact.number ||
          contact.id?.user ||
          from.split("@")[0];

        // 5. chatbot
        const response = await chatbot.handle(
          text,
          rawPhone,
          pushName
        );

        // 6. resposta
        if (response) {
          await clientInstance.sendText(from, response);
        }
      } catch (err) {
        console.error("❌ Erro ao processar mensagem:", err);
      }
    });
  } catch (error) {
    console.error("❌ Erro ao iniciar o WPPConnect:", error);
  }
}