import { useSportsWorld } from "../../context/SportsWorldContext";

const FinancialSummary = () => {
    const { finance } = useSportsWorld();

    if (!finance) {
        return <p className="text-center text-gray-500">Loading financial data...</p>;
      }
    
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl border-2 border-green-300 text-center transform hover:scale-105 transition">
            <p className="text-green-700 font-semibold text-lg">Money Left</p>
            <p className="text-4xl font-extrabold text-green-600 mt-2">
              {finance.moneyLeft.toLocaleString("de-DE")} NOK
            </p>
          </div>
    
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl border-2 border-blue-300 text-center transform hover:scale-105 transition">
            <p className="text-blue-700 font-semibold text-lg">Athletes Purchased</p>
            <p className="text-4xl font-extrabold text-blue-600 mt-2">
              {finance.numberOfPurchases}
            </p>
          </div>
    
          <div className="bg-gradient-to-br from-red-50 to-rose-100 p-8 rounded-2xl border-2 border-red-300 text-center transform hover:scale-105 transition">
            <p className="text-red-700 font-semibold text-lg">Total Spent</p>
            <p className="text-4xl font-extrabold text-red-600 mt-2">
              {finance.moneySpent.toLocaleString("de-DE")} NOK
            </p>
          </div>
        </div>
      );
    };

export default FinancialSummary;