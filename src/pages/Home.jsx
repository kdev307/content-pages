import AboutUs from "../components/AboutUs";
import Blogs from "../components/Blogs";
import CaseStudy from "../components/CaseStudy";
import Clients from "../components/Clients";
import ContactUs from "../components/ContactUs";
import Features from "../components/Features";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Numbers from "../components/Numbers";
import Service from "../components/Service";
import Testimonials from "../components/Testimonials";

function Home() {
    return (
        <div>
            <Header />
            <Hero />
            <Clients />
            <Features />
            <AboutUs />
            <Service />
            <Numbers />
            <CaseStudy />
            <Testimonials />
            <ContactUs />
            <Blogs />
        </div>
    );
}

export default Home;
