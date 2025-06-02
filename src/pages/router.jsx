import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import Login from "./Login";
import Error from "./Error";

const RouterComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/utilisabilite/" element={<App />} />
        <Route path="/utilisabilite/login" element={<Login />} />
        <Route path="/utilisabilite/notallowed" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default RouterComponent;
