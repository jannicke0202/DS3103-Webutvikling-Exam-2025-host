import { SportsWorldProvider } from "../context/SportsWorldContext";
import FinancialSummary from "../components/dashboard/FinancialSummary";
import LoanSection from "../components/dashboard/LoanSection";
import AvailableAthletes from "../components/dashboard/AvailableAthletes";

const AdminPage = () => {
    return (
      <SportsWorldProvider>            
        <div className="p-10">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
  
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-4">1. Financial Overview</h2>
            <FinancialSummary />
          </div>
  
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-4">2. Get Loan</h2>
            <LoanSection />
          </div>
  
          <div>
            <h2 className="text-2xl font-bold mb-4">3. Available Athletes</h2>
            <AvailableAthletes />
          </div>
        </div>
      </SportsWorldProvider>           
    );
  };

export default AdminPage;