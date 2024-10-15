import {
  createRoutesFromElements,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/Home";
import BattlePage from "./pages/BattlePage";
//router
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />

      <Route path="/battle/:pokemonId" element={<BattlePage />} />

      <Route path="*" element={<div>404 Not Found</div>} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
