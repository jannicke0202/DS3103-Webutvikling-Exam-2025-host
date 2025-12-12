// src/pages/AddVenue.tsx
import { useState, type FormEvent } from "react";
import { useSportsWorld } from "../context/SportsWorldContext";

function AddVenue() {
    const { saveVenue } = useSportsWorld();

    const [name, setName] = useState("");
    const [capacity, setCapacity] = useState("");
    const [image, setImage] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!name.trim() || !capacity.trim()) {
            setError("Name and capacity are required");
            return;
        }

        await saveVenue({
            name: name.trim(),
            capacity: Number(capacity.trim),
            image: image.trim(),
        });

        setSuccess("Venue saved");
        setName("");
        setCapacity("");
        setImage("");
    };

    return (
        <main className="p-8 max-w-xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Add a venue</h1>

            {error && (
                <div className="mb-4 rounded bg-red-100 text-red-700 px-4 py-2">
                    {error}
                </div>
            )}
            {success && (
                <div className="mb-4 rounded bg-green-100 text-green-700 px-4 py-2">
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm mb-1">Name</label>
                    <input
                        className="w-full border rounded px-3 py-2"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Old Trafford" />
                </div>

                <div>
                    <label className="block text-sm mb-1">Capacity</label>
                    <input
                        className="w-full border rounded px-3 py-2"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        placeholder="75000" />
                </div>

                <div>
                    <label className="block text-sm mb-1">Image path (optional)</label>
                    <input
                        className="w-full border rounded px-3 py-2"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="image/oldtrafford.jpg" />
                </div>

                <button
                    type="submit"
                    className="mt-4 w-full py-3 bg-blue-600 text-white font-semibold rounded"
                >
                    Save venue
                </button>
            </form>
        </main>
    );
}

export default AddVenue;