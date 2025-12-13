import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { type IAthlete } from "../interfaces/IAthlete";
import { type IVenue } from "../interfaces/IVenue";
import { type IFinance } from "../interfaces/IFinance";
import { type ISportsWorldContext } from "../interfaces/ISportsWorldContext";
import AthleteService from "../services/AthleteService";
import type { IDefaultResponse } from "../interfaces/ResponseInterfaces";
import axios from "axios";
import VenueService from "../services/VenueService";

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
  
      const financeResponse = await axios.get("http://localhost:5115/api/Finance");
      setFinance(financeResponse.data);
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
      // endring av status, penger og antall kjøp

      const togglePurchaseStatus = await AthleteService.togglePurchaseStatus(athleteId);
      if (togglePurchaseStatus.success && togglePurchaseStatus.data) {
        setAthletes( prev => 
          prev.map(a => (a.id === athleteId ? togglePurchaseStatus.data as IAthlete : a))
        );
      }

      setFinance(prev => ({
        ...prev!,
        moneyLeft: prev!.moneyLeft - athlete.price,
        moneySpent: prev!.moneySpent + athlete.price,
        numberOfPurchases: prev!.numberOfPurchases +1,
      }));
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

  const saveVenue = async (
  venue: Omit<IVenue, "id">
): Promise<IDefaultResponse> => {
  try {
    const res = await axios.post<IVenue>(
      "http://localhost:5115/api/Venue",
      venue
    );
    setVenues((prev) => [...prev, res.data]);
    return { success: true, message: "Venue saved" };
  } catch (err) {
    console.error("Failed to save venue", err);
    return { success: false, message: "Failed to save venue" };
  }
};


  // Add this function in your context
  const deleteAthlete = async (id: number): Promise<void> => {
    if (!confirm("Are you sure you want to delete this player?")) return;
  
    try {
      await AthleteService.deleteAthlete(id); 
      setAthletes(prev => prev.filter(a => a.id !== id));
      alert("Player deleted!");
    } catch (err) {
      alert("Delete failed");
    }
  };
  
  // EDIT ATHLETE FUNKSJON ETTERHVERT

  const updateAthlete = async (updatedAthlete: IAthlete): Promise<IDefaultResponse> => {
  try {
    const response = await AthleteService.putAthlete(updatedAthlete);
    
    if (response.success && response.data) {
      setAthletes(prev => 
        prev.map(a => a.id === updatedAthlete.id ? response.data! : a)
      );
    }

    return response;
  } catch (err) {
    return { success: false, message: "Failed to update athlete" };
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
    deleteAthlete,
    purchaseAthlete,
    takeLoan,
    saveVenue,
    getAthleteQuantity,
    updateAthlete,
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