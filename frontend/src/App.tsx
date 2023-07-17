import "./App.css";
import MainContainer from "./Components/MainContainer/MainContainer";
import { NavBar } from "./Components/NavBar/NavBar";

// TODO -> Remove this component + other residual interfaces, files, etc.
function App() {
  return (
    <>
      <NavBar />
      <MainContainer />;
    </>
  );
}

export default App;
