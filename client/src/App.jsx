import {
  createRoutesFromElements,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/Home";
import BattlePage from "./pages/BattlePage";
import Roster from "./pages/Roster";
import Leaderboard from "./pages/Leaderboard"; // Import the Leaderboard component
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

// Layout for Navbar
const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="p-8">
        <Outlet />
      </main>
    </>
  );
};

// Router
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/battle" element={<BattlePage />} />
        <Route path="/roster" element={<Roster />} />
        <Route path="/leaderboard" element={<Leaderboard />} />{" "}
        {/* New route for Leaderboard */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
