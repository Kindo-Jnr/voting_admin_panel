import { useState, useEffect } from "react";
import { BsTrash, BsPencil, BsToggleOn, BsToggleOff, BsSearch, BsPlus } from "react-icons/bs";
import { Tooltip } from "react-tooltip";
import ElectionFormModal from "./ElectionFormModal";
import toast from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
import { ClipLoader } from "react-spinners";

const initialElections = [
  {
    id: 1,
    title: "SRC General Elections 2025",
    date: "2025-08-01",
    candidates: 4,
    voters: 1250,
    status: true,
    permission: "All Voters",
  },
  {
    id: 2,
    title: "WOCOM Internal Poll",
    date: "2025-08-05",
    candidates: 2,
    voters: 820,
    status: false,
    permission: "Level 300 Only",
  },
  {
    id: 3,
    title: "Faculty Rep Elections",
    date: "2025-09-15",
    candidates: 6,
    voters: 920,
    status: true,
    permission: "Level 200 Only",
  },
  {
    id: 4,
    title: "Course Reps Selection",
    date: "2025-10-01",
    candidates: 3,
    voters: 360,
    status: false,
    permission: "Level 100 Only",
  },
];

export default function ElectionsTable() {
  const [elections, setElections] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 3;

  useEffect(() => {
    AOS.init({ duration: 700 });
    setTimeout(() => {
      setElections(initialElections);
      setLoading(false);
    }, 200); // Simulate fetch delay
  }, []);

  const handleSave = (newElection) => {
    setElections((prev) => [
      ...prev,
      { ...newElection, id: Date.now(), voters: 0, status: true },
    ]);
    toast.success("Election created successfully");
    setModalOpen(false);
  };

  const handleToggle = (id) => {
    setElections((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: !e.status } : e))
    );
  };

  const handleDelete = (id) => {
    setElections((prev) => prev.filter((e) => e.id !== id));
    toast.success("Election deleted");
  };

  const filtered = elections.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow overflow-auto">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-b flex-wrap gap-3">
        <button
          onClick={() => setModalOpen(true)}
          className="bg-gradient-to-tr from-gray-900 to-indigo-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700 transition"
          data-tooltip-id="new-election"
          data-tooltip-content="Create New Election"
        >
          <BsPlus /> Add Election
        </button>
        <Tooltip id="new-election" />
        <div className="relative w-full max-w-xs ml-auto">
          <input
            type="text"
            placeholder="Search elections..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border rounded focus:outline-none focus:ring"
          />
          <BsSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-16">
          <ClipLoader size={40} color="#3b82f6" />
        </div>
      ) : (
        <>
          {/* Table */}
          <table className="w-full text-sm text-gray-800 min-w-[1000px]">
            <thead className="bg-gradient-to-tr from-gray-900 to-indigo-500 text-left text-white">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Date</th>
                <th className="p-4">Candidates</th>
                <th className="p-4">Voters</th>
                <th className="p-4">Status</th>
                <th className="p-4">Permission</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((election) => (
                <tr
                  key={election.id}
                  className="border hover:bg-blue-50 transition-all"
                  data-aos="fade-in"
                >
                  <td className="p-4">{election.title}</td>
                  <td className="p-4">{election.date}</td>
                  <td className="p-4">{election.candidates}</td>
                  <td className="p-4">{election.voters}</td>
                  <td className="p-4">
                    <button onClick={() => handleToggle(election.id)}>
                      {election.status ? (
                        <BsToggleOn className="text-green-600 text-2xl" />
                      ) : (
                        <BsToggleOff className="text-gray-400 text-2xl" />
                      )}
                    </button>
                  </td>
                  <td className="p-4">{election.permission}</td>
                  <td className="p-4 text-center space-x-3">
                    <button
                      className="text-blue-600 hover:bg-blue-100 border p-2 rounded-full"
                      data-tooltip-id={`edit-${election.id}`}
                      data-tooltip-content="Edit"
                    >
                      <BsPencil />
                      <Tooltip id={`edit-${election.id}`} />
                    </button>
                    <button
                      onClick={() => handleDelete(election.id)}
                      className="text-red-600 hover:bg-red-100 border p-2 rounded-full"
                      data-tooltip-id={`delete-${election.id}`}
                      data-tooltip-content="Delete"
                    >
                      <BsTrash />
                      <Tooltip id={`delete-${election.id}`} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination (Non-functional) */}
          <div className="flex justify-center items-center px-4 py-3 bg-gray-50 border-t text-sm text-gray-600">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-3 py-1 mx-1 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-3 py-1 mx-1 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}

      <ElectionFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
