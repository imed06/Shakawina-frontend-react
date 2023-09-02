import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/auth/login";
import ForgotPassword from "./pages/auth/forgot-password";
import Form from "./pages/form/reclamation";
import Profile from "./pages/user/profile";
import UserReclamations from "./pages/user/mesReclamations";
import LoginAdmin from "./pages/admin/login";
import Dashboard from "./pages/admin/dashboard";
import Reclamation from "./pages/admin/pages/reclamation";
import Suggestion from "./pages/admin/pages/suggestions";
import Remarque from "./pages/admin/pages/remarques";
import AdminProfile from "./pages/admin/profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/forgotpassword" element={<ForgotPassword />} />
        <Route path="/form" element={<Form />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/reclamations" element={<UserReclamations />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/reclamations" element={<Reclamation />} />
        <Route path="/admin/remarques" element={<Remarque />} />
        <Route path="/admin/suggestions" element={<Suggestion />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
