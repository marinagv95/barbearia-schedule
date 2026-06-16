import { useContext } from "react";

import { Header } from "../../components/Header";
import { BarberCard } from "../../components/BarberComponents/BarberCard";
import { ServiceCard } from "../../components/ServiceComponents/ServiceCard";
import { LocationMap } from "../../components/LocationMap";
import { HeroCarousel } from "../../components/HeroCarousel";

import { BarberContext } from "../../providers/barberProviders/barberContext";
import { ServiceContext } from "../../providers/serviceProviders/serviceContext";

export default function Home() {
  const { barbers, loading: loadingBarbers } = useContext(BarberContext);

  const { services, loading: loadingServices } = useContext(ServiceContext);

  return (
    <div className="container py-4 dark-section">
      <Header />

      {/* HERO CAROUSEL */}
      <HeroCarousel />

       {/* ================= CTA WHATSAPP (MOVIDO PRA CIMA E ESTILIZADO) ================= */}
      <section
        style={{
          margin: "40px 0",
          padding: "50px 30px",
          borderRadius: "28px",
          background:
            "linear-gradient(135deg, rgba(200,162,74,0.12), rgba(0,0,0,0.85))",
          border: "1px solid rgba(200,162,74,0.2)",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        }}
      >
        {/* glow */}
        <div
          style={{
            position: "absolute",
            width: "300px",
            height: "300px",
            background: "rgba(200,162,74,0.12)",
            filter: "blur(80px)",
            top: "-120px",
            left: "-120px",
          }}
        />

        <div style={{ position: "relative", zIndex: 2 }}>
          <h2
            style={{
              color: "#fff",
              fontSize: "34px",
              fontWeight: 800,
              marginBottom: "10px",
            }}
          >
            Agende seu horário em segundos
          </h2>

          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "16px",
              maxWidth: "600px",
              margin: "0 auto 25px auto",
              lineHeight: 1.6,
            }}
          >
            Escolha seu barbeiro, veja os serviços e marque seu atendimento
            direto pelo WhatsApp sem complicação.
          </p>

          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            style={{
              display: "inline-block",
              padding: "14px 28px",
              borderRadius: "999px",
              background: "linear-gradient(135deg, #25D366, #1faa52)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "16px",
              textDecoration: "none",
              boxShadow: "0 10px 25px rgba(37,211,102,0.25)",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform =
                "scale(1.05)";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform =
                "scale(1)";
            }}
          >
            Agendar no WhatsApp 💬
          </a>
        </div>

        </section>

      {/* SERVICES */}
      <section id="services" className="mb-5">
        <h2 className="fw-bold mb-3">Serviços</h2>

        {loadingServices && (
          <p className="text-muted-custom">Carregando serviços...</p>
        )}

        <div className="row g-2">
          {services.map((service) => (
            <div className="col-12 col-sm-6 col-md-3" key={service._id}>
              <ServiceCard
                service={service}
                onSelect={() => console.log(service)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* BARBERS */}
      <section id="barbers" className="mb-5">
        <h2 className="fw-bold mb-3">Barbeiros</h2>

        {loadingBarbers && (
          <p className="text-muted-custom">Carregando barbeiros...</p>
        )}

        <div className="row g-2">
          {barbers.map((barber) => (
            <div className="col-12 col-sm-6 col-md-3" key={barber._id}>
              <BarberCard barber={barber} onClick={() => console.log(barber)} />
            </div>
          ))}
        </div>
      </section>

      {/* LOCALIZAÇÃO */}
      <LocationMap />

      {/* SOBRE A PLATAFORMA */}
      <section
        id="about"
        className="my-5"
        style={{
          background: "linear-gradient(180deg, #171717 0%, #101010 100%)",

          border: "1px solid rgba(200,162,74,0.15)",

          borderRadius: "24px",

          padding: "40px 32px",

          position: "relative",

          overflow: "hidden",

          boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
        }}
      >
        {/* GLOW */}
        <div
          style={{
            position: "absolute",

            width: "220px",
            height: "220px",

            background: "rgba(200,162,74,0.08)",

            borderRadius: "50%",

            top: "-120px",
            right: "-100px",

            filter: "blur(30px)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
          }}
        >
          <span
            style={{
              color: "#c8a24a",

              fontSize: "14px",

              fontWeight: 700,

              letterSpacing: "1px",

              textTransform: "uppercase",
            }}
          >
            Experiência moderna
          </span>

          <h2
            className="fw-bold mt-2"
            style={{
              fontSize: "42px",

              maxWidth: "700px",

              lineHeight: 1.2,
            }}
          >
            Reserve seu horário sem filas, sem complicação e direto pelo site.
          </h2>

          <p
            style={{
              color: "rgba(255,255,255,0.72)",

              fontSize: "17px",

              lineHeight: 1.8,

              maxWidth: "780px",

              marginTop: "20px",
            }}
          >
            A BarberFlow foi criada para trazer mais praticidade ao seu dia a
            dia. Aqui você consegue visualizar barbeiros, serviços, horários e
            realizar seu agendamento de forma rápida e organizada, evitando
            esperas e filas desnecessárias.
          </p>

          <p
            style={{
              color: "rgba(255,255,255,0.72)",

              fontSize: "17px",

              lineHeight: 1.8,

              maxWidth: "780px",
            }}
          >
            Tudo pensado para oferecer uma experiência premium desde o primeiro
            clique até o momento do seu atendimento.
          </p>

          {/* FEATURES */}
          <div className="row mt-4 g-3">
            <div className="col-12 col-md-4">
              <div
                style={{
                  background: "rgba(255,255,255,0.03)",

                  border: "1px solid rgba(255,255,255,0.05)",

                  borderRadius: "18px",

                  padding: "20px",
                }}
              >
                <h5
                  style={{
                    color: "#fff",
                    marginBottom: "10px",
                  }}
                >
                  ⚡ Agendamento rápido
                </h5>

                <p
                  style={{
                    color: "rgba(255,255,255,0.65)",

                    margin: 0,

                    lineHeight: 1.6,
                  }}
                >
                  Marque seu horário em poucos segundos.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div
                style={{
                  background: "rgba(255,255,255,0.03)",

                  border: "1px solid rgba(255,255,255,0.05)",

                  borderRadius: "18px",

                  padding: "20px",
                }}
              >
                <h5
                  style={{
                    color: "#fff",
                    marginBottom: "10px",
                  }}
                >
                  ⏰ Sem filas
                </h5>

                <p
                  style={{
                    color: "rgba(255,255,255,0.65)",

                    margin: 0,

                    lineHeight: 1.6,
                  }}
                >
                  Atendimento organizado e mais confortável.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div
                style={{
                  background: "rgba(255,255,255,0.03)",

                  border: "1px solid rgba(255,255,255,0.05)",

                  borderRadius: "18px",

                  padding: "20px",
                }}
              >
                <h5
                  style={{
                    color: "#fff",
                    marginBottom: "10px",
                  }}
                >
                  💈 Experiência premium
                </h5>

                <p
                  style={{
                    color: "rgba(255,255,255,0.65)",

                    margin: 0,

                    lineHeight: 1.6,
                  }}
                >
                  Tecnologia e praticidade em um só lugar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

   

      {/* FOOTER */}
      <footer
        className="text-center py-4 border-top"
        style={{
          color: "rgba(255,255,255,0.7)",
        }}
      >
        © BarberFlow — Todos os direitos reservados
      </footer>
    </div>
  );
}
