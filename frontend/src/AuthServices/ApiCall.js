import axios from "axios"

export const GetApiCall = async (endPoint, payload) => {
  try {
    const response = axios.get(`${import.meta.env.VITE_API_URL}${endPoint}`, {
      params: payload
    })
    return response;
  }
  catch (err) {
    console.log("get erro ::", err);
  }
}
export const PostApiCall = async (endPoint, payload = {}, headers = {}) => {
  try {
    console.log("log of postadata::", payload);
    console.log("log of postadata::1", import.meta.env.VITE_API_URL+endPoint);

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}${endPoint}`,
      payload,
      { headers, withCredentials: true }
      // { headers }
    );
    return response.data; // Return only the data (optional)
  } catch (error) {
    console.error("POST API Error:", error);
    throw error; // Let caller handle it
  }
};
