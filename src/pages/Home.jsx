"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ScrollAnimation from "../components/ScrollAnimation";
import ContactForm from "./ContactForm";
import CTA from "../components/CTA";
import productsData from "../data/productsData.json";
import { User } from "lucide-react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [featuredProduct, setFeaturedProduct] = useState(null);

  useEffect(() => {
    // Cargar productos del JSON con estructura actualizada
    const productList = Object.entries(productsData).map(([id, product]) => {
      const defaultVariant =
        product.variants.find((v) => v.isDefault) || product.variants[0];
      return {
        id,
        name: product.name,
        src: product.src,
        description: product.baseDescription,
        price: defaultVariant.price,
        size: defaultVariant.size,
        variantId: defaultVariant.id,
        isStarProduct: product.isStarProduct,
        ingredients: product.ingredients,
        imageClass: product.imageClass,
      };
    });

    setProducts(productList);

    // Encontrar producto destacado
    const featured = productList.find((product) => product.isStarProduct);
    setFeaturedProduct(featured);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bricaaya-landing">
      <ScrollAnimation />
      <Hero />

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <div className="section-badge">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
                <span>Nuestra historia</span>
              </div>
              <h2>Sabor natural, sin compromisos</h2>
              <p>
                En Bricaaya transformamos ingredientes frescos en condimentos en
                polvo mediante procesos artesanales que preservan todo su sabor
                y propiedades nutricionales.
              </p>
              <div className="about-stats">
                <div className="stat fade-in-scroll">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Natural</span>
                </div>
                <div className="stat fade-in-scroll">
                  <span className="stat-number">0</span>
                  <span className="stat-label">Químicos</span>
                </div>
                <div className="stat fade-in-scroll">
                  <span className="stat-number">5</span>
                  <span className="stat-label">Pasos de calidad</span>
                </div>
              </div>
            </div>
            <div className="about-visual">
              <div className="about-image-container">
                <div className="about-image"></div>
                <div className="about-decoration">
                  <div className="decoration-element element-1"></div>
                  <div className="decoration-element element-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section" id="proceso">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="8" r="7" />
                <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88" />
              </svg>
              <span>Nuestro proceso</span>
            </div>
            <h2 className="section-title">De la naturaleza a tu mesa</h2>
            <p className="section-subtitle">
              Cada paso de nuestro proceso está diseñado para preservar la
              pureza y el sabor auténtico
            </p>
          </div>

          <div className="process-timeline">
            <div className="process-step fade-in-scroll">
              <div className="step-visual">
                <div className="step-icon">
                  <div className="icon-circle">1</div>
                </div>
                <div className="step-line"></div>
              </div>
              <div className="step-content">
                <h3>Selección cuidadosa</h3>
                <p>
                  Elegimos ingredientes de origen local, cultivados de manera
                  sostenible y en su punto óptimo de maduración
                </p>
                <div className="step-features">
                  <span>Productores locales</span>
                  <span>Cultivo sostenible</span>
                </div>
              </div>
            </div>

            <div className="process-step fade-in-scroll">
              <div className="step-visual">
                <div className="step-icon">
                  <div className="icon-circle">2</div>
                </div>
                <div className="step-line"></div>
              </div>
              <div className="step-content">
                <h3>Deshidratación artesanal</h3>
                <p>
                  Proceso lento a baja temperatura que preserva nutrientes,
                  sabores y aromas naturales
                </p>
                <div className="step-features">
                  <span>Baja temperatura</span>
                  <span>Preserva nutrientes</span>
                </div>
              </div>
            </div>

            <div className="process-step fade-in-scroll">
              <div className="step-visual">
                <div className="step-icon">
                  <div className="icon-circle">3</div>
                </div>
                <div className="step-line"></div>
              </div>
              <div className="step-content">
                <h3>Molienda precisa</h3>
                <p>
                  Textura perfecta para liberar todo el sabor y facilitar la
                  integración en tus preparaciones
                </p>
                <div className="step-features">
                  <span>Textura óptima</span>
                  <span>Máximo sabor</span>
                </div>
              </div>
            </div>

            <div className="process-step fade-in-scroll">
              <div className="step-visual">
                <div className="step-icon">
                  <div className="icon-circle">4</div>
                </div>
              </div>
              <div className="step-content">
                <h3>Envasado sostenible</h3>
                <p>
                  Materiales eco-friendly que preservan la frescura y protegen
                  el medio ambiente
                </p>
                <div className="step-features">
                  <span>Eco-friendly</span>
                  <span>Preserva frescura</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section" id="productos">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span>Nuestros productos</span>
            </div>
            <h2 className="section-title">Condimentos que transforman</h2>
            <p className="section-subtitle">
              Cada producto está diseñado para realzar el sabor natural de tus
              ingredientes
            </p>
          </div>

          <div className="products-showcase">
            {/* Producto destacado */}
            {featuredProduct && (
              <div className="featured-product fade-in-scroll">
                <div className="product-content">
                  <div className="product-badge">Más popular</div>
                  <h3>{featuredProduct.name}</h3>
                  <p>{featuredProduct.description}</p>
                  <div className="product-price">
                    <span className="price">Desde {featuredProduct.price}</span>
                  </div>
                  <div className="product-ingredients-preview">
                    {featuredProduct.ingredients
                      .slice(0, 3)
                      .map((ingredient, index) => (
                        <span key={index}>{ingredient}</span>
                      ))}
                    {featuredProduct.ingredients.length > 3 && (
                      <span>+{featuredProduct.ingredients.length - 3} más</span>
                    )}
                  </div>
                  <div className="product-actions">
                    <Link
                      to={`/producto/${featuredProduct.variantId}`}
                      className="product-cta primary"
                    >
                      Ver detalles
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </Link>
                    <button
                      onClick={() => scrollToSection("contacto")}
                      className="product-cta secondary"
                    >
                      Consultar
                    </button>
                  </div>
                </div>
                <div className="product-visual">
                  <div
                    className={`product-image-large ${featuredProduct.imageClass}`}
                  >
                    <img src={featuredProduct.src} alt="" />
                    <div className="product-glow"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Grid de productos */}
            <div className="products-grid">
              {products
                .filter((product) => !product.isStarProduct)
                .slice(0, 3)
                .map((product) => (
                  <div key={product.id} className="product-card fade-in-scroll">
                    <div className="product-image-container">
                      <img
                        src={product.src}
                        alt={product.name}
                      />

                      <div className="product-overlay">
                        <Link
                          to={`/producto/${product.variantId}`}
                          className="overlay-button"
                        >
                          Ver detalles
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h4>{product.name}</h4>
                      <p>{product.description.substring(0, 100)}...</p>
                      <div className="product-price">
                        <span className="price">Desde {product.price}</span>
                      </div>
                      <div className="product-features">
                        <span>100% Natural</span>
                        <span>Sin conservantes</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span>Testimonios</span>
            </div>
            <h2 className="section-title">Lo que dicen nuestros clientes</h2>
          </div>

          <div className="testimonials-content">
            <div className="testimonial-featured fade-in-scroll">
              <div className="testimonial-quote">
                <blockquote>
                  "Bricaaya ha revolucionado mi cocina. El sazonador completo
                  tiene un balance perfecto que realza cada ingrediente sin
                  dominarlo."
                </blockquote>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div className="author-info">
                  <strong>María Rodríguez</strong>
                  {/* <span>Chef Ejecutiva, Restaurante Verde</span> */}
                </div>
              </div>
            </div>

            <div className="testimonials-grid">
              <div className="testimonial-card fade-in-scroll">
                <div className="testimonial-rating">
                  <span>⭐⭐⭐⭐⭐</span>
                </div>
                <p>
                  "Calidad excepcional, sabor auténtico. Mis platos nunca habían
                  tenido tanto sabor."
                </p>
                <cite>— Carlos A.</cite>
              </div>
              <div className="testimonial-card fade-in-scroll">
                <div className="testimonial-rating">
                  <span>⭐⭐⭐⭐⭐</span>
                </div>
                <p>
                  "Me encanta que sean 100% naturales. La diferencia se nota
                  desde el primer uso."
                </p>
                <cite>— Ana L.</cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="sustainability-section" id="sostenibilidad">
        <div className="container">
          <div className="sustainability-content">
            <div className="sustainability-text">
              <div className="section-badge light">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
                <span>Sostenibilidad</span>
              </div>
              <h2>Compromiso con nuestro planeta</h2>
              <p>
                Cada decisión que tomamos considera el impacto en nuestro
                planeta. Desde el cultivo hasta el envasado, priorizamos
                prácticas responsables.
              </p>
              <div className="sustainability-features">
                <div className="feature fade-in-scroll">
                  <div className="feature-icon">🌱</div>
                  <div className="feature-content">
                    <strong>Envases biodegradables</strong>
                    <span>
                      Materiales que se integran naturalmente al ecosistema
                    </span>
                  </div>
                </div>
                <div className="feature fade-in-scroll">
                  <div className="feature-icon">🤝</div>
                  <div className="feature-content">
                    <strong>Productores locales</strong>
                    <span>
                      Apoyamos la economía local y reducimos la huella de
                      carbono
                    </span>
                  </div>
                </div>
                <div className="feature fade-in-scroll">
                  <div className="feature-icon">♻️</div>
                  <div className="feature-content">
                    <strong>Proceso de bajo impacto</strong>
                    <span>Técnicas que minimizan el consumo energético</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="sustainability-visual">
              <div className="sustainability-image">
                <div className="image-overlay">
                  <img src="/src/assets/mix.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contacto">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span>Contacto</span>
            </div>
            <h2 className="section-title">Hablemos</h2>
            <p className="section-subtitle">
              ¿Tienes preguntas sobre nuestros productos? Estamos aquí para
              ayudarte.
            </p>
          </div>

          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-methods">
                <div className="contact-method fade-in-scroll">
                  <div className="method-icon">📧</div>
                  <div className="method-info">
                    <strong>Email</strong>
                    <span>Bricaayard@gmail.com</span>
                  </div>
                </div>
                <div className="contact-method fade-in-scroll">
                  <div className="method-icon">📱</div>
                  <div className="method-info">
                    <strong>Teléfono</strong>
                    <span>+1 (829) 556-1426</span>
                  </div>
                </div>
                <div className="contact-method fade-in-scroll">
                  <div className="method-icon">📍</div>
                  <div className="method-info">
                    <strong>Ubicación</strong>
                    <span>
                      C/ 39, MANZANA 38, URB. CAÑA LINDA, SAN LUIS, SANTO
                      DOMINGO ESTE, PROV. SANTO DOMINGO
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-wrapper fade-in-scroll">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
};

export default Home;
