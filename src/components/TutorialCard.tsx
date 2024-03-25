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
      <h2 className="tutorial-card-step">{step}</h2>
      <h3 className="tutorial-card-title">{title}</h3>
      <p className="tutorial-card-description">{description}</p>
    </article>
  );
}
