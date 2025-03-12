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
      <div className="relative z-10 bg-white rounded-2xl shadow-lg w-full max-w-md p-6 flex flex-col justify-between">
        <h1 className="text-7xl font-bold pt-5 text-customOrange">OOPS</h1>
        <img src={errorGif} alt="test" />
        <p className="text-lg mt-[-40px] text-center font-medium mb-4">
          Cette page est un peu trop moderne pour notre ami l’homme des
          cavernes.
        </p>
        <p>Essayez encore plus tard...</p>
        <div className="flex flex-col gap-2 mt-5">
          <Button onClick={() => navigate("/notallowed")}>RESTER</Button>
          <Link to="/" className="text-customBlue text-base">
            Page d'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
