import AboutUs from "../components/AboutUs";
import Clients from "../components/Clients";
import Features from "../components/Features";
import Hero from "../components/Hero";

function Home() {
    return (
        <div>
            <Hero />
            <Clients />
            <Features />
            <AboutUs />
        </div>
    );
}

export default Home;
