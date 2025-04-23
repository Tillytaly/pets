import "./App.css";
import "./styles/main.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pet from "./routes/Pet";
import Pets from "./routes/Pets";
import AnimalType from "./routes/AnimalType";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pets />} />
        <Route path="/pets/:animalType" element={<AnimalType />} />
        <Route path="/pet/:id" element={<Pet />} />
      </Routes>
    </Router>
  );
}

export default App;
