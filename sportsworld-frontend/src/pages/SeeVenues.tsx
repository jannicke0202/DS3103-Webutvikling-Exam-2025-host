import { useSportsWorld } from "../context/SportsWorldContext";
import type { IVenue } from "../interfaces/IVenue";

function SeeAllVenues() {
    const { venues, loading, error } = useSportsWorld();

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

    return (
        <main className="p-8 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">All venues</h1>
            <p className="text-sm text-gray-500 mb-6">
                Venues loaded: <strong>{venues.length}</strong>
            </p>

            {venues.length === 0 ? (
                <p>No venues registered yet.</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-3">
                    {venues.map((v: IVenue) => (
                        <div
                            key={v.id}
                            className="bg-white rounded-2xl shadow p-4 border border-gray-200"
                        >
                            <h3 className="text-xl font-semibold mb-2">{v.name}</h3>
                            <p className="text-gray-600 mb-2">Capacity: {v.capacity}</p>

                            {v.image && (
                                <img
                                    src={`http://localhost:5115/${v.image}`}
                                    alt={v.name}
                                    className="w-full h-40 object-cover rounded-xl" />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}

export default SeeAllVenues;
