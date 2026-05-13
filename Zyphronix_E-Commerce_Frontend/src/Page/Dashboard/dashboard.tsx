import { useNavigate } from "react-router";
import { Loader2, LogOut } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);

    setTimeout(() => {
      // Batue se token nikala
      localStorage.removeItem("loginAdmin");

      setIsLoggingOut(false);

      // Login page par bhej diya
      navigate("/login");
    }, 1000);
  };

  return <>
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Welcome to the Dashboard!
            </h1>
        </div>
      <div className="p-8 text-center border border-gray-200 rounded-lg shadow-lg w-96 bg-gray-50">
        <h1 className="text-2xl font-bold text-green-600 mb-2">
          🎉 Dashboard Access!
        </h1>
        <p className="text-sm text-gray-600 mb-6">
            You have successfully logged in and accessed the dashboard.
        </p>

        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={`w-full mt-6 flex items-center justify-center px-4 py-2 font-bold text-white rounded-md transition duration-200 ${
          isLoggingOut ? "bg-red-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
        }`}
        >
          {isLoggingOut ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Logging out...
          </>
        ) : (
          <>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </>
        )}
        </button>
      </div>
    </div>
    </>
}