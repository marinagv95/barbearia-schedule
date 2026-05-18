import { useContext, useState } from "react";

import type { IService } from "../../../providers/serviceProviders/@types";
import { ServiceContext } from "../../../providers/serviceProviders/serviceContext";

interface ServiceModalProps {
  service: IService;
  onClose: () => void;
}

export function ServiceModal({ service, onClose }: ServiceModalProps) {
  const { updateService, deleteService } = useContext(ServiceContext);

  const [name, setName] = useState(service.name);
  const [price, setPrice] = useState(String(service.price));
  const [duration, setDuration] = useState(String(service.duration));

  const handleUpdate = async () => {
    if (!name || !price || !duration) return;

    await updateService(service._id, {
      name,
      price: Number(price),
      duration: Number(duration),
    });

    onClose();
  };

  const handleDelete = async () => {
    await deleteService(service._id);
    onClose();
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <h2 style={{ marginBottom: "12px" }}>Editar serviço</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome do serviço (ex: Corte masculino)"
          style={inputStyle}
        />

        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Preço (ex: 30)"
          style={inputStyle}
        />

        <input
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Duração em minutos (ex: 30)"
          style={inputStyle}
        />

        <button onClick={handleUpdate} style={btnPrimary}>
          Salvar
        </button>

        <button onClick={handleDelete} style={btnDanger}>
          Deletar
        </button>

        <button onClick={onClose} style={btnSecondary}>
          Fechar
        </button>
      </div>
    </div>
  );
}

/* STYLES */

const overlay: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modal: React.CSSProperties = {
  background: "#111",
  padding: "20px",
  borderRadius: "12px",
  width: "320px",
  color: "#fff",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "6px",
  border: "1px solid #333",
  background: "#000",
  color: "#fff",
  outline: "none",
};

const btnPrimary: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  marginBottom: "8px",
  background: "#c8a24a",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};

const btnDanger: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  marginBottom: "8px",
  background: "#ff4d4d",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  color: "#fff",
};

const btnSecondary: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  background: "#222",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  color: "#fff",
};