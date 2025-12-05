import { useState } from "react";

const LoanSection = () => {
  const [amount, setAmount] = useState("");

  const handleSubmit = async () => {
    const value = Number(amount);
    if (!value || value <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    setAmount("");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <label htmlFor="loan" className="block text-xl font-bold text-gray-800 mb-4">
        Get More Money - Take a Loan
      </label>
      <div className="flex gap-4">
        <input
          id="loan"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="200.000"
          className="flex-1 px-6 py-4 text-xl border-2 border-gray-300 rounded-xl focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-200 transition"
        />
        <button
          onClick={handleSubmit}
          className="px-10 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xl rounded-xl hover:from-emerald-700 hover:to-teal-700 disabled:opacity-60 transform hover:scale-105 transition shadow-lg"
        >Get loan</button>
      </div>
    </div>
  );
};

export default LoanSection;