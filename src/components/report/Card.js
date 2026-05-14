export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl shadow-md p-3 sm:p-4 md:p-6 transition-transform hover:scale-[1.01] ${className}`}>
      {children}
    </div>
  );
}