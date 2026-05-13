import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

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
    </>
  );
}
