import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/admin";
const LOGIN = "/login";
const FORGET_PASSWORD = "/forget-password";
const VERIFY_OTP = "/verify-otp";
const RESET_PASSWORD = "/reset-password";

export const authService = {
  loginAdmin: (loginData: any) => {
    return axios.post(`${API_URL}${LOGIN}`, loginData);
  },

  forgetPassword: (emailData: any) => {
    return axios.post(`${API_URL}${FORGET_PASSWORD}`, emailData);
  },

  verifyOtp: (otpData: any) => {
    return axios.post(`${API_URL}${VERIFY_OTP}`, otpData);
  },

  resetPassword: (resetData: any) => {
    return axios.post(`${API_URL}${RESET_PASSWORD}`, resetData);
  },

  getToken: () => {
    return localStorage.getItem("loginAdmin");
  },

  // 3. Logout ki service
  logoutAdmin: () => {
    localStorage.removeItem("loginAdmin");
  }
};