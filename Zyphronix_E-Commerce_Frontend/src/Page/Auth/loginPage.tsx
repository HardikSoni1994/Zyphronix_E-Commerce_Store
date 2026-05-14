import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { authService } from "../../services/authService";

export default function Loginpage() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (field: string, value: string) => {
    setLoginData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // Validation
    if (!loginData.email.trim() || !loginData.password.trim()) {
      setErrorMessage("Please fill in all the details.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      setErrorMessage("");
      setIsLoading(true);
      console.log("Admin Login Data :", loginData);

      const response = await authService.loginAdmin(loginData);

      toast.success(response.data?.message || "Login Successful! Welcome back.");

      const { token } = response.data.token;
      localStorage.setItem("loginAdmin", token);

     setTimeout(() => {
       navigate("/dashboard");
     }, 1000);
     
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Invalid credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Zyphronix Admin Login
          </h2>
          {errorMessage && (
            <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 border border-red-300 rounded-md">
              ⚠️ {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                value={loginData.email}
                onChange={(event) =>
                  handleInputChange("email", event.target.value)
                }
                placeholder="admin@zyphronix.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                disabled={isLoading}
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={loginData.password}
                onChange={(event) =>
                  handleInputChange("password", event.target.value)
                }
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
            </div>

            <div className="text-sm text-center text-gray-600">
              <Link to="/forget-password" className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forget your password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center py-2 font-bold text-white rounded-md transition duration-200 ${
                isLoading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isLoading ? (
                <>
                  {/* animate-spin class icon ko gol-gol ghumati hai */}
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
