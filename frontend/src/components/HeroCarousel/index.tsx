import { useEffect, useState } from "react";
const images = [
  {
    url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1",
    position: "center 20%",
  },
  {
    url: "https://images.unsplash.com/photo-1520975916090-3105956dac38",
    position: "center 25%",
  },
  {
    url: "https://images.unsplash.com/photo-1621605815971-fbc98d665033",
    position: "center 35%",
  },
];

export function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        height: "320px",
        borderRadius: "16px",
        overflow: "hidden",
        position: "relative",
        marginBottom: "30px",
        backgroundImage: `url(${images[index].url})`,
        backgroundSize: "cover",
        backgroundPosition: images[index].position,
        transition: "all 0.6s ease",
      }}
    >
      {/* overlay escuro */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.55)",
        }}
      />

      {/* texto */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          color: "#fff",
          zIndex: 2,
          maxWidth: "80%",
        }}
      >
        <p
          style={{
            margin: 0,
            opacity: 0.85,
            fontSize: "14px",
          }}
        >
          Experiência premium em cortes e barba
        </p>
      </div>
    </div>
  );
}
