import { useContext } from "react";

import { Header } from "../../components/Header";
import { BarberCard } from "../../components/BarberCard";
import { ServiceCard } from "../../components/ServiceCard";
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

      {/* HERO CAROUSEL (COMPONENTE) */}
      <HeroCarousel />

      {/* SOBRE */}
      <div className="mb-5">
        <h2 className="fw-bold">Sobre a BarberFlow</h2>

        <p className="fs-6 mt-2 text-muted-custom">
          Somos uma barbearia moderna focada em estilo, conforto e experiência
          premium. Aqui você encontra cortes clássicos, modernos e atendimento
          de alto padrão, tudo pensado para sua melhor versão.
        </p>
      </div>

      {/* SERVICES */}
      <section id="services" className="mb-5">
        <h2 className="fw-bold mb-3">Serviços</h2>

        {loadingServices && (
          <p className="text-muted-custom">Carregando serviços...</p>
        )}

        <div className="row g-3">
          {services.map((service) => (
            <div className="col-12 col-sm-6 col-md-4" key={service._id}>
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

        <div className="row g-3">
          {barbers.map((barber) => (
            <div className="col-12 col-sm-6 col-md-4" key={barber._id}>
              <BarberCard barber={barber} onClick={() => console.log(barber)} />
            </div>
          ))}
        </div>
      </section>

      {/* LOCALIZAÇÃO */}
      <LocationMap />

      {/* CTA FINAL */}
      <div className="text-center py-5">
        <div className="mb-3">
          <h4 className="fw-bold">Pronto para seu novo visual?</h4>

          <p className="text-muted-custom">Agende agora e evite filas</p>
        </div>

        <a
          href="https://wa.me/5511999999999"
          target="_blank"
          className="btn btn-success btn-lg px-5 fw-bold shadow"
        >
          Agendar no WhatsApp 💬
        </a>
      </div>

      {/* FOOTER */}
      <footer
        className="text-center py-4 border-top"
        style={{ color: "rgba(255,255,255,0.7)" }}
      >
        © BarberFlow — Todos os direitos reservados
      </footer>
    </div>
  );
}
