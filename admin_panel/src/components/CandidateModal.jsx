import React, { useState } from "react";

export default function CandidateModal({ isOpen, onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    position: "",
    election: "",
    manifesto: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    const candidateData = {
      ...form,
      id: Date.now(),
      image: imagePreview || "https://via.placeholder.com/40", // fallback image
      status: true,
    };
    onSave(candidateData);

    // Reset form
    setForm({
      name: "",
      position: "",
      election: "",
      manifesto: "",
    });
    setImagePreview(null);
    setImageFile(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg space-y-4">
        <h2 className="text-xl font-bold">Add New Candidate</h2>

        <input
          name="name"
          placeholder="Candidate Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="position"
          placeholder="Position"
          value={form.position}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="election"
          placeholder="Election"
          value={form.election}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="manifesto"
          placeholder="Manifesto"
          value={form.manifesto}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Image Upload */}
        <div>
          <label className="block font-semibold mb-1">Candidate Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border p-2 rounded"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-3 w-20 h-20 rounded-full object-cover border"
            />
          )}
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
