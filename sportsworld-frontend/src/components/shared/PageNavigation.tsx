// src/components/shared/PageNavigation.tsx
import { Link } from "react-router-dom";

const PageNavigation = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-center gap-10">
        <Link to="/" className="text-white text-xl font-medium hover:text-cyan-400">
          Administrate athletes
        </Link>

        <Link to="/register" className="text-white text-xl font-medium hover:text-cyan-400">
        Register a new player
        </Link>

        <Link to="/administration-page" className="text-white text-xl font-medium hover:text-cyan-400">
          Finance dashboard
        </Link>

        <Link to="/page4" className="text-white text-xl font-medium hover:text-cyan-400">
          Page 4
        </Link>

        <Link to="/page5" className="text-white text-xl font-medium hover:text-cyan-400">
          Page 5
        </Link>

        <Link to="/*" className="text-white text-xl font-medium hover:text-cyan-400">
          
        </Link>

      </div>
    </nav>
  );
};

export default PageNavigation;