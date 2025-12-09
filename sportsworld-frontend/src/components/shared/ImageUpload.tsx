import { useState, type ChangeEvent } from "react";
import ImageUploadService from "../../services/ImageUploadService";

const ImageUpload = () => {
    const [image, setImage] = useState<File | null>(null);

    const setImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files != null) {
            const file = files[0];
            setImage(file);
        }
    }

    const uploadImage = () => {
        if (image != null) {
            ImageUploadService.uploadImage(image);
        }
    }

    return (
        <section>
            <h3>Last opp et bilde</h3>
            <label>Bilde</label>
            <input onChange={setImageHandler} type="file" />
            <button onClick={uploadImage}>Last opp bilde</button>
        </section>
    )
}

export default ImageUpload;