import { useState } from "react";

export default function Step1() {
  const [password, setPassword] = useState("Choisissez un mot de passe");
  const [email, setEmail] = useState("");
  const [checkboxChecked, setCheckboxChecked] = useState(true);
  const [domain, setDomain] = useState("servier");
  const [error, setError] = useState("");

  function containsCyrillic(str) {
    return /[\u0400-\u04FF]/.test(str);
  }

  function validateForm() {
    setError("");

    // 1. Case refus cochée
    if (checkboxChecked) {
      setError(
        "Merci de lire les conditions : vous ne pouvez pas les refuser."
      );
      return;
    }

    // 2. Domaine imposé
    if (domain.toLowerCase() !== "servier") {
      setError("Le domaine est requis pour accéder à la plateforme sécurisée.");
      return;
    }

    // 3. Fournisseur email bloqué
    if (email.match(/@(gmail|hotmail)\./i)) {
      setError(
        "Les adresses Gmail ou Hotmail ne sont pas compatibles avec notre système."
      );
      return;
    }

    // 5. Mot de passe : au moins 10 caractères
    if (password.length < 10) {
      setError("Votre mot de passe doit contenir au moins 10 caractères.");
      return;
    }

    // 6. Mot de passe : au moins 1 chiffre
    if (!/\d/.test(password)) {
      setError("Le mot de passe doit contenir au moins un chiffre.");
      return;
    }

    // 7. Mot de passe : au moins 2 lettres communes avec email
    const emailLetters = email.replace(/[^a-zA-Z]/g, "").toLowerCase();
    const passwordLetters = password.toLowerCase();
    let commonLetters = 0;

    for (let i = 0; i < emailLetters.length; i++) {
      if (passwordLetters.includes(emailLetters[i])) {
        commonLetters++;
      }
      if (commonLetters >= 2) break;
    }

    if (commonLetters < 2) {
      setError(
        "Le mot de passe doit contenir au moins 2 lettres présentes dans votre adresse e-mail."
      );
      return;
    }

    // 8. Bonus : encourage à utiliser le cyrillique (facultatif)
    if (!containsCyrillic(password)) {
      alert(
        "⚠️ Conseil sécurité : ajoutez un caractère cyrillique pour renforcer votre mot de passe."
      );
    }

    alert("✅ Formulaire validé ! Vous avez passé l'étape avec succès.");
  }

  return (
    <div className="space-y-6 flex flex-col justify-center max-w-xl mx-auto">
      <p className="text-sm font-semibold text-gray-500">1/4</p>

      {/* Mot de passe */}
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Choisissez un mot de passe"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customOrange text-gray-400"
      />

      {/* Email */}
      <div className="flex items-center">
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customOrange text-gray-400"
        />
        <span className="px-3 text-gray-500 select-none">@</span>
        <input
          type="text"
          value={domain}
          readOnly
          placeholder="servier"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-customOrange"
        />
        <select
          className="px-4 py-[9px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customOrange ml-4"
          defaultValue=".org"
        >
          <option value=".com">.com</option>
          <option value=".fr">.fr</option>
          <option value=".net">.net</option>
          <option value=".org">.org</option>
          <option value=".jsp">.jsp</option>
          <option value=".io">.io</option>
        </select>
      </div>

      {/* Case à cocher */}
      <div className="flex items-center justify-center space-x-2">
        <input
          type="checkbox"
          id="disagree"
          checked={checkboxChecked}
          onChange={(e) => setCheckboxChecked(e.target.checked)}
          className="h-5 w-5 text-customOrange focus:ring-customOrange"
        />
        <label
          htmlFor="disagree"
          className="text-sm text-gray-700 cursor-pointer"
        >
          <p className="flex gap-1">
            Je n'accepte pas les{" "}
            <span className="font-bold underline">
              Conditions d'utilisation
            </span>
          </p>
        </label>
      </div>

      {/* Erreur */}
      {error && (
        <p className="text-red-500 text-center font-semibold">{error}</p>
      )}

      {/* Boutons */}
      <div className="flex justify-center gap-8 mt-8">
        {/* ✅ Vrai bouton à gauche */}

        {/* Faux boutons à droite */}
        <button
          type="button"
          onClick={validateForm}
          className="text-gray-400 cursor-pointer"
        >
          Valider
        </button>
        <button
          type="button"
          onClick={() =>
            alert(
              "🎯 Vous avez cliqué sur 'Suivant' et pourquoi pas sur 'Valider' ? \n🧠 Fun fact : La majorité des gens cliquent sans lire. UX : 1 — Utilisateur : 0"
            )
          }
          className="bg-customBlue text-white px-5 py-2 cursor-pointer rounded-md shadow hover:bg-orange-600 transition"
        >
          Suivant
        </button>
        <button
          type="button"
          onClick={() => alert("Suppression impossible. Code erreur #426")}
          className="text-gray-400 cursor-pointer"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}
