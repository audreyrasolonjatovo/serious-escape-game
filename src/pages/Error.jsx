import React from "react";

import { Link, useNavigate } from "react-router-dom";

import Background from "../assets/Background";
import Button from "../components/Button/Button";

import errorGif from "../assets/error.gif";

export default function Error() {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 text-center overflow-hidden">
      <Background className="absolute inset-0 w-full h-full object-cover" />
      <div className="relative z-10 bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
        <span className="text-2xl font-semibold text-gray-900 mb-6 flex items-center justify-center gap-1 flex-col">
          <h1>OOPS</h1>
          <img src={errorGif} alt="test" />
          <p>Cette option n'est pas disponible pour le moment.</p>
        </span>
        <div className="flex flex-col gap-2">
          <Button onClick={() => navigate("/notallowed")}>RESTER</Button>
          <Link to="/" className="text-customBlue text-sm">
            Page d'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
