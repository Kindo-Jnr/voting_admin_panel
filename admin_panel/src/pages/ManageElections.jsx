import Sidebar from "../components/Sidebar";

import ElectionsTable from "../components/ElectionsTable";
import Topbar from "../components/Topbar";

export default function ManageElections() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-50 text-gray-800">
        <Topbar />
        <div className="p-6 flex-1 overflow-auto space-y-7">
          <ElectionsTable />
        </div>
      </div>
    </div>
  );
}
