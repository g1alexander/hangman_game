interface ButtonProps {
  children: React.ReactNode;
  color: "btn-blue" | "btn-pink";
}

export default function Button({ children, color }: ButtonProps) {
  return (
    <button className={`${color} btn`}>
      <div className={`${color}__container__1 btn__container1`}>
        <div className={`${color}__container__2 btn__container2`}>
          {children}
        </div>
      </div>
    </button>
  );
}
