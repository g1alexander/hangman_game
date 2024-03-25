interface SelectableCategoryProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function SelectableCategory({
  children,
  onClick,
}: SelectableCategoryProps) {
  return (
    <article
      className="selectable-category btn-blue border-radius-30"
      onClick={onClick}
    >
      {children}
    </article>
  );
}
