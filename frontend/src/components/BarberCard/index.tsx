import type { IBarber } from "../../providers/barberProviders/@types";

interface BarberCardProps {
  barber: IBarber;

  onClick: () => void;
}

export function BarberCard({
  barber,
  onClick,
}: BarberCardProps) {
  return (
    <div onClick={onClick}>
      <h3>{barber.name}</h3>

      <p>
        Status:
        {barber.active
          ? " Ativo"
          : " Inativo"}
      </p>
    </div>
  );
}