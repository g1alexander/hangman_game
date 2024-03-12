interface KeyboardLetterProps {
  children: React.ReactNode;
  isActive: boolean;
}

export default function KeyboardLetter({
  children,
  isActive,
}: KeyboardLetterProps) {
  return (
    <button className={`keyboard-letter ${!isActive && "disabled"}`}>
      {/* <div className={`playable-letter__container1 ${!isActive && "disabled"}`}>
        <div
          className={`playable-letter__container2 ${!isActive && "disabled"}`}
        >
          {isActive && children}
        </div>
      </div> */}
      {children}
    </button>
  );
}
