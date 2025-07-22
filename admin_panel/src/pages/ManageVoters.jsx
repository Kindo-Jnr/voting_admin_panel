// === Full Updated Code ===
import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaFileImport,
  FaFileExport,
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import toast from "react-hot-toast";
import Papa from "papaparse";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import AOS from "aos";
import "aos/dist/aos.css";


const ManageVoters = () => {
  const [voters, setVoters] = useState([]);
  const [filteredVoters, setFilteredVoters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ status: "", course: "", year: "" });
  const [showModal, setShowModal] = useState(false);
  const [newVoter, setNewVoter] = useState({
    name: "",
    studentId: "",
    email: "",
    faculty: "",
    level: "",
  });
 useEffect(() => {
        AOS.init({ duration: 700 });
      }, []);
    
  useEffect(() => {
    const syncVerified = () => {
      const agentVerified = JSON.parse(
        localStorage.getItem("agentPortal_verified")
      ) || [];
      setVoters((prev) =>
        prev.map((v) =>
          agentVerified.find((av) => av.studentId === v.studentId)
            ? { ...v, verified: true, status: "Verified" }
            : v
        )
      );
    };

    
    syncVerified();
    const interval = setInterval(syncVerified, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const sampleVoters = [
      {
        id: 1,
        name: "Ama Serwaa",
        studentId: "SDD123456",
        email: "ama@example.com",
        faculty: "Business",
        level: "200",
        status: "Not Verified",
        verified: false,
      },
      {
        id: 2,
        name: "Kwame Mensah",
        studentId: "SDD789123",
        email: "kwame@example.com",
        faculty: "Engineering",
        level: "300",
        status: "Verified",
        verified: true,
      },
      {
        id: 3,
        name: "Dev Anthony",
        studentId: "SDD65744",
        email: "anthony@example.com",
        faculty: "Computer Science",
        level: "300",
        status: "Verified",
        verified: true,
      },
      {
        id: 4,
        name: "Dev Kindo",
        studentId: "SDD9346674",
        email: "kindo@example.com",
        faculty: "Education",
        level: "100",
        status: "Not Verified",
        verified: false,
      },
    ];
    setVoters(sampleVoters);
    setFilteredVoters(sampleVoters);
  }, []);

  useEffect(() => {
    let filtered = [...voters];
    if (filters.status)
      filtered = filtered.filter((v) => v.status === filters.status);
    if (filters.course)
      filtered = filtered.filter((v) => v.faculty === filters.course);
    if (filters.year)
      filtered = filtered.filter((v) => v.level === filters.year);
    if (searchQuery)
      filtered = filtered.filter(
        (v) =>
          v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.studentId.toLowerCase().includes(searchQuery.toLowerCase())
      );
    setFilteredVoters(filtered);
  }, [searchQuery, filters, voters]);

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const newVoters = results.data.map((v, index) => ({
          id: voters.length + index + 1,
          name: v.name,
          studentId: v.studentId,
          email: v.email,
          faculty: v.faculty,
          level: v.level,
          status: "Not Verified",
          verified: false,
        }));
        setVoters([...voters, ...newVoters]);
        toast.success("Voters imported successfully");
      },
    });
  };

  const handleExport = () => {
    const csv = Papa.unparse(voters);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "voters_list.csv");
    link.click();
    toast.success("Voter list exported");
  };

  const handleDelete = (id) => {
    setVoters(voters.filter((v) => v.id !== id));
    toast.success("Voter removed");
  };

  const handleAddModalSubmit = () => {
    const fields = Object.values(newVoter);
    if (fields.some((val) => val.trim() === "")) {
      toast.error("Please fill in all fields.");
      return;
    }
    const newEntry = {
      id: voters.length + 1,
      ...newVoter,
      status: "Not Verified",
      verified: false,
    };
    setVoters([newEntry, ...voters]);
    setNewVoter({
      name: "",
      studentId: "",
      email: "",
      faculty: "",
      level: "",
    });
    setShowModal(false);
    toast.success("Voter added");
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <TopBar title="Manage Voters" />
        <div className="p-4">
          {/* Tools */}
          <div className="flex gap-4 items-center mb-6">
            <button
              onClick={() => setShowModal(true)}
              className="p-2 bg-green-500 text-white rounded-full cursor-pointer"
              data-tooltip-id="addTip"
              data-tooltip-place="right"
            >
              <FaPlus />
            </button>
            <label
              className="p-3 bg-gray-700 text-white rounded-full cursor-pointer"
              data-tooltip-id="importTip"
              data-tooltip-place="right"
            >
              <FaFileImport />
              <input type="file" accept=".csv" onChange={handleImport} hidden />
            </label>
            <button
              onClick={handleExport}
              className="p-3 bg-purple-500 text-white rounded-full cursor-pointer"
              data-tooltip-id="exportTip"
              data-tooltip-place="right" 
            >
              <FaFileExport />
            </button>
            <Tooltip id="addTip" content="Add Voter" />
            <Tooltip id="importTip" content="Import Voters" />
            <Tooltip id="exportTip" content="Export Voters" />
          </div>

          {/* Filters + Search */}
          <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
            <div className="flex flex-wrap gap-2 items-center">
              <select
                onChange={(e) =>
                  setFilters((f) => ({ ...f, status: e.target.value }))
                }
                className="border p-2 rounded cursor-pointer"
              >
                <option value="">All Status</option>
                <option value="Verified">Verified</option>
                <option value="Not Verified">Not Verified</option>
              </select>
              <select
                onChange={(e) =>
                  setFilters((f) => ({ ...f, course: e.target.value }))
                }
                className="border p-2 rounded cursor-pointer"
              >
                <option value="">All Courses</option>
                <option value="Business">Business</option>
                <option value="Engineering">Engineering</option>
                <option value="Science">Science</option>
              </select>
              <select
                onChange={(e) =>
                  setFilters((f) => ({ ...f, year: e.target.value }))
                }
                className="border p-2 rounded cursor-pointer"
              >
                <option value="">All Years</option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="300">300</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Search by name or ID"
              className="border p-2 rounded w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto max-h-[60vh] overflow-y-auto border rounded">
            <table className="min-w-full">
              <thead className="sticky top-0 bg-gradient-to-tr from-gray-900 to-indigo-500 text-white">
                <tr>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Student ID</th>
                  <th className="p-2 text-left">Email</th>
                  <th className="p-2 text-left">Faculty/Dept</th>
                  <th className="p-2 text-left">Level</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVoters.map((voter) => (
                  <tr key={voter.id} className="border-b hover:bg-gray-50" data-aos="fade-in">
                    <td className="p-2">{voter.name}</td>
                    <td className="p-2">{voter.studentId}</td>
                    <td className="p-2">{voter.email}</td>
                    <td className="p-2">{voter.faculty}</td>
                    <td className="p-2">{voter.level}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          voter.verified
                            ? "bg-green-200 text-green-800"
                            : "bg-yellow-200 text-yellow-800"
                        }`}
                      >
                        {voter.status}
                      </span>
                    </td>
                    <td className="p-2 flex gap-2">
                      <button
                        className="p-2 bg-yellow-400 rounded-full"
                        data-tooltip-id="editTip"
                        data-tooltip-place="left"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(voter.id)}
                        className="p-2 bg-red-500 text-white rounded-full"
                        data-tooltip-id="deleteTip"
                        data-tooltip-place="left"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Tooltip id="editTip" content="Edit Voter" />
            <Tooltip id="deleteTip" content="Delete Voter" />
          </div>
        </div>
      </div>

      {/* Add Voter Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow">
            <h3 className="text-lg font-bold mb-4">Add New Voter</h3>
            {["name", "studentId", "email", "faculty", "level"].map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field[0].toUpperCase() + field.slice(1)}
                value={newVoter[field]}
                onChange={(e) =>
                  setNewVoter({ ...newVoter, [field]: e.target.value })
                }
                className="w-full border p-2 rounded mb-2"
              />
            ))}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddModalSubmit}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageVoters;
