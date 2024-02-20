import axios from "axios";

const createData = async (path, dataToSend) => {
  const apiEndPoint = import.meta.env.VITE_API_ENDPOINT;
  try {
    const response = await axios.post(
      `${apiEndPoint}${path}`,
      dataToSend
    );
    // if (!response?.data?.error) return response.data;
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};
const getAllData = async (path, dataToSend) => {
  const apiEndPoint = import.meta.env.VITE_API_ENDPOINT;
  try {
    const response = await axios.get(
      `${apiEndPoint}${path}`
    );
    // if (!response?.data?.error) return response.data;
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

export { createData, getAllData };
