import { Link, useNavigate } from "react-router-dom";

import Button from "./components/Button/Button";
import MicrosoftLogo from "./assets/Microsoft-Logo";
import Background from "./assets/Background";

const App = () => {
  const navigate = useNavigate();
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 text-center overflow-hidden bg-[#24226A]">
      <Background className="absolute inset-0 w-full h-full object-cover" />

      <div className="relative z-10 bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
        <span className="text-2xl font-semibold text-gray-900 mb-4 flex items-center justify-center gap-1">
          <h2 className="text-customBlue">RH</h2>
          <h2 className="text-customOrange">Compagnon</h2>
        </span>

        <p className="mb-3 text-gray-700">
          RH Compagnon simplifie la gestion des ressources humaines.
          Recrutement, suivi des employés et automatisation des tâches : tout
          est centralisé pour plus d’efficacité et de fluidité.
        </p>

        <Button variant="primary" onClick={() => navigate("/notallowed")}>
          <p className="flex items-center justify-center gap-2">
            <MicrosoftLogo width={24} height={24} />
            Connectez-vous avec Google
          </p>
        </Button>

        <div className="text-xs flex justify-center gap-1 mt-3 text-gray-300">
          <p>Si vous êtes un employé Servier</p>
          <p className="underline cursor-pointer">cliquez</p>
          <Link to="/login" className="cursor-default">
            ICI
          </Link>
        </div>
      </div>
    </div>
  );
};

export default App;
