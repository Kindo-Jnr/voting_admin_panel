import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import AgentTable from "../components/AgentTable";
import AgentModal from "../components/AgentModal";
import { useState } from "react";
import { Tooltip } from "react-tooltip";

export default function ManageAgents() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-50 text-gray-800">
        <Topbar />
        <div className="p-6 flex-1 overflow-auto space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold p-3 rounded-sm shadow-lg text-white bg-gradient-to-tr from-gray-900 to-indigo-500">Registered Agents</h2>
            <div>
              <button
                data-tooltip-id="addAgentTip"
                data-tooltip-content="Click to add a new agent"
                onClick={() => setOpenModal(true)}
                className="bg-gradient-to-tr from-gray-900 to-indigo-500 hover:from-indigo-600 hover:to-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-200"
              >
                + New Agent
              </button>
              <Tooltip id="addAgentTip" place="bottom" />
            </div>
          </div>

          <AgentTable />
          <AgentModal isOpen={openModal} onClose={() => setOpenModal(false)} />
        </div>
      </div>
    </div>
  );
}
