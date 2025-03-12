import { motion } from "framer-motion";
import { Expand } from "lucide-react";

const Modal = ({ isOpen, onClose, title, children, showIcon }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-md p-6 relative z-50"
        onClick={(e) => e.stopPropagation()}
      >
        {showIcon && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:cursor-pointer"
          >
            <Expand size={24} />
          </button>
        )}

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {title}
        </h2>
        <div className="text-gray-700 dark:text-gray-300">{children}</div>
      </motion.div>
    </div>
  );
};

export default Modal;
