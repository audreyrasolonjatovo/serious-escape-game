// ... importations inchangées
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

  const [personalityOptions, setPersonalityOptions] = useState([
    { label: "Créatif", checked: false },
    { label: "Analytique", checked: false },
    { label: "Empathique", checked: false },
    { label: "Leader", checked: false },
    { label: "Curieux", checked: false },
    { label: "Organisé", checked: false },
    { label: "Indépendant", checked: false },
    { label: "Sociable", checked: false },
    { label: "Sensible", checked: false },
    { label: "Ennuyeux", checked: false },
    { label: "Optimiste", checked: false },
    { label: "Pessimiste", checked: false },
    { label: "Aucun", checked: false },
    { label: "Pragmatique", checked: false },
    { label: "Rêveur", checked: false },
    { label: "Tout sélectionner", checked: false, isSelectAll: true },
    { label: "Introverti", checked: false },
    { label: "Extraverti", checked: false },
    { label: "Ambitieux", checked: false },
    { label: "Confiant", checked: false },
    { label: "Timide", checked: false },
    { label: "Aventurier", checked: false },
    { label: "Prudent", checked: false },
    { label: "Dynamique", checked: false },
    { label: "Calme", checked: false },
    { label: "Collaboratif", checked: false },
    { label: "Angoissé", checked: false },
    { label: "Perfectionniste", checked: false }
  ]);

  const [selectAll, setSelectAll] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 4);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Décochage automatique aléatoire
  useEffect(() => {
    const interval = setInterval(() => {
      setPersonalityOptions((prev) => {
        const checked = prev.filter((o) => o.checked && !o.isSelectAll);
        if (checked.length === 0) return prev;
        const random =
          checked[Math.floor(Math.random() * checked.length)].label;
        return prev.map((o) =>
          o.label === random ? { ...o, checked: false } : o
        );
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const all = personalityOptions
      .filter((o) => !o.isSelectAll)
      .every((o) => o.checked);
    setSelectAll(all);
  }, [personalityOptions]);

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
    e?.preventDefault?.();

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

    if (step === 3) {
      const checkedCount = personalityOptions.filter((o) => o.checked).length;
      if (checkedCount < 5) {
        alert("Veuillez cocher au moins 5 traits de personnalité.");
        return;
      }
    }

    setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleImageSelection = (image) => {
    setSelectedImages((prev) =>
      prev.includes(image)
        ? prev.filter((img) => img !== image)
        : [...prev, image]
    );
  };

  const toggleOption = (index) => {
    setPersonalityOptions((prev) =>
      prev.map((opt, i) =>
        i === index ? { ...opt, checked: !opt.checked } : opt
      )
    );
  };

  const toggleSelectAll = () => {
    const newChecked = !selectAll;
    setSelectAll(newChecked);
    setPersonalityOptions((prev) =>
      prev.map((opt) => ({ ...opt, checked: newChecked }))
    );
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 text-center overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600">
      <Background className="absolute inset-0 w-full h-full object-cover opacity-40" />

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

      <div className="relative z-10 bg-white rounded-3xl shadow-xl p-8 w-full max-w-3xl mx-auto space-y-6">
        {step === 1 && (
          <>
            <p className="text-2xl font-semibold text-gray-700">
              1/4 - Création de compte
            </p>
            <form onSubmit={handleNextStep} className="space-y-6">
              <div>
                <input
                  type="text"
                  className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-customOrange"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
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
                <select className="border p-3 rounded-lg">
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

              <div className="flex justify-between items-center">
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
          </>
        )}

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
            <Button variant="primary" onClick={handleNextStep}>
              Suivant
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <p className="text-2xl font-semibold text-gray-700">
              3/4 - Test de personnalité
            </p>
            <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
              {personalityOptions.map((o, i) => (
                <label key={i} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={o.checked}
                    onChange={() => toggleOption(i)}
                  />
                  <span>{o.label}</span>
                </label>
              ))}
            </div>
            <p className="text-gray-500 text-sm">
              Cochez au moins 5 traits pour continuer. Une case se décoche
              automatiquement.
            </p>
            <Button variant="primary" onClick={handleNextStep}>
              Suivant
            </Button>
          </div>
        )}
        {/* Next/Prev controls */}
        <div className="flex justify-between">
          {step > 1 && (
            <Button variant="secondary" onClick={handlePrevStep}>
              Précédent
            </Button>
          )}
        </div>

        {/* Étape 4 à définir ici */}
        {/* Boutons précédent / suivant pour étapes intermédiaires */}
        {step > 1 && step < 4 && (
          <div className="mt-4 flex justify-between">
            <Button variant="secondary" onClick={handlePrevStep}>
              Précédent
            </Button>
          </div>
        )}
      </div>

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
            Annuler
          </Button>
        </div>
      </Modal>
    </div>
  );
}
