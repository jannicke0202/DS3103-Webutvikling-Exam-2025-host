import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { type IAthlete } from "../interfaces/IAthlete";
import { type IVenue } from "../interfaces/IVenue";
import { type IFinance } from "../interfaces/IFinance";
import { type ISportsWorldContext } from "../interfaces/ISportsWorldContext";
import AthleteService from "../services/AthleteService";
import type { IDefaultResponse } from "../interfaces/ResponseInterfaces";
import axios from "axios";

// legge til andre services når de er ferdig

export const SportsWorldContext = createContext<ISportsWorldContext | undefined>(undefined);

interface SportsWorldProviderProps {
  children: ReactNode;
}

export const SportsWorldProvider = ({ children }: SportsWorldProviderProps) => {
  const [athletes, setAthletes] = useState<IAthlete[]>([]);
  const [venues, setVenues] = useState<IVenue[]>([]);
  const [finance, setFinance] = useState<IFinance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Laster inn all data
  const loadData = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const athleteResponse = await AthleteService.getAllAthletes();
  
      if (athleteResponse.success && Array.isArray(athleteResponse.data)) {
        setAthletes(athleteResponse.data);
      } else {
        console.warn("No valid athlete data received:", athleteResponse);
        setAthletes([]);
      }
  
      // Legger til venues / finances senere
      // const [athleteRes, venueRes, financeRes] = await Promise.all([...]);
      // samme sjekk for alle
  
    } catch (err: any) {
      console.error("Network or server error:", err.message);
      setError("Cannot connect to server. Is the backend running on http://localhost:5115?");
      setAthletes([]); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const purchaseAthlete = async (athleteId: number): Promise<void> => {
    const athlete = athletes.find(a => a.id === athleteId);
    if (!athlete || !finance) return;
  
    if (finance.moneyLeft < athlete.price) {
      alert("Not enough money!");
      return;
    }
  
    try {
      // Fjerne penger fra backend
      const res = await axios.post("http://localhost:5115/api/Finance/Purchase", {
        price: athlete.price
      });
      setFinance(res.data);
  
      // Endre status på om spiller er kjøpt
      const toggleStatus = await AthleteService.togglePurchaseStatus(athleteId);
      
      if (toggleStatus.success && toggleStatus.data) {

        setAthletes(prev => prev.map(a => 
          a.id === athleteId ? (toggleStatus.data as IAthlete) : a
        ));
      }
    } catch (err) {
      alert("Purchase failed");
    }
  };
  
  const takeLoan = async (amount: number = 500000): Promise<void> => {
    if (!finance) return;
    setFinance({
      ...finance,
      moneyLeft: finance.moneyLeft + amount
    });
    alert(`Loan approved! +${amount.toLocaleString()} NOK`);
  };

  const saveAthlete = async (newAthlete: Omit<IAthlete, "id">): Promise<IDefaultResponse> => { // Omit er gi å få alle felt fra IAthlete utenom id, pga backend genererer det
    try {
      const response = await AthleteService.postAthlete(newAthlete);
      if (response.success && response.data) {
        setAthletes(prev => [response.data!, ...prev]) // ! pga backend alltid skal generere id
      }
      return response;
    } catch (err) {
      return { success: false, message: "Failed to save athlete" };
    }
  };

  const getAthleteQuantity = () => athletes.length;

  const value: ISportsWorldContext = {
    athletes,
    venues,
    finance,
    loading,
    error,
    saveAthlete,
    deleteAthlete: async () => ({ success: false, message: "Coming soon" }),
    purchaseAthlete: async () => ({ success: false, message: "Coming soon" }),
    takeLoan,
    saveVenue: async () => ({ success: false, message: "Coming soon" }),
    getAthleteQuantity,
  };

  return (
    <SportsWorldContext.Provider value={value}>
      {children}
    </SportsWorldContext.Provider>
  );
};

export const useSportsWorld = (): ISportsWorldContext => {
  const context = useContext(SportsWorldContext);
  if (!context) {
    throw new Error("useSportsWorld must be used within SportsWorldProvider");
  }
  return context;
};