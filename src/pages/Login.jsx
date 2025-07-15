import Background from "../assets/Background";
import StepIndicator from "./StepIndicator";
import StepVerification from "./StepVerification";

export default function Login() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 text-center overflow-hidden bg-[#24226A]">
      <Background className="absolute inset-0 w-full h-full object-cover" />
      <div className="relative bg-white rounded-3xl shadow-xl w-full max-w-3xl p-8 mt-8">
        <div className="mb-6 flex justify-center">
          <StepIndicator />
        </div>
        <StepVerification />
      </div>
    </div>
  );
}
