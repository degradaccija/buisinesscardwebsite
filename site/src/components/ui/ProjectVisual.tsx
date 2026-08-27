import Image from "next/image";
import type { Project } from "@/lib/types";

function initials(title: string): string {
  const words = title
    .replace(/\[[^\]]*\]/g, " ")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const letters = words
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("");
  return (letters || title.slice(0, 2)).toUpperCase();
}

export function ProjectVisual({
  project,
  sizes,
  className,
}: {
  project: Project;
  sizes: string;
  className?: string;
}) {
  if (project.image_url) {
    return (
      <Image
        src={project.image_url}
        alt={project.title}
        fill
        sizes={sizes}
        className={`absolute inset-0 object-cover ${className ?? ""}`}
      />
    );
  }
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 flex items-center justify-center bg-surface font-display text-4xl font-bold text-accent md:text-6xl ${className ?? ""}`}
    >
      {initials(project.title)}
    </div>
  );
}
