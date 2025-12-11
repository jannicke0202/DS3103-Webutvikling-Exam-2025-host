// src/pages/RegisterPage.tsx (or wherever your pages are)

import RegisterAthlete from "../components/athletes/RegisterAthlete";
import ImageUpload from "../components/shared/ImageUpload";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-black text-center text-gray-800 mb-4">
          Register New Athlete
        </h1>
        <p className="text-center text-xl text-gray-600 mb-12">
          Add a superstar to the transfer market
        </p>

        {/* This component already has its own form, state, and handleSubmit */}
        <RegisterAthlete />
        
      </div>
    </div>
  );
}