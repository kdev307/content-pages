import Home from "./pages/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BlogPage from "./pages/BlogPage";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blogs" element={<BlogPage />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
