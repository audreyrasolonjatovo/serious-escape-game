import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../assets/Background";
import Button from "../components/Button/Button";
import Modal from "../components/Modal/Modal";

export default function Login() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 4);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 text-center overflow-hidden">
      <Background className="absolute inset-0 w-full h-full object-cover" />
      <div className="relative z-10 flex gap-7 mb-5">
        {[0, 1, 2, 3].map((num, index) => (
          <div
            key={index}
            className={`h-13 w-13 rounded-full flex items-center justify-center font-bold ${
              index === activeIndex
                ? "bg-white text-customOrange"
                : "bg-customOrange  text-white"
            }`}
          >
            {num + 1}
          </div>
        ))}
      </div>
      <div className="relative z-10 bg-white rounded-2xl shadow-lg w-auto p-6">
        <p className="mb-10">1/4</p>
        <form action="">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Choisissez un mot de passe"
              className="w-full border p-2 rounded-md"
              required
            />
          </div>

          <div className="flex items-center rounded-md w-full gap-2 mb-8">
            <input
              type="text"
              className="border p-2 rounded-md flex-1"
              placeholder="Votre email"
            />
            <p>@</p>
            <input
              type="text"
              placeholder="servier"
              className="placeholder:text-black border p-2 rounded-md flex-1"
              required
            />
            <select
              name="org"
              className="border p-2.5 rounded-md"
              placeholder="org"
            >
              <option value="">autre</option>
              <option value="png">.png</option>
              <option value="jpg">.jpg</option>
              <option value="co.uk">.co.uk</option>
              <option value="jsp">.jsp</option>
              <option value="fr">.fr</option>
              <option value="com">.com</option>
              <option value="de">.de</option>
            </select>
          </div>
          <div className="mt-4 flex justify-between">
            <Button variant="tertiary">Suivant</Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                openModal();
              }}
            >
              Annuler
            </Button>
            <Button variant="tertiary" type="reset">
              Effacer
            </Button>
          </div>
        </form>
      </div>

      <div className="relative z-10 border mt-5">
        <p>coucou</p>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Êtes-vous sûr de vouloir annuler ?"
        showIcon={true}
      >
        <div className="flex justify-between items-center gap-2 mt-4">
          <Button
            onClick={() => navigate("/")}
            variant="danger"
            addStyle="w-full"
          >
            Oui
          </Button>
          <Button variant="success" onClick={closeModal} addStyle="w-full">
            Annuler
          </Button>
        </div>
      </Modal>
    </div>
  );
}
