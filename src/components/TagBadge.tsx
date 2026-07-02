interface TagBadgeProps {
  label: string;
}

export function TagBadge({ label }: TagBadgeProps) {
  return (
    <span className="font-body inline-block bg-slate-100 text-slate-600 text-xs font-medium px-2 py-0.5 rounded">
      {label}
    </span>
  );
}
