import axios from "axios";

const axiosIns = axios.create({
  baseURL: "https://107.189.17.31:3000",
});

export default axiosIns;
