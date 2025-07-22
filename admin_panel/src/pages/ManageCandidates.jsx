import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import CandidateModal from "../components/CandidateModal";
import toast from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
import {
    BsTrash,
    BsPencil,
    BsToggleOn,
    BsToggleOff,
    BsPlus,
    BsSearch,
} from "react-icons/bs";
import { Tooltip } from "react-tooltip";
import student1 from "../assets/images/student1.jpg";
import student2 from "../assets/images/student2.jpg";
import student3 from "../assets/images/student3.jpg";

const initialCandidates = [
    {
        id: 1,
        name: "Abu Waris",
        position: "President",
        election: "SRC Elections",
        image: student1,
        manifesto: "Transparency and progress",
        status: true,
    },
    {
        id: 2,
        name: "Ama Serwaa",
        position: "WOCOM",
        election: "Women's Commissioner",
        image: student2,
        manifesto: "Empower and advocate",
        status: false,
    },
    {
        id: 3,
        name: "Dev. Anthony",
        position: "Organizer",
        election: "Faculty elections",
        image: student3,
        manifesto: "Empower and advocate",
        status: false,
    },
    {
        id: 4,
        name: "Kindo",
        position: "Intercom",
        election: "SRC Elections",
        image: student1,
        manifesto: "Transparency and progress",
        status: true,
    },
];

export default function ManageCandidates() {
    const [candidates, setCandidates] = useState(initialCandidates);
    const [search, setSearch] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        AOS.init({ duration: 800 });
    }, []);

    const toggleStatus = (id) => {
        setCandidates((prev) =>
            prev.map((c) => (c.id === id ? { ...c, status: !c.status } : c))
        );
    };

    const handleDelete = (id) => {
        setCandidates((prev) => prev.filter((c) => c.id !== id));
        toast.success("Candidate deleted");
    };

    const handleSave = (newCandidate) => {
        setCandidates((prev) => [...prev, newCandidate]);
        toast.success("Candidate added");
        setModalOpen(false);
    };

    const filtered = candidates.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const paginated = filtered.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col bg-gray-50 text-gray-800">
                <Topbar />

                <div className="p-6 flex-1 overflow-auto">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
                        <button
                            onClick={() => setModalOpen(true)}
                            className="bg-gradient-to-tr from-gray-900 to-indigo-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700"
                            data-tooltip-id="add-candidate"
                            data-tooltip-content="Add new candidate"
                        >
                            <BsPlus /> Add Candidate
                        </button>
                        <Tooltip id="add-candidate" />
                        <div className="relative w-full max-w-xs ml-auto">
                            <input
                                type="text"
                                placeholder="Search by name..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 text-sm border rounded focus:outline-none focus:ring"
                            />
                            <BsSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-auto rounded-xl border bg-white shadow min-w-[1000px]">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gradient-to-tr from-gray-900 to-indigo-500 text-white text-bold">
                                <tr>
                                    <th className="p-4">Image</th>
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Position</th>
                                    <th className="p-4">Election</th>
                                    <th className="p-4">Manifesto</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginated.map((c) => (
                                    <tr
                                        key={c.id}
                                        className="border-t hover:bg-blue-50 transition"
                                        data-aos="fade-in"
                                    >
                                        <td className="p-4">
                                            <img
                                                src={c.image}
                                                alt={c.name}
                                                className="w-13 h-13 rounded-full object-cover"
                                            />
                                        </td>
                                        <td className="p-4">{c.name}</td>
                                        <td className="p-4">{c.position}</td>
                                        <td className="p-4">{c.election}</td>
                                        <td className="p-4">{c.manifesto}</td>
                                        <td className="p-4">
                                            <button
                                                onClick={() =>
                                                    toggleStatus(c.id)
                                                }
                                            >
                                                {c.status ? (
                                                    <BsToggleOn className="text-green-500 text-2xl" />
                                                ) : (
                                                    <BsToggleOff className="text-gray-400 text-2xl" />
                                                )}
                                            </button>
                                        </td>
                                        <td className="p-4 text-center space-x-3">
                                            <button
                                                className="text-blue-600 hover:bg-blue-100 border p-2 rounded-full"
                                                data-tooltip-id={`edit-${c.id}`}
                                                data-tooltip-content="Edit"
                                            >
                                                <BsPencil />
                                                <Tooltip id={`edit-${c.id}`} />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(c.id)
                                                }
                                                className="text-red-600 hover:bg-red-100 border p-2 rounded-full"
                                                data-tooltip-id={`delete-${c.id}`}
                                                data-tooltip-content="Delete"
                                            >
                                                <BsTrash />
                                                <Tooltip
                                                    id={`delete-${c.id}`}
                                                />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        <div className="flex justify-center items-center px-4 py-3 bg-gray-50 border-t text-sm text-gray-600">
                            <button
                                disabled={currentPage === 1}
                                onClick={() =>
                                    setCurrentPage((prev) => prev - 1)
                                }
                                className="px-3 py-1 mx-1 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <span className="px-2">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() =>
                                    setCurrentPage((prev) => prev + 1)
                                }
                                className="px-3 py-1 mx-1 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>

                <CandidateModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onSave={handleSave}
                />
            </div>
        </div>
    );
}
