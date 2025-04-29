import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import Candidates from "./pages/Candidates";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/candidates" element={<Candidates />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

