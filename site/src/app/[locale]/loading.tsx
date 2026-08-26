export default function Loading() {
  return (
    <main className="flex-1">
      <div className="mx-auto max-w-6xl animate-pulse px-4 py-24 sm:px-6 lg:px-8">
        <div className="h-8 w-24 rounded bg-surface-2" />
        <div className="mt-6 h-16 w-3/4 rounded bg-surface-2" />
        <div className="mt-4 h-4 w-1/2 rounded bg-surface-2" />
        <div className="mt-16 h-4 w-full rounded bg-surface-2" />
        <div className="mt-4 h-4 w-full rounded bg-surface-2" />
        <div className="mt-4 h-4 w-2/3 rounded bg-surface-2" />
      </div>
    </main>
  );
}
