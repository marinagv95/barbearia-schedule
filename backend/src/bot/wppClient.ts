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
      catchQR: (base64Qr, asciiQR) => {
        console.log(asciiQR); // QR Code no terminal
      },
      // Correção do erro de tipos do TS: usamos strings conhecidas pela lib
      statusFind: (statusSession: string, session: string) => {
        console.log(`Status da Sessão (${session}): ${statusSession}`);
        isReady = statusSession === "isLogged" || statusSession === "inChat";
      },
    });

    // Monitoramento de estado em tempo real
    clientInstance.onStateChange((state: string) => {
      console.log("Estado atual:", state);
      isReady = state === "CONNECTED";
    });

    clientInstance.onMessage(async (message: any) => {
      try {
        // 1. Filtros de segurança: ignora grupos e mensagens do próprio bot
        if (message.isGroupMsg || message.fromMe || !message.body) {
          return;
        }

        const text = message.body;
        const from = message.from; // O endereço da conversa (ex: 108...@c.us)

        // 2. RESOLUÇÃO DE CONTATO (A "cura" para os números loucos)
        // Buscamos o objeto de contato completo para extrair o número real (WID)
        const contact = await clientInstance.getContact(from);

        // 3. DEFINIÇÃO DO NOME DO CLIENTE
        const pushName =
          contact.pushname ||
          contact.verifiedName ||
          message.sender?.pushname ||
          "Cliente";

        // 4. EXTRAÇÃO DO NÚMERO PESQUISÁVEL
        // Prioridade 1: contact.number (É o número do chip, ex: 55839...)
        // Prioridade 2: contact.id.user (O ID do usuário sem o domínio @c.us)
        // Prioridade 3: Fallback do from com split
        const rawPhone = 
          contact.number || 
          contact.id?.user || 
          from.split('@')[0];

        // 5. ENVIAR PARA O SERVICE
        // O Service cuidará de limpar o "+55" e gerenciar a sessão
        const response = await chatbot.handle(
          text,
          rawPhone,
          pushName
        );

        // 6. ENVIAR RESPOSTA
        if (response) {
          // Respondemos sempre para o 'from' original para garantir a entrega
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