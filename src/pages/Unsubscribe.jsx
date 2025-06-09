"use client";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/unsubscribe.css";
import api from "../api/axios";
const Unsubscribe = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState(null); // null, 'success', 'error'
  const [serverResponse, setServerResponse] = useState(null);
  const handleUnsubscribe = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    if (!token) {
      console.log(token);
      return;
    }

    api
      .get(`/api/emails/newsletter/unsubscribe/${token}`)
      .then((response) => {
        setStatus("success");
      })
      .catch((error) => {
        console.error("Error al procesar la desuscripción:", error);
        setStatus("error");
        setServerResponse(
          error.response ? error.response.data.error : "Error desconocido"
        );
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  if (status === "success") {
    return (
      <div className="unsubscribe-page">
        <div className="unsubscribe-container">
          <div className="unsubscribe-content">
            <div className="success-icon">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22,4 12,14.01 9,11.01" />
              </svg>
            </div>
            <h1>¡Desuscripción exitosa!</h1>
            <p>
              Hemos procesado tu solicitud de desuscripción.{" "}
              <strong>{email}</strong> ha sido removido de nuestra lista de
              correos.
            </p>
            <div className="success-details">
              <div className="detail-item">
                <span className="detail-icon">📧</span>
                <span>No recibirás más emails promocionales</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">⏱️</span>
                <span>Los cambios pueden tardar hasta 24 horas</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">🔒</span>
                <span>Tu información ha sido eliminada de forma segura</span>
              </div>
            </div>

            <div className="success-actions">
              <button onClick={() => navigate("/")} className="primary-button">
                Volver al inicio
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="unsubscribe-page">
      <div className="unsubscribe-container">
        <div className="unsubscribe-content">
          <div className="unsubscribe-header">
            <div className="sad-icon">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 15s1.5-2 4-2 4 2 4 2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
            </div>
            <h1>¿Seguro que quieres irte?</h1>
            <p>
              Lamentamos verte partir. Antes de desuscribirte, nos gustaría
              saber si hay algo que podemos hacer para mejorar tu experiencia.
            </p>
          </div>

          <div className="newsletter-benefits">
            <h3>Lo que te perderás:</h3>
            <div className="benefits-grid">
              <div className="benefit-item">
                <span className="benefit-icon">🍽️</span>
                <div>
                  <strong>Recetas exclusivas</strong>
                  <span>Nuevas formas de usar nuestros condimentos</span>
                </div>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🎯</span>
                <div>
                  <strong>Tips de cocina</strong>
                  <span>Consejos de chefs profesionales</span>
                </div>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🏷️</span>
                <div>
                  <strong>Ofertas especiales</strong>
                  <span>Descuentos exclusivos para suscriptores</span>
                </div>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🆕</span>
                <div>
                  <strong>Nuevos productos</strong>
                  <span>Sé el primero en conocer nuestras novedades</span>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleUnsubscribe} className="unsubscribe-form">
            {status === "error" && (
              <div className="error-message">
                {serverResponse ||
                  "Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde."}
              </div>
            )}

            <div className="form-actions">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="secondary-button"
                disabled={isProcessing}
              >
                Mantener suscripción
              </button>
              <button
                type="submit"
                className="danger-button"
                disabled={isProcessing}
              >
                {isProcessing ? "Procesando..." : "Confirmar desuscripción"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Unsubscribe;
