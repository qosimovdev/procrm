function ProjectCardSkeleton() {
  return (
    <div className="rounded-2xl mt-5 border border-white/10 bg-white/5 p-4 animate-pulse">
      {/* top badges */}
      <div className="flex items-center justify-between mb-5">
        <div className="h-7 w-24 rounded-full bg-white/10" />

        <div className="h-7 w-16 rounded-full bg-white/10" />
      </div>

      {/* progress + title */}
      <div className="flex gap-4 mb-5">
        <div className="h-24 w-24 rounded-full border-8 border-white/10" />

        <div className="flex-1 space-y-3 pt-2">
          <div className="h-6 w-36 rounded-lg bg-white/10" />

          <div className="h-4 w-24 rounded-lg bg-white/10" />
        </div>
      </div>

      {/* description */}
      <div className="space-y-2 mb-4">
        <div className="h-4 w-full rounded-lg bg-white/10" />

        <div className="h-4 w-3/4 rounded-lg bg-white/10" />
      </div>

      {/* tags */}
      <div className="flex gap-2 mb-5">
        <div className="h-6 w-16 rounded-full bg-white/10" />

        <div className="h-6 w-20 rounded-full bg-white/10" />

        <div className="h-6 w-24 rounded-full bg-white/10" />
      </div>

      {/* progress line */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <div className="h-4 w-16 rounded bg-white/10" />

          <div className="h-4 w-10 rounded bg-white/10" />
        </div>

        <div className="h-2 w-full rounded-full bg-white/10" />
      </div>

      {/* footer */}
      <div className="flex items-center justify-between mb-5">
        <div className="h-8 w-28 rounded-full bg-white/10" />

        <div className="h-5 w-24 rounded bg-white/10" />
      </div>

      {/* button */}
      <div className="h-11 w-full rounded-2xl bg-white/10" />
    </div>
  );
}

export default ProjectCardSkeleton;
