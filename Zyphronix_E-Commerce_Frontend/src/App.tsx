import { Outlet } from "react-router";

export default function App() {
  return (
    <>
      <div className="mt-3 text-center">
        <h1 className="text-4xl ">Zyphronix E-Commerce Store</h1>

        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
