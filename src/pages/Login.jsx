import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import Background from "../assets/Background";
import Button from "../components/Button/Button";
import Modal from "../components/Modal/Modal";

export default function Login() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 text-center overflow-hidden">
      <Background className="absolute inset-0 w-full h-full object-cover" />
      <div className="relative z-10 flex gap-3 mb-5">
        <div className="h-13 w-13 rounded-full items-center justify-center flex bg-customOrange text-white font-bold">
          1
        </div>
        <div className="h-13 w-13 rounded-full items-center justify-center flex bg-customOrange text-white font-bold">
          2
        </div>
        <div className="h-13 w-13 rounded-full items-center justify-center flex bg-customOrange text-white font-bold">
          3
        </div>
        <div className="h-13 w-13 rounded-full items-center justify-center flex bg-customOrange text-white font-bold">
          4
        </div>
      </div>
      <div className="relative z-10 bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
        <p className="mb-10">1/4</p>
        <form action="">
          <input
            type="text"
            placeholder="Choisissez un mot de passe"
            tabIndex={-1}
            className="w-full border"
            required
          />
          <div className="flex items-center justify-center">
            <input type="text" required />
            <p>@</p>
            <input
              type="text"
              placeholder="servier"
              className="placeholder:text-black"
              required
            />
            <select name="org" id="">
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
          <div>
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
            className="w-full"
          >
            Oui
          </Button>
          <Button variant="success" onClick={closeModal} className="w-full">
            Annuler
          </Button>
        </div>
      </Modal>
    </div>
  );
}
