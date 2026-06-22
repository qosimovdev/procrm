function AppLoader() {
  console.log("app loader");

  return (
    <div className="h-screen w-full flex items-center justify-center bg relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute w-72 h-72 bg-primary-light/20 blur-3xl rounded-full" />
      <div className="absolute w-96 h-96 bg-violet-500/10 blur-3xl rounded-full top-20 right-20" />

      {/* Loader card */}
      <div className="relative z-10 flex flex-col items-center gap-6 glass-strong px-10 py-8 rounded-2xl border border-white/10 shadow-2xl">
        {/* Logo */}
        <h1 className="text-4xl font-bold tracking-wide text-primary-light">
          ProCRM
        </h1>

        {/* Spinner */}
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-4 border-primary-light/20" />
          <div className="absolute w-16 h-16 rounded-full border-4 border-primary-light border-t-transparent animate-spin" />
        </div>

        {/* Loading text */}
        <p className="text-text-secondary text-sm tracking-wide animate-pulse">
          Loading your workspace...
        </p>
      </div>
    </div>
  );
}

export default AppLoader;
