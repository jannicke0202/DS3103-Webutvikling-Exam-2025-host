import axios from "axios";

const endpoint = "http://localhost:5115/api/imageUpload";

const uploadImage = async (image: File) => {
    const formData = new FormData();
    formData.append("file", image);

    const response = await axios({
        url: endpoint,
        method: "POST",
        data: formData,
        headers: { "hasContentType": "multipart/form-data" }
    });

    formData.delete("file");
}

export default {uploadImage};