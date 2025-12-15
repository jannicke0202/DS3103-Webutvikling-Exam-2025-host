import { type IVenue } from "../../interfaces/IVenue";

const VenueCard = ({
  venue,
  onDelete,
}: {
  venue: IVenue;
  onDelete: (id: number) => Promise<void>;
}) => {
  // om bilde er tilgjengelig, ellers vis placeholder
  const imageUrl = venue.image
    ? `http://localhost:5115/${venue.image}`
    : null;

  return (
    <div
      className="venue-item"
      style={{
        border: "1px solid #ddd",
        padding: "12px",
        borderRadius: "32px",
        marginBottom: "16px",
        width: "75%",
      }}
    >
      {/* Bilde av venue */}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={venue.name}
          style={{
            width: "full",
            height: "300px",
            objectFit: "cover",
            borderRadius: "16px",
            margin: "0 auto",
          }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "200px",
            backgroundColor: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
            color: "#999",
            fontSize: "18px",
            margin: "0 auto",
          }}
        >
          No photo
        </div>
      )}

      {/* Venue info */}
      <h3
        style={{
          margin: "12px 0 8px 0",
          fontSize: "20px",
          textAlign: "center",
        }}
      >
        {venue.name}
      </h3>
      <p>
        <strong>Capacity:</strong> {venue.capacity}
      </p>

      {/* Buttons */}
      <div style={{ marginTop: "16px", display: "flex", gap: "10px" }}>
        <button
          onClick={() => onDelete(venue.id!)}
          style={{
            padding: "8px 16px",
            background: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Delete venue
        </button>
      </div>
    </div>
  );
};

export default VenueCard;
