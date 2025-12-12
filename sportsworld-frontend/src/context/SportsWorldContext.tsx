/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { type IAthlete } from "../interfaces/IAthlete";
import { type IVenue } from "../interfaces/IVenue";
import { type IFinance } from "../interfaces/IFinance";
import { type ISportsWorldContext } from "../interfaces/ISportsWorldContext";
import AthleteService from "../services/AthleteService";
import type { IDefaultResponse } from "../interfaces/ResponseInterfaces";
import axios from "axios";

export const SportsWorldContext = createContext<ISportsWorldContext | undefined>(
  undefined
);

interface SportsWorldProviderProps {
  children: ReactNode;
}

export const SportsWorldProvider = ({ children }: SportsWorldProviderProps) => {
  const [athletes, setAthletes] = useState<IAthlete[]>([]);
  const [venues, setVenues] = useState<IVenue[]>([]);
  const [finance, setFinance] = useState<IFinance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Laster inn alle data
  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [athleteResponse, financeResponse, venueResponse] = await Promise.all([
        AthleteService.getAllAthletes(),
        axios.get("http://localhost:5115/api/Finance"),
        axios.get("http://localhost:5115/api/Venue"),
      ]);

      if (athleteResponse.success && Array.isArray(athleteResponse.data)) {
        setAthletes(athleteResponse.data);
      } else {
        console.warn("No valid athlete data received:", athleteResponse);
        setAthletes([]);
      }

      setFinance(financeResponse.data);
      setVenues(venueResponse.data);
    } catch (err) {
      console.error("Network or server error:", err);
      setError(
        "Cannot connect to server. Is the backend running on http://localhost:5115?"
      );
      setAthletes([]);
      setVenues([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
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
      const financeRes = await axios.post(
        "http://localhost:5115/api/Finance/purchase",
        { price: athlete.price }
      );
      setFinance(financeRes.data);

      const togglePurchaseStatus = await AthleteService.togglePurchaseStatus(
        athleteId
      );
      if (togglePurchaseStatus.success && togglePurchaseStatus.data) {
        setAthletes((prev) =>
          prev.map((a) =>
            a.id === athleteId
              ? (togglePurchaseStatus.data as IAthlete)
              : a
          )
        );
      }
    } catch (err) {
      console.error("Purchase failed", err);
      alert("Purchase failed");
    }
  };

  // Lån – enkel frontend-variant (samme som du hadde)
  const takeLoan = async (amount: number = 500000): Promise<void> => {
    if (!finance) return;
    setFinance({
      ...finance,
      moneyLeft: finance.moneyLeft + amount,
    });
    alert(`Loan approved! +${amount.toLocaleString()} NOK`);
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

  // Oppdatere spiller
  const updateAthlete = async (updated: IAthlete): Promise<void> => {
    try {
      const res = await axios.put<IAthlete>(
        `http://localhost:5115/api/Athlete/${updated.id}`,
        updated
      );

      setAthletes((prev) =>
        prev.map((a) => (a.id === updated.id ? res.data : a))
      );
      alert("Player updated");
    } catch (err) {
      console.error("Update failed", err);
      alert("Update failed");
    }
  };

  // Lagre nytt venue
  const saveVenue = async (venue: Omit<IVenue, "id">): Promise<void> => {
    try {
      const res = await axios.post<IVenue>(
        "http://localhost:5115/api/Venue",
        venue
      );
      setVenues((prev) => [...prev, res.data]);
      alert("Venue saved");
    } catch (err) {
      console.error("Failed to save venue", err);
      alert("Failed to save venue");
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
    updateAthlete,
    purchaseAthlete,
    takeLoan,
    saveVenue,
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
