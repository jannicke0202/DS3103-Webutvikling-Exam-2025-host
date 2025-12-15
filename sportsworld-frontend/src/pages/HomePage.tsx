import AthleteCard from "../components/athletes/AthleteCard"
import { useSportsWorld } from "../context/SportsWorldContext"
import EditAthlete from "../components/athletes/EditAthlete";
import { useEffect, useState } from "react";


const HomePage = () => {
  const { athletes, deleteAthlete, updateAthlete } = useSportsWorld();
  const { loadData } = useSportsWorld();
  const [searchInput, setSearchInput] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null)
  const startEditing = (id: number) => {
    setEditingId(id);
  };
  const [sortOrder, setSortOrder] = useState<"low" | "high" | null>(null);

  const toggleSort = () => {
    if (sortOrder === null) setSortOrder("low");
    else if (sortOrder === "low") setSortOrder("high");
    else setSortOrder(null);
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const saveEditedAthlete = (updatedAthlete: any) => {
    updateAthlete(updatedAthlete);
    setEditingId(null);
  }

  const displayedAthletes = [...athletes].sort((a, b) => {
    if (sortOrder === "low") return a.price - b.price;
    if (sortOrder === "high") return b.price - a.price;
    return 0;
  })
    .filter((athlete) =>
      athlete.name.toLowerCase().includes(searchInput.toLowerCase())
    );

  useEffect(() => {
    loadData();
  }, []);

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
      <header className="text-center bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold transform transition shadow-md py-12">
        <h1 className="text-5xl font-black mb-4">SportsWorld</h1>
        <p className="text-xl">Showcasing all athletes</p>
      </header>

      <main className="max-w-7xl mx-auto p-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          All Players ({athletes.length})
        </h2>

        {/* Sorter knapp */}
        <button
          onClick={toggleSort}
          className="font-semibold text-gray rounded-lg bg-blue-500 px-6 py-3 mb-4 cursor-pointer">
          Sort by price
          {sortOrder === "low" && " | Lowest price first"}
          {sortOrder === "high" && " | Highest price first"}
          {sortOrder === null && ""}
        </button>

        <input className="rounded-lg font-semibold bg-orange-200 ml-50 px-6 py-3 text-center"
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search for athletes"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedAthletes.map((athlete) => (
            <div key={athlete.id}>
              {editingId === athlete.id ? (
                <div className="bg-white rounded-lg p-6 border shadow-lg">

                  <EditAthlete
                    athlete={athlete}
                    onSave={saveEditedAthlete}
                    onCancel={cancelEditing}
                  />
                </div>
              ) : (
                <AthleteCard
                  athlete={athlete}
                  onEdit={() => startEditing(athlete.id!)}
                  onDelete={deleteAthlete}
                />
              )}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default HomePage