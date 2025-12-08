import type { JSX } from "react";
import { type IAthlete } from "../../interfaces/IAthlete";

interface Props {
    athlete: IAthlete
    onEdit: (athlete: IAthlete) => void
    onDelete: (id: number) => void
}

const AthleteItem = ({ athlete, onEdit, onDelete} : Props): JSX.Element => {
    const getImageUrl = (imagePath: string | null) => {
        if (!imagePath) return null;
        return `http://localhost:5242${imagePath}`;
    };

    const imageUrl = getImageUrl(athlete.Image);

    return (
        <div className="athlete-item">
            {/* JSX */}
            {imageUrl ? (
                <img src={imageUrl} alt={`${athlete.Name}'s picture`} />
            ) : (
                <div className="placeholder-image">No photo</div>
            )}

            {/* Basic info */}
            <h3>{athlete.Name}</h3>
            <p>Price: {athlete.Price}</p>
            <p>{athlete.PurchaseStatus}</p>
            <p>{athlete.Gender}</p>

            {/* Funksjonsknapper i card*/}
            <div className="actions">
                <button onClick={() => onEdit(athlete)}>Edit</button>
                <button onClick={() => onDelete(athlete.id!)}>Delete</button>
            </div>

        </div>
    );

}

export default AthleteItem