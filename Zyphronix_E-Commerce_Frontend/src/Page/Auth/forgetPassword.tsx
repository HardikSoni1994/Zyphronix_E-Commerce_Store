import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { authService } from "../../services/authService";

export default function ForgetPassword() {

    const navigate = useNavigate();


  const [email, setEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // Field check
    if (!email.trim()) {
      setErrorMessage("Please enter your registered email address.");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      setErrorMessage("");
      setSuccessMessage("");
      setIsLoading(true);

      console.log("Forget Password Request for:", email);

      // Raw simple service call
      const response = await authService.forgetPassword({ email });
      console.log("Response:", response);

      // Success hone par message set karega
      setSuccessMessage(response.data?.message || "Password reset OTP/Link sent successfully to your email.");
      sessionStorage.setItem("resetEmail", email);
        
      setTimeout(() => {
        navigate("/verify-otp");
      }, 1500);
      
    } catch (error: any) {
      console.error("Forget Password Error:", error);
      setErrorMessage(error.response?.data?.message || "User not found or something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Forget Password
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email to receive password reset instructions.
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMessage) setErrorMessage("");
              }}
              placeholder="admin@zyphronix.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition duration-200 ${
              isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="text-sm text-center">
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}