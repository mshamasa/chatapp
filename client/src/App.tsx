import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import "./App.css";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/channels/1");
  }, []);

  return (
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
      <Outlet />
    </div>
  );
}

export default App;
