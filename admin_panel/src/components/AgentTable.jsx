import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  BsTrash,
  BsPencil,
  BsToggleOn,
  BsToggleOff,
  BsSearch,
} from "react-icons/bs";
import { Tooltip } from "react-tooltip";

const mockAgents = [
  {
    id: 1,
    name: "David Kwame",
    email: "david@example.com",
    phone: "+233 24 000 1111",
    agentId: "AGT123",
    password: "secret123",
    assignedPoll: "SRC Hall A",
    status: true,
  },
  {
    id: 2,
    name: "Sarah Mensah",
    email: "sarah@school.edu",
    phone: "+233 20 999 8888",
    agentId: "AGT456",
    password: "sarahpass",
    assignedPoll: "Main Auditorium",
    status: false,
  },
  {
    id: 3,
    name: "Michael Teye",
    email: "mteye@domain.com",
    phone: "+233 50 111 2233",
    agentId: "AGT789",
    password: "mtsecure",
    assignedPoll: "ICT Lab",
    status: true,
  },
  {
    id: 4,
    name: "Ama Boateng",
    email: "ama.boateng@gmail.com",
    phone: "+233 27 556 7823",
    agentId: "AGT321",
    password: "abpass",
    assignedPoll: "Block B",
    status: false,
  },
  {
    id: 5,
    name: "Kwabena Owusu",
    email: "kowusu@edu.com",
    phone: "+233 55 234 1111",
    agentId: "AGT102",
    password: "kowusu1",
    assignedPoll: "Law Faculty",
    status: true,
  },
  {
    id: 6,
    name: "Esi Darko",
    email: "esi.darko@gmail.com",
    phone: "+233 59 777 1234",
    agentId: "AGT610",
    password: "darkoesi",
    assignedPoll: "Lecture Block C",
    status: false,
  },
];

export default function AgentTable() {
  const [agents, setAgents] = useState(mockAgents);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    AOS.init({ duration: 700 });
  }, []);

  const toggleStatus = (id) => {
    setAgents((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: !a.status } : a))
    );
  };

  const deleteAgent = (id) => {
    setAgents((prev) => prev.filter((a) => a.id !== id));
  };

  const filteredAgents = agents.filter((a) =>
    [a.name, a.email, a.assignedPoll].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredAgents.length / itemsPerPage);
  const paginatedAgents = filteredAgents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 overflow-auto">
  {/* Header: Sort Dropdown + Search */}
<div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b flex-wrap gap-3">
  {/* Sort Dropdown */}
  <div className="relative">
    <select
      onChange={(e) => {
        const value = e.target.value;
        if (value === "az") {
          setAgents((prev) =>
            [...prev].sort((a, b) => a.name.localeCompare(b.name))
          );
        } else if (value === "za") {
          setAgents((prev) =>
            [...prev].sort((a, b) => b.name.localeCompare(a.name))
          );
        } else if (value === "poll") {
          setAgents((prev) =>
            [...prev].sort((a, b) => a.assignedPoll.localeCompare(b.assignedPoll))
          );
        } else if (value === "status") {
          setAgents((prev) =>
            [...prev].sort((a, b) => b.status - a.status)
          );
        }
      }}
className="appearance-none w-48 text-sm border rounded-lg px-4 py-2 bg-white shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
>
      <option value="">🔽 Sort by...</option>
      <option value="az">Name A-Z</option>
      <option value="za">Name Z-A</option>
      <option value="poll">Poll Station</option>
      <option value="status">Status</option>
    </select>
  </div>

  {/* Search Box */}
  <div className="relative w-full max-w-xs ml-auto">
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
      }}
      placeholder="Search by name, email or poll..."
      className="w-full pl-10 pr-4 py-2 text-sm border rounded focus:outline-none focus:ring"
    />
    <BsSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
  </div>
</div>

      {/* Table */}
      <table className="w-full min-w-[1100px] text-sm text-gray-800">
        <thead className="bg-gradient-to-tr from-gray-900 to-indigo-500 text-left text-white">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Phone</th>
            <th className="p-4">Agent ID</th>
            <th className="p-4">Password</th>
            <th className="p-4">Assigned Poll</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedAgents.map((agent) => (
            <tr
              key={agent.id}
              className="border hover:bg-blue-50 transition-all text-md"
              data-aos="fade-in"
            >
              <td className="p-4">{agent.name}</td>
              <td className="p-4">{agent.email}</td>
              <td className="p-4">{agent.phone}</td>
              <td className="p-4">{agent.agentId}</td>
              <td className="p-4 font-mono">{agent.password}</td>
              <td className="p-4">{agent.assignedPoll}</td>
              <td className="p-4">
                <button onClick={() => toggleStatus(agent.id)}>
                  {agent.status ? (
                    <BsToggleOn className="text-green-500 text-2xl" />
                  ) : (
                    <BsToggleOff className="text-gray-400 text-2xl" />
                  )}
                </button>
              </td>
              <td className="p-4 text-center space-x-3">
                <button
                  className="text-blue-600 hover:bg-blue-200 border p-2 rounded-full transition"
                  data-tooltip-id={`edit-${agent.id}`}
                  data-tooltip-content="Edit agent"
                >
                  <BsPencil />
                  <Tooltip id={`edit-${agent.id}`} place="top" />
                </button>
                <button
                  onClick={() => deleteAgent(agent.id)}
                  className="text-red-600 hover:bg-red-200 border p-2 rounded-full transition"
                  data-tooltip-id={`delete-${agent.id}`}
                  data-tooltip-content="Delete agent"
                >
                  <BsTrash />
                  <Tooltip id={`delete-${agent.id}`} place="top" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center px-4 py-3 bg-gray-50 border-t text-sm text-gray-600 space-x-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
