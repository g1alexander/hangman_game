interface PlayableLetterProps {
  children: React.ReactNode;
  isActive: boolean;
}

export default function PlayableLetter({
  children,
  isActive,
}: PlayableLetterProps) {
  return (
    <button className="playable-letter">
      <div className={`playable-letter__container1 ${!isActive && "disabled"}`}>
        <div
          className={`playable-letter__container2 ${!isActive && "disabled"}`}
        >
          {isActive && children}
        </div>
      </div>
    </button>
  );
}
