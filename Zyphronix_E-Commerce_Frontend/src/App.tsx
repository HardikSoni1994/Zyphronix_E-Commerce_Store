import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("loginAdmin");
    if (token) {
      navigate("/dashboard");
    }else {
      navigate("/login")
    }
  }, [navigate]);

  return (
    <>
      <div>
        <Outlet />
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}
