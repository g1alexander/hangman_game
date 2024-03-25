interface KeyboardLetterProps {
  children: React.ReactNode;
  isActive: boolean;
}

export default function KeyboardLetter({
  children,
  isActive,
}: KeyboardLetterProps) {
  return (
    <button className={`btn keyboard-letter`} disabled={!isActive}>
      {children}
    </button>
  );
}
