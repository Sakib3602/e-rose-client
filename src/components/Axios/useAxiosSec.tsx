import axios from "axios";

 
 const axiosSec = axios.create({
    baseURL: "http://localhost:3000"
    // baseURL: import.meta.env.VITE_BASE_URL
 })

const useAxiosSec = () => {
    return axiosSec;
}

export default useAxiosSec;