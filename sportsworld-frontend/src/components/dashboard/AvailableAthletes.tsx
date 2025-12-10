import { useSportsWorld } from "../../context/SportsWorldContext";

const AvailableAthletes = () => {
  const { athletes, purchaseAthlete } = useSportsWorld();

  const available = athletes.filter(a => !a.purchaseStatus);

  if (available.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-3xl font-bold text-gray-700">No athletes available</p>
        <p className="text-lg text-gray-500 mt-3">All athletes have been purchased!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
      {available.map((athlete) => {
        const imageUrl = athlete.image
          ? `http://localhost:5115/${athlete.image}`
          : null;

        return (
          <div
            key={athlete.id}
            className="padding: 12px, borderRadius: 16px, marginBottom: 16px, width: 75% rounded-2xl">
            
            {imageUrl ? (
              <div className="flex justify-center my-8">
                <img
                  src={imageUrl}
                  alt={athlete.name}
                  className="w-60 h-80 object-cover rounded-2xl border border-gray-300"
                />
              </div>
            ) : (
              <div className="flex justify-center my-8">
                <div className="w-60 h-80 bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white text-8xl font-bold">
                  {athlete.name.charAt(0)}
                </div>
              </div>
            )}

            <div className="p-4">
              <h3 className="text-2xl font-extrabold text-center text-gray-500">{athlete.name}</h3>

              <div className="mt-8 text-center">
                <p className="text-2xl font-bold text-orange-600">
                  £ {athlete.price.toLocaleString("de-DE")} 
                </p>
                <p className="text-sm text-gray-500 mb-6">Transfer fee</p>

                <button
                  onClick={() => purchaseAthlete(athlete.id!)}
                  className="w-50% px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-xl hover:from-amber-600 hover:to-orange-700 transform hover:scale-105 transition shadow-md cursor-pointer"
                >PURCHASE</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AvailableAthletes;