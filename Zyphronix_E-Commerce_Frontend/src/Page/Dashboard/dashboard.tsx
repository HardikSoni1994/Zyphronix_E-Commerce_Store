import { useNavigate } from "react-router";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loginAdmin");
    navigate("/login");
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
          className="w-full py-2 font-bold text-white bg-red-600 rounded-md hover:bg-red-700 transition duration-200"
        >
          Sign Out
        </button>
      </div>
    </div>
    </>
}