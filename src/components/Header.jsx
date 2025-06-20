import { useState, useEffect, useRef } from "react";
import "../styles/Header.css";
import { Link, useNavigate } from "react-router-dom";
import Cart from "./CartButton";
import CartButton from "./CartButton";

const Header = ({ isOpen, setIsOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

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
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
    setIsOpen(false)
  };

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container header-container">
        <a href="/" className="logo">
          <img src="/logo.svg" alt="Bricaaya Logo" className="logo-image" />
        </a>

        <nav
          ref={menuRef}
          className={`main-nav ${isMobileMenuOpen ? "open" : ""}`}
        >
          <ul>
            <li>
              <button
                onClick={() => scrollToSection("productos")}
                className="nav-button"
              >
                Productos
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("proceso")}
                className="nav-button"
              >
                Proceso
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("sostenibilidad")}
                className="nav-button"
              >
                Sostenibilidad
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("contacto")}
                className="nav-button"
              >
                Contacto
              </button>
            </li>
          </ul>
        </nav>
        <div className="header-actions">
          <CartButton isOpen={isOpen} setIsOpen={setIsOpen} />

          <button
            ref={buttonRef}
            className={`mobile-menu-button ${isMobileMenuOpen ? "open" : ""}`}
            aria-expanded={isMobileMenuOpen}
            onClick={() => {
              setIsMobileMenuOpen((prev) => !prev);
            }}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
