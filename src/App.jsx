import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Calendar from "./components/Calendar/Calendar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Calendar />} />
      </Routes>
    </Router>
  );
}

export default App;
