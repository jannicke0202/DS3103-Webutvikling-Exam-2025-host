import { useState, type ChangeEvent } from "react";
import ImageUploadService from "../../services/ImageUploadService";

const ImageUpload = ({ onImageSelected} : { onImageSelected: (file: File | null) => void}) => {
    const [image, setImage] = useState<File | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        onImageSelected(file);
    }

    return (
        <section className="text-center my-6">
          <h3 className="text-lg font-medium mb-3">Last opp et bilde</h3>
          <input 
            className="block mx-auto text-2xl border-1 w-60" 
            onChange={handleChange} 
            type="file" 
            accept="image/*" 
          />
          {image && <p className="text-green-600 mt-2">Valgt: {image.name}</p>}
        </section>
      );
    }
export default ImageUpload;