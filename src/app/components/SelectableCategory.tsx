interface SelectableCategoryProps {
  children: React.ReactNode;
}

export default function SelectableCategory({
  children,
}: SelectableCategoryProps) {
  return <article className="selectable-category">{children}</article>;
}
