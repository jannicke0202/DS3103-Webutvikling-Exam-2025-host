import { useSportsWorld } from "../../context/SportsWorldContext";

const AvailableAthletes = () => {
  const { athletes, purchaseAthlete } = useSportsWorld();

  console.log("Current athletes in context:", athletes);
  console.log("Number of athletes:", athletes.length);

  const available = athletes.filter(a => !a.PurchaseStatus);

  if (available.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-3xl font-bold text-gray-700">No athletes available</p>
        <p className="text-lg text-gray-500 mt-3">All athletes have been purchased!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {available.map((athlete) => (
        <div
          key={athlete.id}
          className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200"
        >
          <div className="h-48 bg-gradient-to-br from-gray-300 to-gray-400 border-2 border-dashed border-gray-500"></div>

          <div className="p-6">
            <h3 className="text-2xl font-extrabold text-gray-800">{athlete.Name}</h3>
            

            <div className="mt-6 flex justify-between items-center">
              <div>
                <p className="text-3xl font-bold text-orange-600">
                  {athlete.Price.toLocaleString("de-DE")} NOK
                </p>
                <p className="text-sm text-gray-500">Transfer fee</p>
              </div>
              <button
                onClick={() => purchaseAthlete(athlete.id!)}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-xl hover:from-amber-600 hover:to-orange-700 transform hover:scale-110 transition shadow-md"
              >Purchase</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AvailableAthletes;