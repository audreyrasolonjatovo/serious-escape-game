import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import Login from "./Login";
import Error from "./Error";

const RouterComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="notallowed" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default RouterComponent;
