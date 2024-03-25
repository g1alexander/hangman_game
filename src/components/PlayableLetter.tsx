interface PlayableLetterProps {
  children: React.ReactNode;
  isActive: boolean;
}

export default function PlayableLetter({
  children,
  isActive,
}: PlayableLetterProps) {
  return (
    <button
      className="btn btn-blue border-radius-15 border-radius-13"
      disabled={!isActive}
    >
      {isActive && children}
    </button>
  );
}
