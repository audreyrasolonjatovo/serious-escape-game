import { useState, useEffect } from "react";

export default function Step2({ onNext, onBack }) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedQualities, setSelectedQualities] = useState([]);
  const [error, setError] = useState("");

  const DEFAULT_IMAGE = "/placeholder-avatar.png";

  const QUALITIES = [
    "Curieux",
    "Créatif",
    "Ponctuel",
    "Autonome",
    "Organisé",
    "Réactif",
    "Sociable",
    "Persévérant",
    "Optimiste",
    "Tout décocher", // faux item caché
    "Rigoureux",
    "Communicatif",
    "Empathique",
    "Observateur",
    "Logique",
    "Diplomate",
    "Ouvert",
    "Déterminé",
    "Flexible",
    "Exigeant",
    "Inventif",
    "Patient",
    "Souriant",
    "Beau"
  ];

  // On coche tout au départ
  useEffect(() => {
    setSelectedQualities(QUALITIES.filter((q) => q));
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setLoading(false);
    }
  };

  const toggleQuality = (q) => {
    if (q === "Tout décocher") {
      setSelectedQualities([]);
      return;
    }

    setSelectedQualities((prev) =>
      prev.includes(q)
        ? prev.filter((item) => item !== q)
        : [...prev, q].slice(0, 5)
    );
  };

  const handleNext = () => {
    setError("");
    if (!image) {
      setError("🖼️ Veuillez importer votre propre photo.");
      return;
    }
    if (selectedQualities.length !== 5) {
      setError("🎯 Vous devez conserver exactement 5 qualités.");
      return;
    }
    onNext();
  };

  const handleBack = () => {
    onBack();
  };

  const displayedImage = image ? URL.createObjectURL(image) : DEFAULT_IMAGE;

  return (
    <div className="space-y-6 flex flex-col justify-center max-w-xl mx-auto">
      <p className="text-sm font-semibold text-gray-500">2/4</p>

      {/* Image + loader */}
      <div className="text-center space-y-4">
        {loading && !image && (
          <div className="animate-pulse text-sm text-gray-500">
            ⏳ Chargement de l’image...
          </div>
        )}

        <img
          src={displayedImage}
          alt="Photo de profil"
          className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-gray-300 shadow"
        />

        <p className="text-sm text-gray-600">
          Cliquez pour{" "}
          <button
            className="text-sm text-gray-600 cursor-pointer"
            onClick={() => document.getElementById("fileInput").click()}
          >
            ajouter
          </button>{" "}
          une nouvelle photo.
        </p>

        <input
          id="fileInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />

        <a
          href={displayedImage}
          download="ma-photo.jpg"
          className="bg-customOrange hover:bg-orange-600 text-white px-4 py-2 rounded-md inline-block"
        >
          💾 Télécharger l’image
        </a>
      </div>

      {/* Qualités */}
      <div className="grid grid-cols-4 gap-3 text-sm">
        {QUALITIES.map((q, i) => (
          <label
            key={i}
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
          >
            <input
              type="checkbox"
              checked={selectedQualities.includes(q)}
              onChange={() => {
                if (q === "Tout décocher") {
                  setSelectedQualities([]);
                } else {
                  setSelectedQualities((prev) =>
                    prev.includes(q)
                      ? prev.filter((item) => item !== q)
                      : [...prev, q].slice(0, 5)
                  );
                }
              }}
            />
            <span>{q}</span>
          </label>
        ))}
      </div>

      {error && (
        <p className="text-red-500 text-center font-semibold">{error}</p>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={handleBack}
          className="text-gray-500 hover:underline"
        >
          Retour
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="bg-customOrange hover:bg-orange-600 text-white px-5 py-2 rounded-md"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
