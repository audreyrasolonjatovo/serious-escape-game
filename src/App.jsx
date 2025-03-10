import { useState } from "react";
import Modal from "./components/Modal/Modal";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
      >
        Ouvrir la modal
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Titre de la Modal"
      >
        <p>Ceci est le contenu de la modal.</p>
      </Modal>
    </div>
  );
};

export default App;
