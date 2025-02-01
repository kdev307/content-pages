import AboutUs from "../components/AboutUs";
import Clients from "../components/Clients";
import Features from "../components/Features";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Service from "../components/Service";

function Home() {
    return (
        <div>
            <Header />
            <Hero />
            <Clients />
            <Features />
            <AboutUs />
            <Service />
        </div>
    );
}

export default Home;
