export default function UniversalLoader() {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background">
      <div
        className="relative flex h-24 w-24 items-center justify-center"
        role="status"
        aria-live="polite"
        aria-label="Loading website"
      >
        <span className="absolute inset-0 rounded-full border-2 border-border/60" />
        <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-primary/70 animate-spin" />
        <span className="font-serif text-3xl leading-none tracking-tight text-foreground select-none">
          NV
        </span>
      </div>
    </div>
  );
}
