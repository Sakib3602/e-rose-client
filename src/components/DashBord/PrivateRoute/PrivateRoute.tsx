import useAxiosSec from "@/components/Axios/useAxiosSec";
import { AuthContext } from "@/components/loginRegistration_work/AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoute = (children: React.ReactNode) => {
    const auth = useContext(AuthContext);
     const location = useLocation()
      if (!auth) {
        throw new Error("AuthContext must be used within an AuthProvider");
      }
    
      const { person, loading } = auth;
      console.log(person?.email,"private route")
      const axiosSec = useAxiosSec()
      const {data} = useQuery({
        queryKey : ["userData"],
        queryFn : async()=>{
            const res = await axiosSec.get(`/user/${person?.email}`)
            return res.data;
        }
      })
      console.log(data?.role,"private route data")
      if(loading) return <h1>loadimnnnnnnnnnnnnnnnnn</h1>
      if(person && data?.role === "admin"){
        return children;
      }
      return <Navigate to={"/"} state={location.pathname} ></Navigate>; 

};

export default PrivateRoute;