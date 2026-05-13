import { useState } from "react";
import { useNavigate } from "react-router";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!newPassword || !confirmPassword) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const savedEmail = localStorage.getItem("resetEmail");

    try {
      setIsLoading(true);
      setErrorMessage("");
      
      console.log("Resetting password for:", savedEmail);

      // Backend call aayegi: authService.resetPassword({ email: savedEmail, newPassword })
      setTimeout(() => {
        setIsLoading(false);
        setSuccessMessage("Password reset successfully! Redirecting to login...");
        
        // Kaam hone ke baad email ko storage se saaf kar do
        localStorage.removeItem("resetEmail");

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }, 1000);

    } catch (error: any) {
      setErrorMessage("Failed to reset password. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Create New Password</h2>
          <p className="mt-2 text-sm text-gray-600">Enter your new strong password below.</p>
        </div>

        {errorMessage && <div className="p-3 text-sm text-red-700 bg-red-100 rounded-md">{errorMessage}</div>}
        {successMessage && <div className="p-3 text-sm text-green-700 bg-green-100 rounded-md">{successMessage}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 text-white font-medium rounded-md ${isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {isLoading ? "Saving..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}