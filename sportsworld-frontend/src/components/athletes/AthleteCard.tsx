import { type IAthlete } from "../../interfaces/IAthlete";

interface Props {
  athlete: IAthlete;
  onEdit: (athlete: IAthlete) => void;
  onDelete: (id: number) => void;
}

export default function AthleteCard({ athlete, onEdit, onDelete }: Props) {
  // om bilde er tilgjengelig, ellers vis placeholder
  const imageUrl = athlete.image
    ? `http://localhost:5242${athlete.image}`
    : null;

  return (
    <div className="athlete-item" style={{ border: "1px solid #ddd", padding: "16px", borderRadius: "8px", marginBottom: "16px" }}>
      
      {/* Player photo */}
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={athlete.name} 
          style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }} 
        />
      ) : (
        <div style={{ 
          width: "100%", 
          height: "200px", 
          backgroundColor: "#f0f0f0", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          borderRadius: "8px",
          color: "#999",
          fontSize: "18px"
        }}>
          No photo
        </div>
      )}

      {/* Player info */}
      <h3 style={{ margin: "12px 0 8px 0", fontSize: "20px" }}>
        {athlete.name}
      </h3>
      <p><strong>Price:</strong> {athlete.price.toLocaleString()} NOK</p>
      <p><strong>Status:</strong> {athlete.purchaseStatus ? "Bought" : "Available"}</p>
      <p><strong>Gender:</strong> {athlete.gender}</p>

      {/* Buttons */}
      <div style={{ marginTop: "16px", display: "flex", gap: "10px" }}>
        <button 
          onClick={() => onEdit(athlete)}
          style={{ padding: "8px 16px", background: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(athlete.id!)}
          style={{ padding: "8px 16px", background: "#dc3545", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}