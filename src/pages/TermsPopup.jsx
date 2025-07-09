import { useRef, useState } from "react";

export default function TermsPopup({ onClose }) {
  const scrollRef = useRef(null);
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);
  const [showRobotCheck, setShowRobotCheck] = useState(false);
  const [robotAnswered, setRobotAnswered] = useState(false);

  const handleScroll = () => {
    const el = scrollRef.current;
    const scrollTop = el.scrollTop;
    const scrollHeight = el.scrollHeight;
    const clientHeight = el.clientHeight;

    // Robot check à 50% du scroll
    if (
      scrollTop > scrollHeight / 2 - clientHeight &&
      !robotAnswered &&
      !showRobotCheck
    ) {
      setShowRobotCheck(true);
    }

    // Valide le scroll complet
    if (robotAnswered && scrollTop + clientHeight >= scrollHeight - 10) {
      setHasScrolledToEnd(true);
    }
  };

  const handleRobotResponse = (isHuman) => {
    if (!isHuman) {
      alert("Réponse incorrecte. Essayez encore.");
    } else {
      setShowRobotCheck(false);
      setRobotAnswered(true);

      // Vérifie si déjà en bas au moment du clic
      const el = scrollRef.current;
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
        setHasScrolledToEnd(true);
      }
    }
  };

  // Contenu des conditions (vraies + humour noir UX)
  const terms = `
Bienvenue sur notre plateforme. Veuillez lire attentivement ces conditions d'utilisation.

1. **Accès** : En accédant à cette plateforme, vous acceptez toutes les conditions présentes, passées et futures.

2. **Cookies** : Nous utilisons des cookies, des brownies et parfois des macarons pour suivre vos mouvements, clics, hésitations et soupirs.

3. **Protection des données** : Vos données ne sont pas protégées. Elles sont précieuses, mais surtout pour nous.

4. **Modification** : Nous pouvons modifier ces conditions à tout moment, même rétroactivement. Vous êtes censé(e) les avoir déjà acceptées.

5. **Consentement implicite** : Si vous refusez, c’est quand même un oui. Si vous hésitez, c’est encore plus un oui.

6. **Durée de lecture obligatoire** : Si vous scrollez trop vite, nous vous renverrons au début.

7. **Clause absurde** : Le simple fait de lire cette ligne signifie que vous avez vendu votre âme.

Merci de continuer jusqu’en bas pour valider votre servitude.
`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-6 max-w-xl w-full rounded shadow-lg relative">
        <h2 className="text-xl font-bold mb-4 text-center">
          Conditions d'utilisation
        </h2>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="h-[200px] overflow-y-scroll border border-gray-300 p-4 text-sm text-gray-700 leading-6 space-y-2"
          style={{ scrollbarWidth: "thin" }}
        >
          {Array.from({ length: 120 }).map((_, i) => (
            <p key={i}>{terms}</p>
          ))}
        </div>

        {/* Interruption robot */}
        {showRobotCheck && !robotAnswered && (
          <div className="absolute inset-0 bg-white bg-opacity-95 z-10 flex flex-col items-center justify-center p-8 rounded shadow">
            <p className="text-xl mb-4 font-semibold text-gray-800">
              🤖 Êtes-vous un robot ?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => handleRobotResponse(false)}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                Oui
              </button>
              <button
                onClick={() => handleRobotResponse(true)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Non$
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() =>
            hasScrolledToEnd
              ? onClose()
              : alert("Merci de lire TOUTES les conditions.")
          }
          disabled={!hasScrolledToEnd}
          className={`mt-6 w-full px-4 py-2 rounded transition ${
            hasScrolledToEnd
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          J’accepte
        </button>
      </div>
    </div>
  );
}
