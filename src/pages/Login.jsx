import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../assets/Background";
import Button from "../components/Button/Button";
import Modal from "../components/Modal/Modal";

export default function Login() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 4);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const navigate = useNavigate();

  const validatePassword = () => {
    const newErrors = [];

    if (password.length < 10) {
      newErrors.push("Le mot de passe doit contenir au moins 10 caractères.");
    }

    if (!/[A-Z]/.test(password)) {
      newErrors.push("Le mot de passe doit contenir au moins une majuscule.");
    }

    if (!/\d/.test(password)) {
      newErrors.push("Le mot de passe doit contenir au moins un chiffre.");
    }

    if (email) {
      const emailLetters = email.replace(/[^a-zA-Z]/g, "").split("");
      const containsEmailLetter = emailLetters.some((letter) =>
        password.includes(letter)
      );
      if (!containsEmailLetter) {
        newErrors.push("Le mot de passe doit contenir une lettre de l'e-mail.");
      }
    }

    return newErrors;
  };

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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const validationErrors = validatePassword();
            if (validationErrors.length > 0) {
              setErrors(validationErrors);
              return;
            }
            setErrors([]);
            console.log("Formulaire valide !");
          }}
        >
          <div className="mb-4">
            <input
              type="text"
              placeholder="Choisissez un mot de passe"
              className="w-full border p-2 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center rounded-md w-full gap-2 mb-8">
            <input
              type="text"
              className="border p-2 rounded-md flex-1"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          {errors.length > 0 && (
            <div className="text-red-700 font-semibold text-sm mb-2">
              Le mot de passe ne respecte pas les conditions requises
            </div>
          )}
          <div className="mt-4 flex justify-between">
            <Button variant="tertiary" type="submit">
              Suivant
            </Button>
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

      <div className="relative z-10 mt-5 text-[11px]">
        <p>Votre mot de passe doit contenir au moins 10 caractères.</p>
        <p>Votre mot de passe doit comporter au moins 1 lettre majuscule.</p>
        <p>Votre mot de passe doit comporter au moins 1 chiffre.</p>
        <p>
          Votre mot de passe doit contenir au moins 1 lettre de votre adresse
          e-mail.
        </p>
        <p>Votre mot de passe peut contenir un caractère cyrillique.</p>
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
