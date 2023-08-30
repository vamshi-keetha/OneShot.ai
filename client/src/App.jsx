import Navbar from "./components/Navbar";
import MainRoutes from "./components/AllRoutes/MainRoutes";
import "./styles/scss/main.scss";

function App() {
  return (
    <>
      <div>
        <Navbar />
        <MainRoutes />
      </div>
    </>
  );
}

export default App;
