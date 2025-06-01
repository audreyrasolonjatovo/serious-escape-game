import { useState } from "react";

export default function Step4() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [error, setError] = useState("");
  const correctIndexes = [0, 1, 6, 7, 8]; // indexes des images de "glace"

  const images = [
    { src: "glace4.png", alt: "Montagne" },
    { src: "glace1.png", alt: "Glace dessert" },
    { src: "hippo2.png", alt: "Plage" },
    { src: "hippo3.png", alt: "Glace dessert" },
    { src: "hippo4.png", alt: "Voiture" },
    { src: "hippo.png", alt: "Glace dessert" },
    { src: "glace2.jpg", alt: "Glace dessert" },
    { src: "glace5.jpg", alt: "Voiture" },
    { src: "glace3.png", alt: "Glace dessert" }
  ];

  function toggleImage(index) {
    setError("");
    setSelectedImages((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  }

  function handleValidate() {
    const isCorrect =
      selectedImages.length === correctIndexes.length &&
      selectedImages.every((i) => correctIndexes.includes(i));
    if (isCorrect) {
      alert("✅ Humain détecté, bravo !");
    } else {
      setError("❌ Oups, ce n'est pas la bonne sélection. Réessayez !");
    }
  }

  return (
    <div className="max-w-xl mx-auto space-y-6 text-center">
      <p className="text-sm font-semibold text-gray-500">4/4</p>

      <h2 className="text-xl font-bold">🧠 Nous avons bientôt fini…</h2>
      <p className="text-gray-700">
        Nous voulons juste vérifier que vous êtes bien un humain.
      </p>

      <p className="mt-4 font-semibold">
        🎧 Sélectionnez toutes les images du mot que vous entendez.
      </p>

      {/* Bouton audio */}
      <button
        onClick={() => {
          const audio = new Audio("/glace.mp3"); // ← fichier à ajouter
          audio.play();
        }}
        className="mt-2 bg-customOrange text-white px-4 py-2 rounded hover:bg-orange-600"
      >
        ▶️ Écouter
      </button>

      {/* Grille d'images */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => toggleImage(i)}
            className={`border-4 rounded cursor-pointer overflow-hidden transition-all ${
              selectedImages.includes(i)
                ? "border-customOrange"
                : "border-transparent"
            }`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-32 object-cover"
            />
          </div>
        ))}
      </div>

      {/* Message d'erreur */}
      {error && <p className="text-red-600 font-semibold mt-4">{error}</p>}

      {/* Bouton de validation */}
      <button
        onClick={handleValidate}
        className="mt-6 bg-customOrange text-white px-5 py-2 rounded hover:bg-orange-600"
      >
        Valider
      </button>
    </div>
  );
}
