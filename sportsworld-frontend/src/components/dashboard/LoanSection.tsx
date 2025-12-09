import { useSportsWorld } from "../../context/SportsWorldContext";

export default function LoanSection() {
  const { takeLoan } = useSportsWorld();

  return (
    <div>
      <h3>
        No more cash in the balance?
      </h3>

      <button
        onClick={() => takeLoan(1_000_000)}
        className="w-full py-5 bg-black text-white text-xl font-bold rounded-xl hover:bg-gray-900 transition transform hover:scale-105">
        + 1 000 000,- NOK
      </button>
    </div>
  );
}