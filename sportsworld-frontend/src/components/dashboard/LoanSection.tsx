import { useState } from "react";
import { useSportsWorld } from "../../context/SportsWorldContext";


export default function LoanSection() {
  const { takeLoan } = useSportsWorld();
  const [amount, setAmount] = useState("");

  const handleLoan = () => {
    const loanAmount = parseInt(amount);
    if (loanAmount <= 0) {
      alert("Please enter a valid amount")
    }
    takeLoan(loanAmount)
    setAmount("")
  }

  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold mb-6">
        Need more funds? Take a loan!
      </h3>

      <div className="flex flex-col items-center gap-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Get money here!"
          className="w-80 px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 text-center"
        />

        <button
          onClick={handleLoan}
          className="w-80 py-5 bg-black text-white text-xl font-bold rounded-xl hover:bg-gray-900 transition transform cursor-pointer"
        >
          Take Loan + £{amount ? parseInt(amount).toLocaleString() : "0"}
        </button>
      </div>
    </div>
  );
}