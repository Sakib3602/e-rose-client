import Regular from "./components/AllProduct/Regular";
import Tranding from "./components/AllProduct/Trending";
import FAQ from "./components/FAQ/FAQ";
import Footer from "./components/Footer/Footer";
import LandingPage from "./components/LandingPage/LandingPge";
import Nav from "./components/Nav/Nav";
import Only_Sm_Show from "./components/Nav/Only_Sm_Show";

function App() {
  return (
    <>
      <div className=" bg-[#761A24] h-10 w-full flex items-center justify-center text-white">
        <h1 className="">Flat 10% discount</h1>
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
