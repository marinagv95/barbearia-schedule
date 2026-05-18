export function LocationMap() {
  return (
    <div style={{ marginTop: "40px" }}>
      <h2 style={{ marginBottom: "12px", fontWeight: 700 }}>
        Nossa localização
      </h2>

      {/* CARD */}
      <div
        style={{
          borderRadius: "14px",
          overflow: "hidden",
          border: "1px solid #222",
          background: "#111",
        }}
      >
        {/* MAPA */}
        <div style={{ height: "280px", width: "100%" }}>
          <iframe
            title="mapa-barbearia"
            src="https://www.google.com/maps?q=Partage+Shopping+Campina+Grande&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* INFO */}
        <div style={{ padding: "16px", color: "#fff" }}>
          <p style={{ margin: 0, fontWeight: 600 }}>
            Partage Shopping Campina Grande
          </p>

          <p style={{ margin: "6px 0", fontSize: "14px", opacity: 0.7 }}>
            Av. Pref. Severino Bezerra Cabral, Campina Grande - PB
          </p>

          <a
            href="https://www.google.com/maps?q=Partage+Shopping+Campina+Grande"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-block",
              marginTop: "10px",
              padding: "10px 14px",
              borderRadius: "8px",
              background: "#c8a24a",
              color: "#000",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Abrir no Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}