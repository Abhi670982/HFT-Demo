const tones = [
  "bg-pastel-lavender text-icon-violet",
  "bg-pastel-blue text-icon-blue",
  "bg-pastel-mint text-icon-teal",
  "bg-pastel-pink text-icon-pink",
  "bg-pastel-orange text-icon-orange",
] as const;

interface AvatarProps {
  name: string;
  className?: string;
}

/** Neutral identity-safe avatar: initials on a pastel disc. */
export default function Avatar({ name, className }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const tone = tones[name.length % tones.length];

  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-full font-bold ${tone} ${className ?? ""}`}
    >
      {initials}
    </span>
  );
}
