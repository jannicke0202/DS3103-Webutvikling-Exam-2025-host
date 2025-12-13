import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { type IAthlete } from "../interfaces/IAthlete";
import { type IVenue } from "../interfaces/IVenue";
import { type IFinance } from "../interfaces/IFinance";
import { type ISportsWorldContext } from "../interfaces/ISportsWorldContext";
import AthleteService from "../services/AthleteService";
import VenueService from "../services/VenueService";
import FinanceService from "../services/FinanceService";
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
      // kalle på venues
      const venueResponse = await VenueService.getAllVenues();
      if (venueResponse.success && Array.isArray(venueResponse.data)){
        setVenues(venueResponse.data);
      } 

      // Kalle på athletes
      const athleteResponse = await AthleteService.getAllAthletes();
      if (athleteResponse.success && Array.isArray(athleteResponse.data)) {
        setAthletes(athleteResponse.data);
      } 
  
      // kalle på finance
      const financeResponse = await FinanceService.getFinance();
      if (financeResponse.success && financeResponse.data) {
        setFinance(financeResponse.data)
      } 
      
  
    } catch (err: any) {
    console.log("Network or server error:", err.message); 
    setError("Failed to load data");
    // Error → also turn off loading
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

      const purchaseResponse = await axios.post(`http://localhost:5115/api/Finance/purchase/${athlete.price}`, {
        Price: athlete.price
      });

      if (purchaseResponse.data) {
        setFinance(purchaseResponse.data);
        alert("Player bought")
      } 
  } catch (err) {
        alert("purchase failed");
      }
    };
  
  
  const takeLoan = async (amount: number = 1000000): Promise<void> => {
    if (!finance) return;
    
    try {
      const loanResponse = await axios.post(
        `http://localhost:5115/api/Finance/loan/${amount}`
      );

      if (loanResponse.data) {
        setFinance(loanResponse.data);
        alert(`Funds boosted to your account! + £ ${amount.toLocaleString()} added`)
      }
    } catch (err) {
      alert("Could not loan you more funds");
    }
  }

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
    loadData
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
}
