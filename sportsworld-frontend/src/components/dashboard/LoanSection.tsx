import { useSportsWorld } from "../../context/SportsWorldContext";

export default function LoanSection() {
  const { takeLoan } = useSportsWorld();

  return (
    <div>
      <h3>
        If you managed to use all of the cash, click here...
      </h3>

      <button
        onClick={() => takeLoan(1_000_000)}
        className="w-60 py-5 bg-black text-white text-xl font-bold rounded-xl hover:bg-gray-900 transition transform hover:scale-105 cursor-pointer">
        + £ 1.000.000 
      </button>
    </div>
  );
}