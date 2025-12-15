import {createContext, useContext, useState, useEffect, type ReactNode,} from "react";
import { type IAthlete } from "../interfaces/IAthlete";
import { type IVenue } from "../interfaces/IVenue";
import { type IFinance } from "../interfaces/IFinance";
import { type ISportsWorldContext } from "../interfaces/ISportsWorldContext";
import AthleteService from "../services/AthleteService";
import VenueService from "../services/VenueService";
import FinanceService from "../services/FinanceService";
import type { IDefaultResponse } from "../interfaces/ResponseInterfaces";
import axios from "axios";

/* eslint-disable react-refresh/only-export-components */
export const SportsWorldContext =
  createContext<ISportsWorldContext | undefined>(undefined);


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
  const loadData = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      // venues
      const venueResponse = await VenueService.getAllVenues();
      if (venueResponse.success && Array.isArray(venueResponse.data)) {
        setVenues(venueResponse.data);
      } else {
        setVenues([]);
      }

      // athletes
      const athleteResponse = await AthleteService.getAllAthletes();
      if (athleteResponse.success && Array.isArray(athleteResponse.data)) {
        setAthletes(athleteResponse.data);
      } else {
        setAthletes([]);
      }

      // finance
      const financeResponse = await FinanceService.getFinance();
      if (financeResponse.success && financeResponse.data) {
        setFinance(financeResponse.data);
      } else {
        setFinance(null);
      }
    } catch (err) {
      console.log("Network or server error:", err);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  // Kjøp spiller
  const purchaseAthlete = async (athleteId: number): Promise<void> => {
    const athlete = athletes.find((a) => a.id === athleteId);
    if (!athlete || !finance) return;

    if (finance.moneyLeft < athlete.price) {
      alert("Not enough money!");
      return;
    }

    try {
      
      const togglePurchaseStatus = await AthleteService.togglePurchaseStatus(
        athleteId
      );
      if (togglePurchaseStatus.success && togglePurchaseStatus.data) {
        setAthletes((prev) =>
          prev.map((a) =>
            a.id === athleteId ? (togglePurchaseStatus.data as IAthlete) : a
          )
        );
      }

      // oppdaterer Finance
      const purchaseResponse = await axios.post(
        `http://localhost:5115/api/Finance/purchase/${athlete.price}`,
        { price: athlete.price }
      );

      if (purchaseResponse.data) {
        setFinance(purchaseResponse.data);
        alert(
          `${athlete.name} has been purchased for £${athlete.price.toLocaleString()}!`
        );
      }
    } catch (err) {
      console.error("Purchase failed", err);
      alert("purchase failed");
    }
  };

  // Lån
  const takeLoan = async (amount: number = 1_000_000): Promise<void> => {
    if (!finance) return;

    if (amount <= 0) {
      alert("Please write more than £ 0");
      return;
    }

    try {
      const loanResponse = await axios.post(
        `http://localhost:5115/api/Finance/loan/${amount}`
      );

      if (loanResponse.data) {
        setFinance(loanResponse.data);
        alert(
          `Funds boosted to your account! + £ ${amount.toLocaleString()} added`
        );
      }
    } catch (err) {
      console.error("Loan failed", err);
      alert("Invalid amount");
    }
  };

  // Lagre ny spiller
  const saveAthlete = async (
    newAthlete: Omit<IAthlete, "id">
  ): Promise<IDefaultResponse> => {
    try {
      const response = await AthleteService.postAthlete(newAthlete);
      if (response.success && response.data) {
        setAthletes((prev) => [response.data!, ...prev]);
      }
      return response;
    } catch (err) {
      console.error("Failed to save athlete", err);
      return { success: false, message: "Failed to save athlete" };
    }
  };

  // Lagre nytt venue
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

  // Slette spiller
  const deleteAthlete = async (id: number): Promise<void> => {
    if (!confirm("Are you sure you want to delete this player?")) return;

    try {
      await AthleteService.deleteAthlete(id);
      setAthletes((prev) => prev.filter((a) => a.id !== id));
      alert("Player deleted!");
    } catch (err) {
      console.error("Delete failed", err);
      alert("Delete failed");
    }
  };

  // Slette venue
   const deleteVenue = async (id: number): Promise<void> => {
    if (!confirm("Are you sure you want to delete this venue?")) return;

    try {
      const response = await VenueService.deleteVenue(id);

      if (!response.success) {
        alert(response.message ?? "Could not delete venue");
        return;
      }

      setVenues((prev) => prev.filter((v) => v.id !== id));
      alert("Venue deleted");
    } catch (err) {
      console.error("Delete venue failed", err);
      alert("Delete failed");
    }
  };


  // Oppdatere spiller
  const updateAthlete = async (
    updatedAthlete: IAthlete
  ): Promise<IDefaultResponse> => {
    try {
      const response = await AthleteService.putAthlete(updatedAthlete);

      if (response.success && response.data) {
        setAthletes((prev) =>
          prev.map((a) =>
            a.id === updatedAthlete.id ? response.data! : a
          )
        );
      }

      return response;
    } catch (err) {
      console.error("Failed to update athlete", err);
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
    deleteVenue,
    getAthleteQuantity,
    updateAthlete,
    loadData,
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
