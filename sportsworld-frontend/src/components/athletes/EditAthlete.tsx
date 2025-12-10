import { useState } from "react";
import type { IAthlete } from "../../interfaces/IAthlete";


interface Props {
  athlete: IAthlete;
  onSave: (updated: IAthlete) => void;
  onCancel: () => void;
}

const EditAthlete = ({athlete, onSave, onCancel}: Props) => {
    const [name, setName] = useState(athlete.name);
    const [price, setPrice] = useState(athlete.price.toString());

   /* const saveAthlete = () => {
        saveAthlete ({
            ...athlete,
            name: name.trim(),
            price: Number(price) || 0,
        });
    };

    

    return (
        // skal fortsette her
    )

    */

}