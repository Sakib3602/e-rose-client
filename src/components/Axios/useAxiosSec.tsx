import axios from "axios";

 
 const axiosSec = axios.create({
    baseURL: "http://localhost:3000"
 })

const useAxiosSec = () => {
    return axiosSec;
}

export default useAxiosSec;