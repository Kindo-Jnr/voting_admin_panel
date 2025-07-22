import { useState } from "react";

export default function ElectionFormModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    candidates: 0,
    permission: "All Voters",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ title: "", date: "", candidates: 0, permission: "All Voters" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg animate-fade-in">
        <h3 className="text-xl font-bold mb-4">Create New Election</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Election Title"
            className="w-full border px-4 py-2 rounded"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <input
            type="date"
            className="w-full border px-4 py-2 rounded"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Number of Candidates"
            className="w-full border px-4 py-2 rounded"
            value={formData.candidates}
            onChange={(e) => setFormData({ ...formData, candidates: e.target.value })}
            required
          />
          <select
            className="w-full border px-4 py-2 rounded"
            value={formData.permission}
            onChange={(e) => setFormData({ ...formData, permission: e.target.value })}
          >
            <option value="All Voters">All Voters</option>
            <option value="Level 300 Only">Level 300 Only</option>
            <option value="Level 100 & 200">Level 100 & 200</option>
          </select>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
