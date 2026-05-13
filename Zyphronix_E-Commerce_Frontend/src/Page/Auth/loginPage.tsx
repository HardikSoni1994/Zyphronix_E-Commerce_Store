import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Loginpage() {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleInputChange = (field: string, value: string) => {
    setLoginData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log("Admin Login Data :", loginData);

    const response = await axios.post(
      "http://localhost:3000/api/auth/admin/login",
      loginData,
    );

    console.log("Response :", response);

    const { token } = response.data.token;
    localStorage.setItem("loginAdmin", token);

    navigate("/dashboard");
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Zyphronix Admin Login
          </h2>

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
                required
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
                required
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
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
