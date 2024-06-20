export default function AuthLayout({ children }) {
  return (
    <div
      className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900"
      style={{ height: `calc(100vh - var(--header-width))` }}
    >
      {children}
    </div>
  );
}
