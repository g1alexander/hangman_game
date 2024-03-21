interface SelectableCategoryProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function SelectableCategory({
  children,
  onClick,
}: SelectableCategoryProps) {
  return (
    <article className="selectable-category" onClick={onClick}>
      {children}
    </article>
  );
}
