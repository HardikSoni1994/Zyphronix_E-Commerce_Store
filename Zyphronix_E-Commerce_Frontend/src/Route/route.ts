import { createBrowserRouter } from "react-router";
import Loginpage from "../Page/Auth/loginPage";
import App from "../App";
import Dashboard from "../Page/Dashboard/dashboard";
import ForgetPassword from "../Page/Auth/forgetPassword";
import VerifyOtp from "../Page/Auth/verifyOtp";
import ResetPassword from "../Page/Auth/resetPassword";

// Router configuration
export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/login",
        Component: Loginpage
      },
      {
        path: "/dashboard",
        Component: Dashboard
      },
      {
        path: "/forget-password",
        Component: ForgetPassword
      },
      {
        path: "/verify-otp",
        Component: VerifyOtp
      },
      {
        path: "/reset-password",
        Component: ResetPassword
      }
    ]
  },
]);
