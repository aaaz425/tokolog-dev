interface TagBadgeProps {
  label: string;
}

export function TagBadge({ label }: TagBadgeProps) {
  return (
    <span className="font-body inline-block bg-gray-100 text-[#424242] text-xs font-medium px-2 py-0.5 rounded">
      {label}
    </span>
  );
}
