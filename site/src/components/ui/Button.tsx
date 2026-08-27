import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost";

const baseClasses =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-[border-color,background-color,box-shadow,transform] duration-200 ease-snap active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variantClasses: Record<Variant, string> = {
  primary:
    "border-accent-strong bg-accent-strong text-white hover:border-accent hover:shadow-[0_0_24px_var(--color-accent-glow)]",
  ghost:
    "border-border bg-transparent text-text-primary hover:border-accent/40 hover:bg-surface-2",
};

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", className, children, ...rest } = props;
  const classes = `${baseClasses} ${variantClasses[variant]} ${className ?? ""}`;

  if (props.href) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
