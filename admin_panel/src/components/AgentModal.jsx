import { useState } from "react";
import { toast } from "react-hot-toast";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export default function AgentModal({ isOpen, onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    agentId: "",
    password: "",
    assignedPoll: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Agent added successfully!");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add New Agent</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            name="agentId"
            placeholder="Agent ID"
            value={form.agentId}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <BsEyeSlash /> : <BsEye />}
            </button>
          </div>
          <input
            name="assignedPoll"
            placeholder="Assigned Poll Station"
            value={form.assignedPoll}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Agent
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
