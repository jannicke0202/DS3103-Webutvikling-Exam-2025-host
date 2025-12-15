import RegisterAthlete from "../components/athletes/RegisterAthlete";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-black text-center text-gray-800 mb-4">
          Register New Athlete
        </h1>
        <p className="text-center text-xl text-gray-600 mb-12">
          Add a new athlete
        </p>
        <RegisterAthlete />
      </div>
    </div>
  );
}