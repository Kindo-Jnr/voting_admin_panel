import React, { useState } from "react";

const VoterModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    email: "",
    faculty: "",
    level: "",
    hasVoted: false,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md animate-fade-in-up">
        <h2 className="text-lg font-semibold mb-4">Add New Voter</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {["name", "studentId", "email", "faculty", "level"].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
          ))}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VoterModal;
