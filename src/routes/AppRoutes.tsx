import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Register from "@/pages/Register";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/register", element: <Register /> },
];

export default function AppRoutes() {
  return (
    <Routes>
      {routes.map((r) => (
        <Route key={r.path} path={r.path} element={r.element} />
      ))}
    </Routes>
  );
}
