import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">Workout Routines</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
