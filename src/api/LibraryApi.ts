import axios from "axios";

const LibraryApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_LIBRARY_SERVICE_URL}`,
  timeout: 60000 * 3,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export default LibraryApi;
