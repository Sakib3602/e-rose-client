import axios from "axios";

 
 const axiosSec = axios.create({
    baseURL: "http://localhost:3000"
    // baseURL: "https://e-rose-server.onrender.com"
 })

const useAxiosSec = () => {
    return axiosSec;
}

export default useAxiosSec;