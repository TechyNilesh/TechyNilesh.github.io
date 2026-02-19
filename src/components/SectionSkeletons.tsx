const Bone = ({ className = '' }: { className?: string }) => (
  <div className={`rounded bg-muted-foreground/10 ${className}`} />
);

function SkeletonWrapper({ children }: { children: React.ReactNode }) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 md:gap-16">
        <div>
          <Bone className="h-8 w-28" />
        </div>
        <div>{children}</div>
      </div>
      <div className="elegant-divider">
        <div className="elegant-divider-dot" />
      </div>
    </section>
  );
}

export function AboutSkeleton() {
  return (
    <SkeletonWrapper>
      <div className="space-y-8">
        <div className="space-y-3">
          <Bone className="h-5 w-full" />
          <Bone className="h-5 w-4/5" />
        </div>
        <div className="space-y-3">
          <Bone className="h-4 w-full" />
          <Bone className="h-4 w-11/12" />
          <Bone className="h-4 w-3/4" />
        </div>
        <div className="space-y-3">
          <Bone className="h-4 w-full" />
          <Bone className="h-4 w-5/6" />
        </div>
      </div>
    </SkeletonWrapper>
  );
}

export function ExperienceSkeleton() {
  return (
    <SkeletonWrapper>
      <Bone className="h-4 w-full mb-6" />
      <div className="space-y-12 pl-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Bone className="h-7 w-48" />
            <Bone className="h-5 w-36" />
            <Bone className="h-3 w-44" />
            <div className="space-y-2 mt-2">
              <Bone className="h-4 w-full" />
              <Bone className="h-4 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </SkeletonWrapper>
  );
}

export function SkillsSkeleton() {
  return (
    <SkeletonWrapper>
      <Bone className="h-4 w-full mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="p-5 rounded-xl border border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <Bone className="h-1 w-6" />
              <Bone className="h-5 w-32" />
            </div>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 4 + (i % 3) }).map((_, j) => (
                <Bone key={j} className="h-7 w-16 rounded-md" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </SkeletonWrapper>
  );
}

export function AchievementsSkeleton() {
  return (
    <SkeletonWrapper>
      <Bone className="h-4 w-full mb-6" />
      <div className="space-y-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-baseline justify-between gap-4 py-4">
            <Bone className="h-5 w-3/4" />
            <Bone className="h-3 w-20" />
          </div>
        ))}
      </div>
    </SkeletonWrapper>
  );
}

export function EducationSkeleton() {
  return (
    <SkeletonWrapper>
      <Bone className="h-4 w-full mb-6" />
      <div className="space-y-8 pl-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="flex items-baseline justify-between gap-4">
              <Bone className="h-6 w-56" />
              <Bone className="h-3 w-24" />
            </div>
            <Bone className="h-4 w-48" />
            <Bone className="h-3 w-64" />
          </div>
        ))}
      </div>
    </SkeletonWrapper>
  );
}

export function CertificationsSkeleton() {
  return (
    <SkeletonWrapper>
      <Bone className="h-4 w-full mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-5 rounded-xl border border-border/50">
            <Bone className="h-5 w-3/4 mb-2" />
            <Bone className="h-3 w-32" />
          </div>
        ))}
      </div>
    </SkeletonWrapper>
  );
}

export function ResumeSkeleton() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 md:gap-16">
        <div>
          <Bone className="h-8 w-28" />
        </div>
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="aspect-[8.5/11] rounded-lg border border-border/50 bg-muted/20" />
            ))}
          </div>
          <div className="flex justify-center">
            <Bone className="h-12 w-48 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
