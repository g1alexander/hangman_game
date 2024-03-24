interface ButtonProps {
  children: React.ReactNode;
  color: "btn-blue btn" | "btn-pink btn" | "btn-navigation";
  onClick: () => void;
}

export default function Button({ children, color, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className={`${color}`}>
      {children}
    </button>
  );
}
