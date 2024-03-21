interface CardProps {
  children: React.ReactNode;
}

export default function Card({ children }: CardProps) {
  return (
    <section className="card">
      <div className="card-2">
        <div className="card-3">{children}</div>
      </div>
    </section>
  );
}
