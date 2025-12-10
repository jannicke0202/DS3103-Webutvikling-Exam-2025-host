// src/components/finances/FinancialSummary.tsx

import axios from "axios";
import { useSportsWorld } from "../../context/SportsWorldContext";

export default function FinancialSummary() {
  const { finance } = useSportsWorld();

  // Om det skulle faile, vis dette i stedet for ingenting
  if (!finance) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-xl">Loading financial data...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      <div> 
        <h3>Money Left</h3>
          £ {finance.moneyLeft.toLocaleString("de-DE")} 
      </div>

      <div>
      <h3>Players Bought</h3>
          {finance.numberOfPurchases}
        
      </div>

      <div> 
      <h3>Total money spent:</h3>
         £ {finance.moneySpent.toLocaleString("de-DE")} 
      </div>

    <button onClick={async () => {
      if (confirm("Are you sure? This will reset all your money and purchases")) {
        try {
          await axios.post("http://localhost:5115/api/Finance/reset");
          alert("Session reset");
          window.location.reload();
        } catch {
          alert ("reset failed")
        }
      }
    }} className="rounded-xl mt-8 w-50 py-4 bg-red-500 cursor-pointer">Reset session</button>

    </div>
  );
}