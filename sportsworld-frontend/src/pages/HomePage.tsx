import AthleteCard from "../components/athletes/AthleteCard"
import { useSportsWorld } from "../context/SportsWorldContext"
import EditAthlete from "../components/athletes/EditAthlete";
import { useEffect, useState } from "react";


const HomePage = () => {
    const {athletes, deleteAthlete, updateAthlete} = useSportsWorld();
    const { loadData } = useSportsWorld();
    const [editingId, setEditingId] = useState<number | null>(null)
    const editingAthlete = athletes.find(a => a.id === editingId);
    const startEditing = (id: number) => {
      setEditingId(id);
    };

    const cancelEditing = () => {
      setEditingId(null);
    };

    const saveEditedAthlete = (updatedAthlete: any) => {
      updateAthlete(updatedAthlete);
      setEditingId(null);
    }

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {athletes.map((athlete) => (
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