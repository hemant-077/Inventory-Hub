const Loading = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <div className="surface-card flex items-center gap-3 px-6 py-4">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-sky-300/30 border-t-sky-400"></span>
        <p className="text-sm font-medium text-slate-200">Loading products...</p>
      </div>
    </div>
  );
};

export default Loading;
