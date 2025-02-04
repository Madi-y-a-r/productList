export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="border rounded-lg p-4 h-[400px] animate-pulse bg-gray-100"
          />
        ))}
      </div>
    </div>
  );
}
