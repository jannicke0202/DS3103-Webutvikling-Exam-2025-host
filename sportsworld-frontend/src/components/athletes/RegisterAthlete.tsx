import { useState } from "react";
import { useSportsWorld } from "../../context/SportsWorldContext";
import ImageUpload from "../shared/ImageUpload";

export default function RegisterAthlete() {
  const { saveAthlete } = useSportsWorld();

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState("");
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !price || Number(price) <= 0) {
      alert("Please fill in all fields correctly");
      return;
    }
    if (!selectedImage) {
      alert("Please upload an image");
      return;
    }

    setIsLoading(true);

    const result = await saveAthlete({
      name: name.trim(),
      gender,
      price: Number(price),
      purchaseStatus: false,
      image: selectedImage,
    });

    setIsLoading(false);

    if (result.success) {
      setName("");
      setPrice("");
      setGender("");
      setSelectedImage("");
      alert("Athlete successfully registered!");
    } else {
      alert("Failed to register athlete");
    }
  };



  return (
    <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-2xl mx-auto border border-gray-200">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Register New Athlete
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-5 py-4 border rounded-xl text-lg"
          required
          disabled={isLoading}
        />

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full px-5 py-4 border rounded-xl text-lg"
          disabled={isLoading}
        >
          <option>Choose a gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <input
          type="number"
          placeholder="Price in £"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-5 py-4 border rounded-xl text-lg"
          required
          min="1"
          disabled={isLoading}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-xl rounded-xl hover:from-green-700 hover:to-emerald-700 transition cursor-pointer"
        >
          {isLoading ? "Saving..." : "Add to Transfer List"}
        </button>
        <div className="my-8">
          <ImageUpload onImageSelected={setSelectedImage} />
        </div>
      </form>
    </div>
  );
}