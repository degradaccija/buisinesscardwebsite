import type { Dict } from "@/i18n";
import type { SiteProfile } from "@/lib/types";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";

export function Footer({
  dict,
  profile,
}: {
  dict: Dict;
  profile: SiteProfile | null;
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
        <p className="font-mono text-sm text-text-muted">
          © {year} {profile?.name ? `${profile.name}.` : ""} {dict.footer.rights}
        </p>
        <div className="flex items-center gap-4">
          {profile?.github_url ? (
            <a
              href={profile.github_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-text-muted transition-colors hover:text-accent"
            >
              <GitHubIcon className="h-5 w-5" />
            </a>
          ) : null}
          {profile?.linkedin_url ? (
            <a
              href={profile.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-text-muted transition-colors hover:text-accent"
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
