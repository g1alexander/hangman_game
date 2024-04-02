interface PlayableLetterProps {
  children: React.ReactNode;
  isActive: boolean;
  onClick?: () => void;
}

export default function PlayableLetter({
  children,
  isActive,
  onClick,
}: PlayableLetterProps) {
  return (
    <button
      className={`btn btn-blue border-radius-15 border-radius-13 ${
        !isActive && "disabled-blue"
      }`}
      onClick={onClick}
    >
      {isActive && children}
    </button>
  );
}
