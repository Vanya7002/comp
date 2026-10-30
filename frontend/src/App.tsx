import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import WorkspacePage from "./pages/WorkspacePage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/auth";
import { useEffect } from "react";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/computers" element={<WorkspacePage />} />
          <Route path="/sessions" element={<WorkspacePage />} />
          <Route path="/history" element={<WorkspacePage />} />
          <Route path="/profile" element={<WorkspacePage />} />
          <Route path="/admin/computers" element={<WorkspacePage />} />
          <Route path="/admin/users" element={<WorkspacePage />} />
          <Route path="/admin/sessions" element={<WorkspacePage />} />
          <Route path="/admin/statistics" element={<WorkspacePage />} />
          <Route path="/settings" element={<WorkspacePage />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function Logout() {
  const { signOut } = useAuth();
  useEffect(() => {
    signOut();
  }, [signOut]);
  return <Navigate to="/login" replace />;
}
