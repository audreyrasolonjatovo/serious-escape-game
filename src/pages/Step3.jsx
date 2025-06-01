import React from "react";

export default function Step3() {
  return (
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
        Cochez au moins 5 traits qui vous ressemblent afin de continuer.
      </p>
      <Button variant="primary" onClick={handleNextStep}>
        Suivant
      </Button>
    </div>
  );
}
