import { useState, useEffect, useRef } from "react";
import "../styles/Header.css";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId) => {
    if (window.location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerHeight = 80;
        const elementPosition = element.offsetTop - headerHeight;
        window.scrollTo({ top: elementPosition, behavior: "smooth" });
      }
    } else {
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
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container header-container">
        <Link to="/" className="logo">
          <img src="/logo.svg" alt="Bricaaya Logo" className="logo-image" />
        </Link>

        <nav ref={menuRef} className={`main-nav ${isMobileMenuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <button onClick={() => scrollToSection("productos")} className="nav-button">
                Productos
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("proceso")} className="nav-button">
                Proceso
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("sostenibilidad")} className="nav-button">
                Sostenibilidad
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("contacto")} className="nav-button">
                Contacto
              </button>
            </li>
          </ul>
        </nav>

        <button
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
