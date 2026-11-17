import Navbar from "../components/Navbar";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Technologies from "../sections/Technologies";
import Projects from "../sections/Projects";
import Contact from "../sections/Contact";
import Footer from "../components/Footer";
import ScrollProgress from "../components/ScrollProgress";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="bg-blue-950 text-white min-h-screen">
        <section id="home">
          <Hero onOpenCV={() => navigate("/cv")} />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="technologies">
          <Technologies />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </main>

      <Footer />
    </>
  );
}

export default HomePage;