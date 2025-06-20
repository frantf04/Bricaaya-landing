"use client";

import { useState, useEffect, use } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import productsData from "../data/productsData.json";
import { useCart } from "../context/CartContext";
import { CarTaxiFront, ShoppingCart } from "lucide-react";
import "../styles/Cart.css";

const ProductDetail = ({ isOpen, setIsOpen }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();
  const location = useLocation();

  const { cart, orderNumber, customerInfo } = useCart();

  const handleAddToCart = () => {
    addToCart(product, selectedVariant);
  };

 useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, [location.pathname]);


  useEffect(() => {
    // Buscar el producto base por ID o por variante
    let foundProduct = null;
    let foundVariant = null;

    // Buscar directamente por ID del producto base
    if (productsData[productId]) {
      foundProduct = { id: productId, ...productsData[productId] };
      foundVariant =
        foundProduct.variants.find((v) => v.isDefault) ||
        foundProduct.variants[0];
    } else {
      // Buscar por ID de variante
      Object.entries(productsData).forEach(([baseId, productData]) => {
        const variant = productData.variants.find((v) => v.id === productId);
        if (variant) {
          foundProduct = { id: baseId, ...productData };
          foundVariant = variant;
        }
      });
    }

    if (foundProduct && foundVariant) {
      setProduct(foundProduct);
      setSelectedVariant(foundVariant);
    } else {
      navigate("/");
    }

    setIsLoading(false);
  }, [productId, navigate]);

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    // Actualizar la URL sin recargar la página
    window.history.replaceState(null, "", `/producto/${variant.id}`);
  };

  const handleBackClick = () => {
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById("productos");
      if (element) {
        const headerHeight = 80;
        const elementPosition = element.offsetTop - headerHeight;
        window.scrollTo({
          top: elementPosition,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando producto...</p>
      </div>
    );
  }

  if (!product || !selectedVariant) {
    return (
      <div className="loading-container">
        <p>Producto no encontrado</p>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail-header">
        <div className="container">
          <button onClick={handleBackClick} className="back-link">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Volver a productos
          </button>
          <h1>
            {product.name} {selectedVariant.size}
          </h1>
        </div>
      </div>

      <div className="product-detail-content container">
        <div className="product-detail-grid">
          <div className="product-detail-image">
            <div className={`product-image-container ${product.imageClass}`}>
              <img src={`${product.src}`} alt="" />
            </div>
          </div>
          <div className="product-detail-info">
            {product.isStarProduct && (
              <div className="product-badge">Producto Estrella</div>
            )}

            <h2>{product.name}</h2>

            {/* Selector de variantes */}
            {product.variants.length >= 1 && (
              <div className="variant-selector">
                <h3>Presentación:</h3>
                <div className="variant-options">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      className={`variant-option ${
                        selectedVariant.id === variant.id ? "active" : ""
                      }`}
                      onClick={() => handleVariantChange(variant)}
                    >
                      <span className="variant-size">{variant.size}</span>
                      <span className="variant-price">{variant.price}</span>
                    </button>
                  ))}
                  <div className="product-cta">
                    <button
                      onClick={handleAddToCart}
                      className="cta-button whatsapp"
                    >
                      <ShoppingCart /> Añadir al carrito
                    </button>
                    <button
                      onClick={() => {
                        handleAddToCart();
                        setIsOpen(true);
                      }}
                      className="cta-button whatsapp"
                    >
                      Realizar pedido por WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="product-price">
              <span className="price">{selectedVariant.price}</span>
            </div>

            <p className="product-description">{product.baseDescription}</p>

            <div className="product-ingredients">
              <h3>Ingredientes:</h3>
              <ul>
                {product.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div className="product-benefits">
              <h3>Beneficios:</h3>
              <ul>
                {product.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>

            <div className="product-usage">
              <h3>Modo de uso:</h3>
              <p>{product.usage}</p>
            </div>
          </div>
        </div>

        <div className="product-recipes">
          <h2>Recetas recomendadas</h2>
          <div className="recipes-grid">
            {product.recipes.map((recipe, index) => (
              <div key={index} className="recipe-card">
                <div className={`recipe-image ${recipe.imageClass}`}></div>
                <h3>{recipe.title}</h3>
                <p>{recipe.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
