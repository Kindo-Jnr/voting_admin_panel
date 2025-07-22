import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dasboard";
import ManageAgents from "../pages/ManageAgents";
import ManageElections from "../pages/ManageElections"
import ManageCandidates from "../pages/manageCandidates";
import ManageVoters from "../pages/ManageVoters"
import ResultsPage from "../pages/ResultsPage"
import Settings from "../pages/Settings"
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/agents" element={<ManageAgents />} />
        <Route path="/admin/elections" element={<ManageElections/>} />
        <Route path="/admin/candidates" element={<ManageCandidates/>} />
        <Route path="/admin/voters" element={<ManageVoters/>} />
        <Route path="/admin/results" element={<ResultsPage/>} />
        <Route path="/admin/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}
