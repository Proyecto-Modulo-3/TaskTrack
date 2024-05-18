import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/ui/NavBar";
import Calendar from "./components/calendar/Calendar";
import Home from "./pages/Home";
import ListDetail from "./components/lists/ListDetail";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/lists/:id" element={<ListDetail />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
