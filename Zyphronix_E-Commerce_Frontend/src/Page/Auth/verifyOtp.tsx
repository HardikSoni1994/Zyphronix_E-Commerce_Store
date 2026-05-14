import React from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { authService } from "../../services/authService";
import { toast } from "react-toastify";

export default function VerifyOtp() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Page load hote hi pehle box par cursor laao
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value.substring(element.value.length - 1);
    setOtp(newOtp);

    if (element.value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Sir ka Backspace shifting logic
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 1. Array ko combine karke single string banaya
    const finalOtp = otp.join("");

    // 2. Client-Side Validation -> Local banner me error dikhayenge
    if (finalOtp.length < 6) {
      setErrorMessage("Please enter the complete 6-digit OTP.");
      return;
    }

    // 3. Storage se secure email nikala
    const savedEmail = sessionStorage.getItem("resetEmail");
    if (!savedEmail) {
      setErrorMessage("Session expired. Please go back and request OTP again.");
      return;
    }

    // Validation pass hone par purani error saaf kar do aur loading shuru karo
    setErrorMessage("");
    setIsLoading(true);

    try {
      console.log("Verifying real OTP for:", savedEmail, "Code:", finalOtp);

      // 4. Server API Call
      const response = await authService.verifyOtp({ email: savedEmail, otp: finalOtp });

      // 5. Server Success -> Global Toast aur smooth redirect
      toast.success(response.data?.message || "OTP Verified successfully!");
      
      setTimeout(() => {
        navigate("/reset-password");
      }, 1000);

    } catch (error: any) {
      console.error("OTP Verification Error:", error);
      // 6. Server Error -> Backend ka exact message Global Toast me dikhayenge
      toast.error(error.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    const savedEmail = sessionStorage.getItem("resetEmail");
    
    if (!savedEmail) {
      toast.error("Session expired. Please start over from Forget Password.");
      return void 0;
    }

    try {
      setErrorMessage("");
      // 🚀 API hit hote hi success toast fek do
      const response = await authService.forgetPassword({ email: savedEmail });
      toast.success(response.data?.message || "New OTP has been sent to your email!");
    } catch (error: any) {
      console.error("Resend OTP Error:", error);
      toast.error(error.response?.data?.message || "Failed to resend OTP. Please try again later.");
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
          <div className="p-3 text-sm text-red-700 bg-red-100 rounded-md text-center font-medium">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
              6-Digit Security Code
            </label>
            <div className="flex justify-center gap-3">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  ref={(el) => { inputRefs.current[index] = el }}
                  value={data}
                  onChange={(event) => handleChange(event.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onFocus={(event) => event.target.select()} // Box par click karte hi text select ho jaye
                  disabled={isLoading}
                  className="w-12 h-12 text-center font-bold text-xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all"
                />
              ))}
            </div>
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

        <div className="text-sm text-center mt-4">
        <span className="text-gray-600">Didn't receive the code? </span>
        <button
          type="button"
          onClick={handleResendOtp}
          className="font-medium text-blue-600 hover:text-blue-500 bg-transparent border-none cursor-pointer underline ml-1"
        >
          Resend OTP
        </button>
      </div>
      </div>
    </div>
  );
}