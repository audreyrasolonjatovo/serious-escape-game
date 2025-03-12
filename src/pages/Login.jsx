import React from "react";
import Background from "../assets/Background";

export default function Login() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 text-center overflow-hidden">
      <Background className="absolute inset-0 w-full h-full object-cover" />
      <div className="relative z-10 bg-white rounded-2xl shadow-lg w-full max-w-md p-6"></div>
    </div>
  );
}
