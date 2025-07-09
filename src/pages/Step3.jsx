import { useState, useEffect } from "react";

export default function Step3({ onNext, onBack }) {
  const QUESTIONS = [
    {
      id: "q1",
      question: "Comment gérez-vous vos priorités ?",
      options: [
        "Je fais les tâches les plus urgentes d’abord",
        "Je commence par ce qui me motive le plus",
        "Je délègue dès que possible",
        "Je préfère ne pas répondre",
      ],
    },
    {
      id: "q2",
      question: "Quelle est votre posture en réunion ?",
      options: [
        "J'écoute avant de parler",
        "Je prends naturellement la parole",
        "Je me concentre sur la prise de notes",
        "Je préfère ne pas répondre",
      ],
    },
    {
      id: "q3",
      question: "Quand travaillez-vous le mieux ?",
      options: [
        "Tôt le matin",
        "En pleine nuit",
        "Juste avant la deadline",
        "Je préfère ne pas répondre",
      ],
    },
  ];

  const [answers, setAnswers] = useState({
    q1: "",
    q2: "",
    q3: "",
  });

  const [honestyInput, setHonestyInput] = useState(""); // input numérique (pas de max)
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [fastClicked, setFastClicked] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [progress, setProgress] = useState(0);

  // Slider state : peut dépasser 100 jusqu'à 200
  const [sliderValue, setSliderValue] = useState(50);
  const [sliderReleased, setSliderReleased] = useState(false);

  // Timer progress bar
  useEffect(() => {
    if (progress < 99) {
      const timer = setTimeout(() => setProgress(progress + 1), 50);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  function handleChange(qId, val) {
    setAnswers((prev) => ({ ...prev, [qId]: val }));
  }

  function validate() {
    setError("");
    setFastClicked(false);

    // Toutes les questions doivent être répondues
    if (Object.values(answers).some((a) => a === "")) {
      setError("📝 Veuillez répondre à toutes les questions.");
      return false;
    }

    // Validation input honnêteté numérique
    const honestyNum = Number(honestyInput);
    const sliderNum = Number(sliderValue);
    const tolerance = 5;

    if (isNaN(honestyNum) || honestyNum < 0) {
      setError("⚠️ Veuillez saisir un nombre valide pour l’honnêteté.");
      return false;
    }

    if (honestyNum > 100) {
      setError("🤥 Personne n’est honnête à plus de 100%. Soyez raisonnable.");
      return false;
    }

    // Correspondance input numérique vs slider (tolérance)
    if (Math.abs(honestyNum - Math.min(sliderNum, 100)) > tolerance) {
      setError(
        `⚠️ Vos valeurs d'honnêteté ne correspondent pas, encore un mensonge ...`
      );
      return false;
    }

    // Commentaire obligatoire (même si présenté optionnel)
    if (comment.trim() === "") {
      setError(
        "✍️ Le commentaire est indiqué comme optionnel, mais nous insistons pour que vous laissiez un petit feedback avant de continuer."
      );
      return false;
    }

    // UX tip si trop rapide
    const elapsedSeconds = (Date.now() - startTime) / 1000;
    if (elapsedSeconds < 10 && comment.trim() === "") {
      setFastClicked(true);
      setError(
        "🧠 UX Tip : parfois, l’intention compte plus que la réponse. Vous venez de cliquer trop vite."
      );
      return false;
    }

    // Slider doit être relâché au moins une fois
    if (!sliderReleased) {
      setError(
        "N'oubliez pas d'ajuster et relâcher le curseur pour continuer."
      );
      return false;
    }

    return true;
  }

  function handleNext() {
    if (validate()) {
      setProgress(100);
      onNext();
    }
  }

  function handleBack() {
    onBack();
  }

  // Gère le slider : visuellement limité à 100 mais peut dépasser 200 en interne
  function handleSliderChange(e) {
    const val = Number(e.target.value);
    if (val >= 100 && sliderValue < 100) {
      // Si on atteint 100 depuis en dessous, commencer à incrémenter au mousemove
      setSliderValue(100);
    } else if (val < 100) {
      setSliderValue(val);
    }
  }

  // Pendant drag, simule dépassement si on continue de déplacer
  function handleMouseMove(e) {
    if (e.buttons === 1 && sliderValue >= 100 && sliderValue < 200) {
      setSliderValue((v) => Math.min(200, v + 1));
    }
  }

  return (
    <div className="max-w-xl mx-auto space-y-6 flex flex-col justify-center">
      <p className="text-sm font-semibold text-gray-500">3/4</p>

      {/* Barre de progression */}
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mb-6">
        <div
          className={`h-4 bg-customOrange transition-all duration-300`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Questions */}
      {QUESTIONS.map(({ id, question, options }) => (
        <fieldset key={id} className="mb-6">
          <legend className="font-semibold mb-2">{question}</legend>
          {options.map((option, i) => (
            <label
              key={i}
              className="flex items-center gap-2 cursor-pointer mb-1 hover:bg-gray-100 p-2 rounded"
            >
              <input
                type="radio"
                name={id}
                value={option}
                checked={answers[id] === option}
                onChange={() => handleChange(id, option)}
                className="cursor-pointer"
              />
              <span>{option}</span>
            </label>
          ))}

          {/* Input numérique uniquement pour la question 2 */}
          {id === "q2" && (
            <div className="mt-3">
              <label
                htmlFor="honestyInput"
                className="block mb-1 font-semibold select-none"
                title="Sur 100, à quel point êtes-vous honnête ?"
              >
                Sur 100, à quel point êtes-vous honnête ?
              </label>
              <input
                type="number"
                id="honestyInput"
                min={0}
                step={1}
                value={honestyInput}
                onChange={(e) => setHonestyInput(e.target.value)}
                onKeyDown={(e) => e.preventDefault()} // bloque frappe clavier
                onPaste={(e) => e.preventDefault()}
                onDrop={(e) => e.preventDefault()}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-customOrange"
              />
              {honestyInput > 100 && (
                <p className="text-sm text-red-600 mt-1">
                  🤥 Personne n’est honnête à plus de 100%. Soyez raisonnable.
                </p>
              )}
            </div>
          )}
        </fieldset>
      ))}

      {/* Slider question */}
      <div className="mb-6" onMouseMove={handleMouseMove}>
        <label
          htmlFor="honesty"
          className="block mb-2 font-semibold select-none"
          title="À quel point avez-vous été honnête ?"
        >
          À quel point avez-vous été honnête ?
        </label>
        <input
          id="honesty"
          type="range"
          min="0"
          max="100"
          value={sliderValue > 100 ? 100 : sliderValue}
          onChange={handleSliderChange}
          onMouseUp={() => setSliderReleased(true)}
          onTouchEnd={() => setSliderReleased(true)}
          className="w-full cursor-pointer"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={sliderValue > 100 ? 100 : sliderValue}
          aria-label="Niveau d'honnêteté"
        />
        {sliderReleased && sliderValue > 100 && (
          <p className="mt-1 text-sm text-red-600 select-none italic">
            🤯 Trop d’honnêteté tue l’honnêteté ?
          </p>
        )}
        {sliderReleased && sliderValue < 100 && (
          <p className="mt-1 text-sm text-gray-600 select-none italic">
            {sliderValue} ??? 😏 J’espère que vous n’avez pas choisi "honnêteté"
            comme qualité !
          </p>
        )}
      </div>

      {/* Commentaire */}
      <div>
        <label htmlFor="comment" className="block mb-1 font-semibold">
          ✍️ Laissez-nous un commentaire spontané (optionnel)
        </label>
        <textarea
          id="comment"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-customOrange resize-none"
          placeholder="Partagez vos impressions, idées, frustrations..."
        />
      </div>

      {/* Erreur */}
      {error && (
        <p
          className={`text-center font-semibold ${
            fastClicked ? "text-yellow-600" : "text-red-600"
          }`}
        >
          {error}
        </p>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={handleBack}
          className="text-gray-500 hover:underline"
        >
          ← Retour
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="bg-customOrange hover:bg-orange-600 text-white px-5 py-2 rounded-md"
        >
          Suivant →
        </button>
      </div>
    </div>
  );
}
