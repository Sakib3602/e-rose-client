import { Link } from "react-router-dom";
import Regular from "./components/AllProduct/Regular";
import Tranding from "./components/AllProduct/Trending";
import FAQ from "./components/FAQ/FAQ";
import Footer from "./components/Footer/Footer";
import LandingPage from "./components/LandingPage/LandingPge";
import Nav from "./components/Nav/Nav";
import Only_Sm_Show from "./components/Nav/Only_Sm_Show";
import { useContext } from "react";
import { AuthContext } from "./components/loginRegistration_work/AuthProvider/AuthProvider";
import { toast } from "react-toastify";

function App() {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("AuthContext must be used inside AuthProvider");
  }

  const { person,out } = auth;
  const x = ()=>{
    out()
    .then(()=>{
      toast.success("log out done")
    })
  }
  return (
    <>
      <div className=" bg-[#761A24] h-8 w-full flex items-center justify-center md:justify-between lg:justify-between text-white pop400 ">
        {/* <h1 className="">Flat 10% discount</h1> */}
        {person ? (
          <h1 onClick={x} className="md:mx-4 lg:mx-4 cursor-pointer">Log out</h1>
          
        ) : (
          <Link to={"/register"}>
            <h1 className="md:mx-4 lg:mx-4">Free Login / Registration</h1>
          </Link>
        )}
        <h1 className="hidden md:block lg:block md:mx-4 lg:mx-4">Facebook</h1>
      </div>

      <div
        className=" lg:px-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(0,0,0,0.08) 1px, transparent 0),
            radial-gradient(circle at 2px 2px, rgba(0,0,0,0.05) 1px, transparent 0)
          `,
          backgroundSize: "20px 20px, 40px 40px",
        }}
      >
        <Nav></Nav>
        <LandingPage></LandingPage>
        <Tranding></Tranding>
        <Regular></Regular>
        <FAQ></FAQ>
        <Only_Sm_Show></Only_Sm_Show>
      </div>
      <Footer></Footer>
    </>
  );
}

export default App;
