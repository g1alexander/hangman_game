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
      <h2>{step}</h2>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}
