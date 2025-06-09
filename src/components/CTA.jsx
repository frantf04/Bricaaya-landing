"use client";

import axios from "axios";
import { use, useState } from "react";
import api from "../api/axios";

const CTA = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [serverResponse, setServerResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulación de envío de formulario
    await api
      .post("/api/emails/newsletter/subscribe", { email })
      .then((response) => {
        setSubmitStatus("success");
        setEmail("");
      })
      .catch((error) => {
        console.log(
          "Error al enviar el formulario:",
          error.response.data.error
        );
        setSubmitStatus("error");
        setServerResponse(
          error.response ? error.response.data.error : "Error desconocido"
        );
      })
      .finally(() => {
        setIsSubmitting(false);
        setTimeout(() => {
          setSubmitStatus(null);
          setServerResponse(null);
        }, 5000);
      });
  };

  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-content">
          <div className="cta-text">
            <h2>Mantente al día</h2>
            <p>
              Recibe recetas exclusivas, tips de cocina y novedades sobre
              nuestros productos
            </p>
          </div>
          <div className="cta-form">
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
              />
              <button
                type="submit"
                className="cta-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Suscríbete"}
              </button>
            </form>

            {submitStatus === "success" && (
              <p className="form-status success">
                ¡Te has suscrito correctamente! Gracias por unirte a nuestra
                comunidad.
              </p>
            )}

            {submitStatus === "error" && (
              <p className="form-status error">
                {serverResponse ||
                  "Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde."}
              </p>
            )}

            <p className="form-note">
              Recibe novedades, recetas y ofertas exclusivas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
