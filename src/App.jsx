import "./App.css";
import "./index.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Services from "./Pages/Services/Services";
import Package from "./Pages/Package/Package";
import Contact from "./Pages/Contact/Contact";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <>
      <Navbar />
      <div id="home">
        <Home />
      </div>
      <div id="about us">
        <About />
      </div>
      <div id="services">
        <Services />
      </div>
      <div id="packages">
        <Package />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <Footer />
    </>
  );
}

export default App;
