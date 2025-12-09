import AthleteCard from "../components/athletes/AthleteCard"
import { useSportsWorld } from "../context/SportsWorldContext"

const HomePage = () => {
    const {athletes} = useSportsWorld();

    if (!athletes || athletes.length === 0) {
        return (
          <div className="p-10 text-center">
            <h1 className="text-4xl font-bold mb-4">SportsWorld</h1>
            <p className="text-xl text-gray-600">No players found in the database</p>
          </div>
        );
      }
    
      return (
        <>
          <header className="text-center py-12 bg-gradient-to-b from-blue-600 to-blue-800 text-white">
            <h1 className="text-5xl font-black mb-4">SportsWorld</h1>
            <p className="text-xl">Showcasing all athletes</p>
          </header>
    
          <main className="max-w-7xl mx-auto p-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">
              All Players ({athletes.length})
            </h2>
    
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {athletes.map((athlete) => (
                <AthleteCard
                  key={athlete.id}
                  athlete={athlete}
                  onEdit={() => alert("Funksjon ikke klar enda" )}
                  onDelete={() => alert("Funksjon ikke klar enda")}
                />
              ))}
            </div>
          </main>
        </>
      );
}

export default HomePage