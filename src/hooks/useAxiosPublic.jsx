import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "https://12-study-platform-server.vercel.app",
  });

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;