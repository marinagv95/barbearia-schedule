import { useContext, useState } from "react";
import type { CSSProperties } from "react";

import { AppointmentContext } from "../../providers/appointmentProvider/appointmentContext";
import { BarberContext } from "../../providers/barberProviders/barberContext";
import { ServiceContext } from "../../providers/serviceProviders/serviceContext";

interface Props {
  onClose: () => void;
}

export function CreateAppointmentModal({ onClose }: Props) {
  const { createAppointment } = useContext(AppointmentContext);
  const { barbers } = useContext(BarberContext);
  const { services } = useContext(ServiceContext);

  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");
  const [barberId, setBarberId] = useState("");
  const [serviceId, setServiceId] = useState(""); // 💡 Alterado para armazenar o ID do serviço
  const [scheduledAt, setScheduledAt] = useState("");

  async function handleSubmit() {
    if (!clientName || !phone || !barberId || !serviceId || !scheduledAt) {
      alert("Preencha todos os campos");
      return;
    }

    // Busca o serviço selecionado no array global para capturar o preço e nome real
    const currentService = services.find((s) => s._id === serviceId);

    if (!currentService) {
      alert("Serviço selecionado não encontrado");
      return;
    }

    await createAppointment({
      clientName,
      phone,
      barberId,
      service: currentService.name, // Nome do serviço (String)
      price: Number(currentService.price), // 💡 ADICIONADO: Preço exigido pelo Zod
      scheduledAt: new Date(scheduledAt).toISOString(),
    });

    onClose();
  }
  return (
    <div style={overlay}>
      <div style={modal}>
        <h2 style={{ marginBottom: 20 }}>Novo Agendamento</h2>

        <input placeholder="Nome do cliente" value={clientName} onChange={(e) => setClientName(e.target.value)} style={input} />

        <input placeholder="Telefone" value={phone} onChange={(e) => setPhone(e.target.value)} style={input} />

        <select value={barberId} onChange={(e) => setBarberId(e.target.value)} style={input}>
          <option value="">Selecione barbeiro</option>
          {barbers.map((b) => (
            <option key={b._id} value={b._id}>
              {b.name}
            </option>
          ))}
        </select>

        {/* 💡 Modificado para enviar o s._id no value */}
        <select value={serviceId} onChange={(e) => setServiceId(e.target.value)} style={input}>
          <option value="">Selecione serviço</option>
          {services.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>

        <input
          type="datetime-local"
          value={scheduledAt}
          onChange={(e) => setScheduledAt(e.target.value)}
          style={input}
        />

        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button onClick={handleSubmit} style={btnPrimary}>
            Criar
          </button>

          <button onClick={onClose} style={btnSecondary}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

const overlay: CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.7)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modal: CSSProperties = {
  background: "#111",
  padding: 24,
  borderRadius: 16,
  width: "100%",
  maxWidth: 420,
  border: "1px solid #222",
};

const input: CSSProperties = {
  width: "100%",
  padding: 10,
  marginBottom: 10,
  borderRadius: 8,
  border: "1px solid #222",
  background: "#0f0f0f",
  color: "#fff",
  outline: "none",
};

const btnPrimary: CSSProperties = {
  flex: 1,
  padding: 10,
  borderRadius: 8,
  border: "none",
  background: "#c8a24a",
  color: "#000",
  fontWeight: "bold",
  cursor: "pointer",
};

const btnSecondary: CSSProperties = {
  flex: 1,
  padding: 10,
  borderRadius: 8,
  border: "1px solid #333",
  background: "transparent",
  color: "#fff",
  cursor: "pointer",
};