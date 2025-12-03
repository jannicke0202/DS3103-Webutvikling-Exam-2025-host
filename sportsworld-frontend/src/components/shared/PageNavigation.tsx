// src/components/shared/PageNavigation.tsx
import { Link } from "react-router-dom";

const PageNavigation = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-center gap-10">
        <Link
          to="/"
          className="text-white text-xl font-medium hover:text-cyan-400"
        >
          Home
        </Link>

        <Link
          to="/administration-panel"
          className="text-white text-xl font-medium hover:text-cyan-400"
        >
          Admin Panel
        </Link>
      </div>
    </nav>
  );
};

export default PageNavigation;