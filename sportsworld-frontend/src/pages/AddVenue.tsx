// src/pages/AddVenue.tsx
import { useState, type FormEvent } from "react";
import { useSportsWorld } from "../context/SportsWorldContext";
import ImageUpload from "../components/shared/ImageUpload";

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
            setError("Name, capacity and image are required");
            return;
        }

        const response = await saveVenue({
            name: name.trim(),
            capacity: capacity.trim(),
            image: image.trim(),
        });

        if (!response.success) {
            setError(response.message ?? "Failed to save venue");
            return;
        }

        setSuccess("Venue saved");
        setName("");
        setCapacity("");
        setImage("");
    };


    return (
        <main className="p-8 max-w-xl mx-auto">
            <h1 className="text-5xl font-black text-center text-gray-800 mb-4">Add a venue</h1>
            <p className="text-center text-xl text-gray-600 mb-12">
                Add a new venue
            </p>
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
            <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-2xl mx-auto border border-gray-200">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    Register New Venue
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>

                        <input
                            className="w-full px-5 py-4 border rounded-xl text-lg"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Venue name" />
                    </div>

                    <div>

                        <input
                            className="w-full px-5 py-4 border rounded-xl text-lg"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                            placeholder="Capacity" />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-xl rounded-xl hover:from-green-700 hover:to-emerald-700 transition cursor-pointer"
                    > Save venue
                    </button>
                    <div className="my-8">
                        <ImageUpload onImageSelected={setImage} />
                    </div>
                </form>
            </div>
        </main>
    );
}

export default AddVenue;

