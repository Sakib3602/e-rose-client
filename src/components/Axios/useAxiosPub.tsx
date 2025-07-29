import axios from "axios";

 
 const axiosPublic = axios.create({
    baseURL: "http://localhost:3000"
 })

const useAxiosPub = () => {
    return axiosPublic;
}

export default useAxiosPub;