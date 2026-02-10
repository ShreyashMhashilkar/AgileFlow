import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Kanban from "./components/Kanban";
import Pipelines from "./components/Pipelines";
import Login from "./auth/Login";
import Register from "./auth/Register";
import SprintBoard from "./components/SprintBoard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/kanban" element={<Kanban />} />
      <Route path="/pipelines" element={<Pipelines />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/sprint/:id" element={<SprintBoard />} />
      </Routes>
    </BrowserRouter>
  );
}
