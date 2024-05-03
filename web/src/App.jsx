import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NavBar from "./components/ui/NavBar";
// import SideBar from "./components/ui/SideBar";

function App() {
  return (
    <>
    <NavBar />
    {/* Ocultar SideBar si no se ha iniciado sesión */}
    {/* <SideBar /> */}
      <main>
        <Routes>
        {/* Una vista vacía de cómo se la app con botones register/login */}
          <Route path="/" element={<Home />} /> 
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
