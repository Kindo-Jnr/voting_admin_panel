import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import toast from "react-hot-toast";
import Papa from "papaparse";
import { BsTrash, BsPencil, BsFileEarmarkArrowDown, BsFileEarmarkArrowUp, BsPersonPlus } from "react-icons/bs";
import { Tooltip } from "react-tooltip";

const initialVoters = [
  {
    id: 1,
    name: "Abu Waris",
    studentId: "ST12345",
    email: "abu@example.com",
    course: "Computer Science",
    level: "Level 300",
    voted: true,
  },
  {
    id: 2,
    name: "Ama Serwaa",
    studentId: "ST12346",
    email: "ama@example.com",
    course: "Economics",
    level: "Level 200",
    voted: false,
  },
];

const VoterList = () => {
  const [voters, setVoters] = useState(initialVoters);
  const [filters, setFilters] = useState({
    voted: "All",
    course: "All",
    level: "All",
  });

  const handleDelete = (id) => {
    setVoters((prev) => prev.filter((v) => v.id !== id));
    toast.success("Voter removed");
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const parsed = results.data.map((row, i) => ({
          id: voters.length + i + 1,
          name: row.Name,
          studentId: row.StudentID,
          email: row.Email,
          course: row.Course,
          level: row.Level,
          voted: row.Voted === "true",
        }));
        setVoters((prev) => [...prev, ...parsed]);
        toast.success("Voters imported");
      },
    });
  };

  const handleExport = () => {
    const csv = Papa.unparse(voters);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "voters.csv");
    document.body.appendChild(link);
    link.click();
    toast.success("Voters exported");
  };

  const filteredVoters = voters.filter((v) => {
    const voteMatch = filters.voted === "All" || (filters.voted === "Voted" ? v.voted : !v.voted);
    const courseMatch = filters.course === "All" || v.course === filters.course;
    const levelMatch = filters.level === "All" || v.level === filters.level;
    return voteMatch && courseMatch && levelMatch;
  });

  const uniqueCourses = [...new Set(voters.map((v) => v.course))];
  const uniqueLevels = [...new Set(voters.map((v) => v.level))];

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6 space-y-4">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <h1 className="text-xl font-bold">Voter List</h1>

            <div className="flex gap-2 items-center">
              <label data-tooltip-id="importTip">
                <input type="file" accept=".csv" onChange={handleImport} className="hidden" />
                <BsFileEarmarkArrowUp className="text-xl cursor-pointer rounded-full bg-blue-100 p-2 hover:bg-blue-200 transition" />
              </label>
              <Tooltip id="importTip" content="Import CSV" />

              <BsFileEarmarkArrowDown
                onClick={handleExport}
                className="text-xl cursor-pointer rounded-full bg-green-100 p-2 hover:bg-green-200 transition"
                data-tooltip-id="exportTip"
              />
              <Tooltip id="exportTip" content="Export CSV" />

              <BsPersonPlus
                className="text-xl cursor-pointer rounded-full bg-indigo-100 p-2 hover:bg-indigo-200 transition"
                data-tooltip-id="addTip"
              />
              <Tooltip id="addTip" content="Add Voter" />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <select onChange={(e) => setFilters({ ...filters, voted: e.target.value })} className="p-2 border rounded">
              <option>All</option>
              <option>Voted</option>
              <option>Not Voted</option>
            </select>
            <select onChange={(e) => setFilters({ ...filters, course: e.target.value })} className="p-2 border rounded">
              <option>All</option>
              {uniqueCourses.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <select onChange={(e) => setFilters({ ...filters, level: e.target.value })} className="p-2 border rounded">
              <option>All</option>
              {uniqueLevels.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border rounded bg-white shadow-sm">
              <thead className="bg-gray-200 text-left">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Student ID</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Faculty/Dept</th>
                  <th className="p-3">Level</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVoters.map((voter) => (
                  <tr key={voter.id} className="border-t hover:bg-gray-50 transition">
                    <td className="p-3">{voter.name}</td>
                    <td className="p-3">{voter.studentId}</td>
                    <td className="p-3">{voter.email}</td>
                    <td className="p-3">{voter.course}</td>
                    <td className="p-3">{voter.level}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          voter.voted ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}
                      >
                        {voter.voted ? "Voted" : "Not Voted"}
                      </span>
                    </td>
                    <td className="p-3 flex gap-2">
                      <BsPencil
                        className="text-blue-500 cursor-pointer rounded-full hover:bg-blue-100 p-1 transition"
                        size={20}
                        data-tooltip-id="editTip"
                      />
                      <BsTrash
                        onClick={() => handleDelete(voter.id)}
                        className="text-red-500 cursor-pointer rounded-full hover:bg-red-100 p-1 transition"
                        size={20}
                        data-tooltip-id="deleteTip"
                      />
                      <Tooltip id="editTip" content="Edit" />
                      <Tooltip id="deleteTip" content="Delete" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination (unfunctional for now) */}
          <div className="flex justify-end mt-4 space-x-2">
            <button className="px-3 py-1 border rounded">Previous</button>
            <button className="px-3 py-1 border rounded">1</button>
            <button className="px-3 py-1 border rounded">Next</button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default VoterList;
