interface PlayableLetterProps {
  step: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
}

export default function TutorialCard({
  step,
  title,
  description,
}: PlayableLetterProps) {
  return (
    <article className="tutorial-card">
      <div>
        <h2>{step}</h2>
        <h3>{title}</h3>
      </div>
      <p>{description}</p>
    </article>
  );
}
