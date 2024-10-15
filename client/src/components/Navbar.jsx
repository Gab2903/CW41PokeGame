// Navigation zwischen Home + Roster + Leaderboard
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 p-4 shadow-lg">
      <ul className="flex justify-center space-x-8">
        <li>
          <NavLink
            to="/"
            exact="true"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-400 font-bold border-b-2 border-yellow-400"
                : "text-white hover:text-yellow-400"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/roster"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-400 font-bold border-b-2 border-yellow-400"
                : "text-white hover:text-yellow-400"
            }
          >
            Roster
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/leaderboard"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-400 font-bold border-b-2 border-yellow-400"
                : "text-white hover:text-yellow-400"
            }
          >
            Leaderboard
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
