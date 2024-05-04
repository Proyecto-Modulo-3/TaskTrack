import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/ui/NavBar";
import Calendar from "./components/calendar/Calendar";
import Board from "./pages/Board";



function App() {
  return (
    <>
    <Navbar/>
    {/* Ocultar SideBar si no se ha iniciado sesión */}
      <main>
        <Routes>
        {/* Una vista vacía de cómo se la app con botones register/login */}
          <Route path="/board" element={<Board />} /> 
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
