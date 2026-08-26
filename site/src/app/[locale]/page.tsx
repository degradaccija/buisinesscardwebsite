export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "lv" }];
}

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <p className="font-mono text-accent">$ locale: {locale}</p>
      <h1 className="mt-4 font-display text-4xl font-bold">
        Mārcis Krēgers
      </h1>
      <p className="mt-2 text-text-muted">Setup complete. Sections coming soon.</p>
    </main>
  );
}
