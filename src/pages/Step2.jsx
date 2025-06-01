import React from "react";

export default function Step2() {
  return (
    <div className="space-y-6">
      <p className="text-2xl font-semibold text-gray-700">
        2/4 - Sélectionnez les images représentant une bonne ambiance de travail
      </p>
      <div className="grid grid-cols-3 gap-4">
        {["image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg"].map(
          (image, index) => (
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
              <p className="text-center mt-2 text-sm">{`Image ${index + 1}`}</p>
            </div>
          )
        )}
      </div>
      <Button variant="primary" onClick={handleNextStep}>
        Suivant
      </Button>
    </div>
  );
}
