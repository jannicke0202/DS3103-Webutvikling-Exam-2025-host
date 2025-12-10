import { SportsWorldProvider } from "../context/SportsWorldContext";
import FinancialSummary from "../components/dashboard/FinancialSummary";
import LoanSection from "../components/dashboard/LoanSection";
import AvailableAthletes from "../components/dashboard/AvailableAthletes";

const AdminPage = () => {
    return (
  <SportsWorldProvider>
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Admin Dashboard
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        <div className="space-y-10">
          
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Financial Summary
            </h2>
            <FinancialSummary />
          </div>

          
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Get Loan
            </h2>
            <LoanSection />
          </div>
        </div>

        
        <div className="lg:col-span-2 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">
              Available Athletes
            </h2>
            <AvailableAthletes />
          </div>
        </div>
      </div>
    </div>
  </SportsWorldProvider>
);
  };

export default AdminPage;