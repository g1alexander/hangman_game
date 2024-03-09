interface ButtonProps {
  children: React.ReactNode;
  color: "btn-blue" | "btn-pink";
}

export default function Button({ children, color }: ButtonProps) {
  return (
    <button className={color}>
      <div className={`${color}__container__1`}>
        <div className={`${color}__container__2`}>{children}</div>
      </div>
    </button>
  );
}
