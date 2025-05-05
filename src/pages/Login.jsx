import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../assets/Background";
import Button from "../components/Button/Button";
import Modal from "../components/Modal/Modal";

export default function Login() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [password, setPassword] = useState("Choisissez un mot de passe");
  const [email, setEmail] = useState("Votre adresse-mail");
  const [errors, setErrors] = useState([]);
  const [domain, setDomain] = useState("");
  const [step, setStep] = useState(1);
  const [selectedImages, setSelectedImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 4);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const validatePassword = () => {
    const newErrors = [];
    if (password.length < 10)
      newErrors.push("Le mot de passe doit contenir au moins 10 caractères.");
    if (!/[A-Z]/.test(password))
      newErrors.push("Le mot de passe doit contenir au moins une majuscule.");
    if (!/\d/.test(password))
      newErrors.push("Le mot de passe doit contenir au moins un chiffre.");
    if (email) {
      const emailLetters = email.replace(/[^a-zA-Z]/g, "").split("");
      const containsEmailLetter = emailLetters.some((letter) =>
        password.includes(letter)
      );
      if (!containsEmailLetter)
        newErrors.push("Le mot de passe doit contenir une lettre de l'e-mail.");
    }
    return newErrors;
  };

  const validateImagesSelection = () => {
    if (selectedImages.length < 3)
      return "Veuillez sélectionner au moins 3 images de bonne ambiance de travail.";
    return null;
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      const validationErrors = validatePassword();
      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        return;
      }
      setErrors([]);
    }

    if (step === 2) {
      const imageError = validateImagesSelection();
      if (imageError) {
        alert(imageError);
        return;
      }
    }

    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleImageSelection = (image) => {
    setSelectedImages((prev) =>
      prev.includes(image)
        ? prev.filter((img) => img !== image)
        : [...prev, image]
    );
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 text-center overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600">
      <Background className="absolute inset-0 w-full h-full object-cover opacity-40" />

      {/* Bouton d’annulation global */}
      <button
        onClick={openModal}
        className="absolute top-6 right-6 text-sm text-white hover:underline"
      >
        Annuler l’inscription
      </button>

      {/* Indicateur d'étapes */}
      <div className="relative z-10 flex gap-4 mb-6">
        {[0, 1, 2, 3].map((num, index) => (
          <div
            key={index}
            className={`h-12 w-12 rounded-full flex items-center justify-center font-bold transition duration-300 ease-in-out ${
              index === activeIndex
                ? "bg-white text-customOrange transform scale-125"
                : "bg-customOrange text-white"
            }`}
          >
            {num + 1}
          </div>
        ))}
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 bg-white rounded-3xl shadow-xl p-8 w-full max-w-md mx-auto space-y-6">
        {/* Étape 1 */}
        {step === 1 && (
          <>
            <p className="text-2xl font-semibold text-gray-700">
              1/4 - Création de compte
            </p>
            <form onSubmit={handleNextStep} className="space-y-6">
              <input
                type="text"
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-customOrange"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="flex items-center gap-3 mb-4">
                <input
                  type="text"
                  className="border p-3 rounded-lg flex-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p>@</p>
                <input
                  type="text"
                  placeholder="servier"
                  className="border p-3 rounded-lg flex-1"
                  onChange={(e) => setDomain(e.target.value)}
                  required
                />
                <select
                  name="org"
                  className="border p-3 rounded-lg"
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
                <div className="text-red-700 font-semibold text-sm mb-4">
                  {errors.join(", ")}
                </div>
              )}
            </form>
          </>
        )}

        {/* Étape 2 */}
        {step === 2 && (
          <div className="space-y-6">
            <p className="text-2xl font-semibold text-gray-700">
              2/4 - Sélectionnez les images représentant une bonne ambiance de
              travail
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                "image1.jpg",
                "image2.jpg",
                "image3.jpg",
                "image4.jpg",
                "image5.jpg"
              ].map((image, index) => (
                <div
                  key={index}
                  onClick={() => handleImageSelection(image)}
                  className={`cursor-pointer p-4 border-2 rounded-lg transition-all ${
                    selectedImages.includes(image)
                      ? "bg-green-200 border-green-500"
                      : "bg-gray-100 border-gray-300"
                  }`}
                >
                  <img
                    src={`path_to_images/${image}`}
                    alt={`image ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <p className="text-center mt-2 text-sm">{`Image ${
                    index + 1
                  }`}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Étape 3 & 4 (ajoute-les ici selon ta logique) */}

        {/* Boutons navigation */}
        <div className="mt-6 flex justify-between items-center">
          {step > 1 ? (
            <Button variant="secondary" onClick={handlePrevStep}>
              Précédent
            </Button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <Button variant="primary" onClick={handleNextStep}>
              Suivant
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() => alert("Inscription terminée")}
            >
              Terminer
            </Button>
          )}
        </div>
      </div>

      {/* Modal confirmation */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Êtes-vous sûr de vouloir annuler ?"
        showIcon={true}
      >
        <div className="flex justify-between gap-4 mt-6">
          <Button
            onClick={() => navigate("/")}
            variant="danger"
            addStyle="w-full"
          >
            Oui
          </Button>
          <Button variant="success" onClick={closeModal} addStyle="w-full">
            Non
          </Button>
        </div>
      </Modal>
    </div>
  );
}
