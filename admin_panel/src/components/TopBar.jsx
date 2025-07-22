import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";
import toast from "react-hot-toast";

const routeTitles = {
  "/admin": "Dashboard",
  "/admin/agents": "Manage Agents",
  "/admin/elections": "Manage Elections",
  "/admin/candidates": "Manage Candidates",
  "/admin/voters": "Voter List",
  "/admin/results": "Results & Analysis",
  "/admin/settings": "Settings",
};

export default function Topbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const activeTitle = routeTitles[pathname] || "Admin Panel";

  // Typewriter effect
  const [displayedText, setDisplayedText] = useState("");
  const [typing, setTyping] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setDisplayedText("");
    setTyping(true);
    setIndex(0);
  }, [activeTitle]);

  useEffect(() => {
    let timeout;
    if (typing) {
      if (index < activeTitle.length) {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + activeTitle.charAt(index));
          setIndex((prev) => prev + 1);
        }, 100);
      } else {
        timeout = setTimeout(() => {
          setTyping(false);
        }, 1500);
      }
    } else {
      if (index > 0) {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => prev.slice(0, -1));
          setIndex((prev) => prev - 1);
        }, 50);
      } else {
        timeout = setTimeout(() => {
          setTyping(true);
        }, 500);
      }
    }

    return () => clearTimeout(timeout);
  }, [index, typing, activeTitle]);

  // Handle logout
  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="w-full bg-white px-6 py-4 shadow flex items-center justify-between relative z-10">
      {/* Left: Animated Page Title */}
      <div className="text-2xl font-semibold text-gray-700 font-mono min-h-[1.5rem]">
        {displayedText}
        <span className="animate-pulse">|</span>
      </div>

      {/* Right: Admin Profile */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 hover:bg-gray-300 px-3 py-1 rounded-full transition cursor-pointer"
        >
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="Admin"
            className="w-10 h-10 rounded-full object-cover border"
          />
          <BsChevronDown className="text-gray-600 text-sm" />
        </button>

        {/* Dropdown */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md overflow-hidden w-48 border text-sm">
            <button
              onClick={() => {
                navigate("/admin/settings");
                setDropdownOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-xl cursor-pointer"
            >
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-100 text-xl cursor-pointer"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
