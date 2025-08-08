import { AuthContext } from "@/components/loginRegistration_work/AuthProvider/AuthProvider";
import { useContext } from "react";
import { Navigate, useLocation} from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateUserRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const auth = useContext(AuthContext);
  
  const location = useLocation();

  if (!auth) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { person, loading } = auth;

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 text-[#761A24] relative">
          <div className="absolute inset-0 bg-current rounded-full opacity-50 animate-ping"></div>
          <div className="absolute inset-2 bg-current rounded-full"></div>
        </div>
      </div>
    );
  }

  // If no user is authenticated, redirect to login
  if (!person) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // If user is authenticated, render the protected content
  return <>{children}</>;
};

export default PrivateUserRoute;
