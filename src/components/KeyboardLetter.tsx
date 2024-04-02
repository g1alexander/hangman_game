interface KeyboardLetterProps {
  children: React.ReactNode;
  isActive: boolean;
  onClick?: () => void;
}

export default function KeyboardLetter({
  children,
  isActive,
  onClick,
}: KeyboardLetterProps) {
  return (
    <button
      onClick={onClick}
      className={`btn keyboard-letter`}
      disabled={!isActive}
    >
      {children}
    </button>
  );
}
