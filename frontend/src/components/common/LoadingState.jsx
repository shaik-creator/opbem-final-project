export default function LoadingState({ rows = 5 }) {
  return (
    <div className="space-y-3 orbem-fade-in">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="h-14 rounded-xl overflow-hidden relative bg-gray-100"
          style={{ opacity: 1 - index * 0.07 }}
        >
          <div
            className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100"
            style={{ backgroundSize: '200% 100%', animation: `shimmer 1.5s infinite linear ${index * 0.1}s` }}
          />
        </div>
      ))}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
