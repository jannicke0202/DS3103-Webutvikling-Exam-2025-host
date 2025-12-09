import { useSportsWorld } from "../../context/SportsWorldContext";

export default function FinancialSummary() {
  const { finance } = useSportsWorld();

  if (!finance) {
    return (
      <div className="text-center py-6 text-gray-500">
        Loading finances...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Finance Overview
      </h2>

      
      <p className="text-6xl font-black text-green-600 mt-4">
        {finance.moneyLeft.toLocaleString()} NOK
      </p>

      
      <div className="mt-10 grid grid-cols-2 gap-8 text-gray-600">
        <div>
          <p className="text-sm uppercase tracking-wide">Players Bought</p>
          <p className="text-3xl font-bold">{finance.numberOfPurchases}</p>
        </div>
        <div>
          <p className="text-sm uppercase tracking-wide">Total Spent</p>
          <p className="text-3xl font-bold">{finance.moneySpent.toLocaleString()} NOK</p>
        </div>
      </div>
    </div>
  );
}
