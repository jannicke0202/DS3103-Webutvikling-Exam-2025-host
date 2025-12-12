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

      // ✅ DETTE ER HELE POENGET
      // result.url = "/images/athletes/filnavn.jpg"
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


// interface ImageUploadProps {// hva er det her
//   onImageSelected: (fileUrl: string) => void;
// }

// const ImageUpload = () => {
//   const [image, setImage] = useState<File | null>(null);
//   const [status, setStatus] = useState("");

//   const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;
//     if (!file) return;

//     setImage(file);
//     setStatus("Uploding image");

//     try {
//       const result = await ImageUploadService.uploadImage(file);
//       setStatus("Uploaded!");
//       onImageSelected(result.url);
//     } catch (err) {
//       console.error(err);
//       setStatus("Error uploading image");
//     }
//   };

//   return (
//     <section className="text-center my-6">
//       <h3 className="text-lg font-medium mb-3">Last opp et bilde</h3>

//       <input
//         className="block mx-auto text-2xl border-1 w-60"
//         type="file"
//         accept="image/*"
//         onChange={handleChange}
//       />

//       {image && <p className="text-green-600 mt-2">Chosen: {image.name}</p>}
//       {status && <p className="mt-2">{status}</p>}
//     </section>
//   );
// };

// export default ImageUpload;

// const ImageUpload = ({ onImageSelected }: { onImageSelected: (file: File | null) => void }) => {
//   const [image, setImage] = useState<File | null>(null);
//   const [uploadStatus, setUploadStatus] = useState("");

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;
//     onImageSelected(file);
//     setImage(file);

//     if (!file) return;

//     const formData = new FormData();
//         formData.append("file", file);

//         try {
//             setUploadStatus("Laster opp...");
//             const response = await ImageUploadService.upload(formData);
//             setUploadStatus("Opplastet!");
//         } catch (error) {
//             console.error(error);
//             setUploadStatus("Feil under opplasting");
//         }
//   }

//   return (
//     <section className="text-center my-6">
//       <h3 className="text-lg font-medium mb-3">Last opp et bilde</h3>
//       <input
//         className="block mx-auto text-2xl border-1 w-60"
//         onChange={handleChange}
//         type="file"
//         accept="image/*"
//       />
//       {image && <p className="text-green-600 mt-2">Valgt: {image.name}</p>}
//     </section>
//   );
// }
// export default ImageUpload;