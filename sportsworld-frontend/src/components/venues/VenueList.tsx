import { useSportsWorld } from "../../context/SportsWorldContext";
import type { IVenue } from "../../interfaces/IVenue";
import VenueCard from "./VenueCard";

const VenueList = () => {
  const { venues, loading, error, deleteVenue } = useSportsWorld();

  if (loading) {
    return (
      <main className="p-8">
        <p>Loading venues...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-8">
        <p className="text-red-600">{error}</p>
      </main>
    );
  }

  if (!venues || venues.length === 0) {
    return (
      <main className="p-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">All venues</h1>
        <p>No venues registered yet.</p>
      </main>
    );
  }

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">All venues</h1>
      <p className="text-sm text-gray-500 mb-6">
        Venues loaded: <strong>{venues.length}</strong>
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        {venues.map((v: IVenue) => (
          <VenueCard
            key={v.id}
            venue={v}
            onDelete={deleteVenue}
          />
        ))}
      </div>
    </main>
  );
};

export default VenueList;
