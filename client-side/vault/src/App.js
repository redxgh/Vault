import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import Home from "./components/Home.js";
import AdminHome from "./components/AdminHome.js";
import NotFound from "./components/NotFound.js";
import PassGen from "./components/PassGen.js";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Home />} />
        <Route path="admin" element={<AdminHome />} />
        <Route path="pass" element={<PassGen />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
