import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/ui/NavBar";
import Calendar from "./components/calendar/Calendar";
import Home from "./pages/Home";
import ListDetail from "./components/lists/ListDetail";

function App() {
  return (
    <>
      <Navbar />
      {/* Ocultar SideBar si no se ha iniciado sesión */}
      <main>
        <Routes>
          {/* Una vista vacía de cómo se la app con botones register/login */}
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/lists/${list.id}" element={<ListDetail />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
