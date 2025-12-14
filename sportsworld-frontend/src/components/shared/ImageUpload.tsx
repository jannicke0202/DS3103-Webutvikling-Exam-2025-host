import { useState, type ChangeEvent } from "react";
import ImageUploadService from "../../services/ImageUploadService";

interface ImageUploadProps {
  onImageSelected: (fileUrl: string) => void;
}

const ImageUpload = ({ onImageSelected }: ImageUploadProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    setImage(file);
    setStatus("Uploading image...");

    try {
      const result = await ImageUploadService.uploadImage(file);

      onImageSelected(result.url);

      setStatus("Uploaded!");
    } catch (err) {
      console.error(err);
      setStatus("Error uploading image");
    }
  };

  return (
    <section className="text-center my-6">
      <h3 className="text-lg font-medium mb-3">Last opp et bilde</h3>

      <input
        className="block mx-auto text-2xl border-1 w-60"
        type="file"
        accept="image/*"
        onChange={handleChange}
      />

      {image && <p className="text-green-600 mt-2">Chosen: {image.name}</p>}
      {status && <p className="mt-2">{status}</p>}
    </section>
  );
};

export default ImageUpload;