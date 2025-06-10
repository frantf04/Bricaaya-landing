import { Facebook, Instagram } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Footer.css";
import productsData from "../data/productsData.json";

function Footer() {
  const navigate = useNavigate();
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    } else {
      if (window.location.pathname !== "/") {
        const headerHeight = 80;
        window.scrollY = 0; // Reset scroll position
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const headerHeight = 80;
          const elementPosition = element.offsetTop - headerHeight;
          window.scrollTo({ top: elementPosition, behavior: "smooth" });
        }
      }, 100);
    }
  };
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>Bricaaya</h3>
            <p>Condimentos naturales en polvo</p>
            <div className="footer-social">
              <a
                href="https://www.instagram.com/bricaayard"
                target="_blank"
                aria-label="Instagram"
                className="social-link"
              >
                <div className="social-icon ">
                  <Instagram />
                </div>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61553694692742"
                target="_blank"
                aria-label="Facebook"
                className="social-link"
              >
                <div className="social-icon ">
                  <Facebook />
                </div>
              </a>

              <a
                href="https://wa.me/18295561426"
                target="_blank"
                aria-label="Twitter"
                className="social-link"
              >
                <div className="social-icon ">
                  <i className="fab fa-whatsapp"></i>
                </div>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-section">
              <h4>Productos</h4>

              {Object.keys(productsData)
                .slice(0, 4)
                .map((id) => (
                  <Link key={id} to={`/producto/${id}`} className="footer-link">
                    {productsData[id].name}
                  </Link>
                ))}
            </div>

            <div className="footer-section">
              <h4>Empresa</h4>
              <button
                onClick={() => scrollToSection("proceso")}
                className="footer-link"
              >
                Nuestro Proceso
              </button>
              <button
                onClick={() => scrollToSection("sostenibilidad")}
                className="footer-link"
              >
                Sostenibilidad
              </button>
              <button
                onClick={() => scrollToSection("contacto")}
                className="footer-link"
              >
                Contacto
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Bricaaya. Todos los derechos
            reservados.
          </p>
          <p>Powered by JFODEV (Johan Olmos)</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
