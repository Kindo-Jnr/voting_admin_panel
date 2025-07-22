// src/components/StatCard.jsx
import { motion } from "framer-motion";

export default function StatCard({ icon: Icon, label, value, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={`flex items-center gap-4 bg-white shadow-md p-4 rounded-xl border-t-4 ${color}`}
    >
      <div className="text-3xl text-gray-600">
        <Icon />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <h3 className="text-xl font-bold text-gray-700">{value}</h3>
      </div>
    </motion.div>
  );
}
