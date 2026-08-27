import type { ReactNode } from "react";

const EMPHASIS = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;

export function parseEmphasis(text: string): ReactNode[] {
  return text.split(EMPHASIS).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={index} className="font-medium text-text-primary">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}
