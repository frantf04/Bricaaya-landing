"use client"

import "../styles/Hero.css"

const Hero = () => {
  const scrollToProducts = () => {
    const element = document.getElementById("productos")
    if (element) {
      const headerHeight = 80
      const elementPosition = element.offsetTop - headerHeight

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    }
  }

  const scrollToProcess = () => {
    const element = document.getElementById("proceso")
    if (element) {
      const headerHeight = 80
      const elementPosition = element.offsetTop - headerHeight

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>

      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <span>🌿 100% Natural</span>
            </div>
            <h1>
              Transforma tu cocina con
              <span className="hero-highlight"> sabores auténticos</span>
            </h1>
            <p>
              Condimentos en polvo elaborados artesanalmente, que capturan la esencia pura de cada ingrediente. Sin químicos, colorantes ni preservantes..
            </p>

            <div className="hero-features">
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <span>Ingredientes locales</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <span>Proceso artesanal</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <span>Envío sostenible</span>
              </div>
            </div>

            <div className="hero-actions">
              <button onClick={scrollToProducts} className="hero-cta primary">
                Explorar productos
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
              <button onClick={scrollToProcess} className="hero-cta secondary">
                Ver proceso
              </button>
            </div>

            <div className="hero-social-proof">
              <div className="proof-item">
                <div className="proof-avatars">
                  <div className="avatar"></div>
                  <div className="avatar"></div>
                  <div className="avatar"></div>
                </div>
                <div className="proof-text">
                  <strong>500+ familias</strong>
                  <span>ya disfrutan nuestros condimentos</span>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-product-showcase">
              <div className="product-floating product-1">
                <div className="product-image sazonador"></div>
                <div className="product-label">Sazonador Completo</div>
              </div>
              <div className="product-floating product-2">
                <div className="product-image ajo"></div>
                <div className="product-label">Ajo en Polvo</div>
              </div>
              <div className="product-floating product-3">
                <div className="product-image cebolla"></div>
                <div className="product-label">Cebolla en Polvo</div>
              </div>
            </div>

            <div className="hero-decoration">
              <div className="decoration-circle circle-1"></div>
              <div className="decoration-circle circle-2"></div>
              <div className="decoration-leaf leaf-1">🌿</div>
              <div className="decoration-leaf leaf-2">🌿</div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <div className="scroll-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m7 13 5 5 5-5" />
            <path d="m7 6 5 5 5-5" />
          </svg>
        </div>
      </div>
    </section>
  )
}

export default Hero
