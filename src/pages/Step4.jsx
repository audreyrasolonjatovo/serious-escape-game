import { useState } from "react";

export default function Step4() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const correctIndexes = [0, 1, 6, 7, 8]; // indexes des images de "glace"

  const images = [
    { src: "/utilisabilite/glace4.png", alt: "Montagne" },
    { src: "/utilisabilite/glace1.png", alt: "Glace dessert" },
    { src: "/utilisabilite/hippo2.png", alt: "Plage" },
    { src: "/utilisabilite/hippo3.png", alt: "Glace dessert" },
    { src: "/utilisabilite/hippo4.png", alt: "Voiture" },
    { src: "/utilisabilite/hippo.png", alt: "Glace dessert" },
    { src: "/utilisabilite/glace2.jpg", alt: "Glace dessert" },
    { src: "/utilisabilite/glace5.jpg", alt: "Voiture" },
    { src: "/utilisabilite/glace3.png", alt: "Glace dessert" },
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
      setShowModal(true); // Affiche le modal
    } else {
      setError("❌ Oups, ce n'est pas la bonne sélection. Réessayez !");
    }
  }

  return (
    <div className="max-w-xl mx-auto space-y-6 text-center relative">
      <p className="text-sm font-semibold text-gray-500">4/4</p>

      <h2 className="text-xl font-bold">🧠 Nous avons bientôt fini…</h2>
      <p className="text-gray-700">
        Nous voulons juste vérifier que vous êtes bien un humain.
      </p>

      <p className="mt-4 font-semibold">
        Sélectionnez toutes les images du mot que vous entendez.
      </p>

      <button
        onClick={() => {
          const audio = new Audio("/glace.mp3");
          audio.play();
        }}
        className="mt-2 bg-customOrange text-white px-4 py-2 rounded hover:bg-orange-600 cursor-pointer"
      >
        ▶️ Écouter
      </button>

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

      {error && <p className="text-red-600 font-semibold mt-4">{error}</p>}

      <button
        onClick={handleValidate}
        className="mt-6 bg-customOrange text-white px-5 py-2 rounded hover:bg-orange-600"
      >
        Valider
      </button>

      {/* Modal de feedback */}
      {showModal && (
        <div className="fixed inset-0 bg-[#24226A] bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl text-center">
            <h3 className="text-lg font-semibold mb-4">
              Bien joué ! Merci d'avoir rempli votre profil !
            </h3>
            <h4>Votre avis compte !</h4>
            <a
              href="https://miro.com/app/board/uXjVIH_Md28=/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/note.png"
                alt="Donnez votre avis"
                className="w-64 h-auto mx-auto rounded-lg hover:opacity-90 transition"
              />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
