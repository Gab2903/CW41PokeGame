import {
  createRoutesFromElements,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/Home";
import BattlePage from "./pages/BattlePage";
import Roster from "./pages/Roster";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

// Layout für Navbar
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
        <Route path="/battle" element={<BattlePage />} /> {/* Updated Route */}
        <Route path="/roster" element={<Roster />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
