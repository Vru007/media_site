import axios from "axios";

export const uploadMedia = async (file, cuser) => {
  try {
    const email=cuser.email
    const formData = new FormData();
    formData.append("file", file);
    formData.append("uemail", email);

    const response = await axios.post('http://localhost:8080/media/upload', formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};


export const fetchAllMedia = async () => {
  try {
    const response = await axios.get('http://localhost:8080/media/all');
    return response.data;
  } catch (error) {
    console.error("Error fetching media:", error);
    throw error;
  }
};

export const fetchMediaByUser = async (user) => {
  try {
    const token=user.token;
    const response = await axios.get(`http://localhost:8080/media/user/${token}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user-specific media:", error);
    throw error;
  }
};


export const deleteMedia = async (mediaId) => {
  try {
    const response = await axios.post(`http://localhost:8080/media/delete/${mediaId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting media:", error);
    throw error;
  }
};
