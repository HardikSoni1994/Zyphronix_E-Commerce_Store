import { createBrowserRouter } from "react-router";
import Loginpage from "../Page/Auth/loginPage";
import App from "../App";
import Dashboard from "../Page/Dashboard/dashboard";

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
      }
    ]
  },
]);
