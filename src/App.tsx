import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col md:flex-row">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <Routes>
            <Route path="/" element={<MainContent />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
