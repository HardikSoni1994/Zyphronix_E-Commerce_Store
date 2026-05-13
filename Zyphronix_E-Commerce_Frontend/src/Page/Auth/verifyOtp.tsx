import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { authService } from "../../services/authService"; // 👈 Real API service import ki

export default function VerifyOtp() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // Storage se piche pass kiya hua email nikal rahe hain
    const savedEmail = localStorage.getItem("resetEmail");

    if (!savedEmail) {
      setErrorMessage("Session expired. Please go back and request OTP again.");
      return;
    }

    if (!otp.trim() || otp.length !== 6) {
      setErrorMessage("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      setErrorMessage("");
      setSuccessMessage("");
      setIsLoading(true);

      console.log("Verifying real OTP for:", savedEmail, "Code:", otp);
      
      // 👇 Real Backend API Call hit kar rahe hain
      const response = await authService.verifyOtp({ email: savedEmail, otp });
      console.log("Verify Response:", response);

      // Backend se jo success message aaya wo set kiya
      setSuccessMessage(response.data?.message || "OTP Verified successfully!");
      
      // 1 second ka smooth transition dekar reset-password page par bhej diya
      setTimeout(() => {
        navigate("/reset-password");
      }, 1000);

    } catch (error: any) {
      console.error("OTP Verification Error:", error);
      // Backend ka real error catch karke UI par dikhaya
      setErrorMessage(error.response?.data?.message || "Invalid OTP or expired. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Enter Security Code
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent a 6-digit code to your registered email.
          </p>
        </div>

        {/* Error Banner */}
        {errorMessage && (
          <div className="p-3 text-sm text-red-700 bg-red-100 rounded-md">
            {errorMessage}
          </div>
        )}

        {/* Success Banner */}
        {successMessage && (
          <div className="p-3 text-sm text-green-700 bg-green-100 rounded-md">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-center">
              6-Digit OTP
            </label>
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => {
                const onlyNums = e.target.value.replace(/[^0-9]/g, "");
                setOtp(onlyNums);
                if (errorMessage) setErrorMessage("");
              }}
              placeholder="••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-center font-bold text-lg tracking-[1em] focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white transition duration-200 ${
              isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Verifying..." : "Verify Code"}
          </button>
        </form>

        <div className="text-sm text-center">
          <Link to="/forget-password" className="font-medium text-blue-600 hover:text-blue-500">
            Resend OTP
          </Link>
        </div>
      </div>
    </div>
  );
}