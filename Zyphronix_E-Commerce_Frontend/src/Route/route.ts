import { createBrowserRouter } from "react-router";
import Loginpage from "../Page/Auth/loginPage";

// Router configuration
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Loginpage
  },
]);