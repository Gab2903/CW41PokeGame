import {
  createRoutesFromElements,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/Home";
// import toast, { Toaster } from "react-hot-toast";

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<Home />}></Route>)
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
