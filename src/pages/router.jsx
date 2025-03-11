import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import Login from "./Login";

const RouterComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />‡
      </Routes>
    </Router>
  );
};

export default RouterComponent;
