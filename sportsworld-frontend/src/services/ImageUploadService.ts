import axios from "axios";

const endpoint = "http://localhost:5115/api/ImageUpload";

const uploadImage = async (image: File) => {
    const formData = new FormData();
    formData.append("file", image);

    const response = await axios.post(endpoint, formData);

    return response.data;
}

export default {uploadImage};