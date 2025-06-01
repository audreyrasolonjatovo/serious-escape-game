import { useEffect, useState } from "react";

export default function StepIndicator() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 4);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative z-10 flex gap-4 mb-6">
      {[0, 1, 2, 3].map((num, index) => (
        <div
          key={index}
          className={`h-12 w-12 rounded-full flex items-center justify-center font-bold transition duration-300 ease-in-out ${
            index === activeIndex
              ? "bg-white text-customOrange transform scale-125"
              : "bg-customOrange text-white"
          }`}
        >
          {num + 1}
        </div>
      ))}
    </div>
  );
}
