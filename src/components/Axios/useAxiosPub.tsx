import axios from "axios";

 
 const axiosPublic = axios.create({
    baseURL: "http://localhost:3000"
    // baseURL: "https://e-rose-server.onrender.com"
 })

const useAxiosPub = () => {
    return axiosPublic;
}

export default useAxiosPub;