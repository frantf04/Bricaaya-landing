"use client";

import { useState } from "react";
import api from "../api/axios";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validar los campos del formulario
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      setSubmitStatus("error");
      return;
    }
    setIsSubmitting(true);

    api
      .post("/api/emails/", formData)
      .then((response) => {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      })
      .catch((error) => {
        setSubmitStatus("error");
      })
      .finally(() => {
        setIsSubmitting(false);

        // Resetear el estado después de 5 segundos
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      });
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="form-group">
        <label htmlFor="subject">Asunto</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="form-group">
        <label htmlFor="message">Mensaje</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
          disabled={isSubmitting}
        />
      </div>

      {submitStatus === "success" && (
        <div className="form-status success">
          ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.
        </div>
      )}

      {submitStatus === "error" && (
        <div className="form-status error">
          Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.
        </div>
      )}

      <button type="submit" className="cta-button" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
      </button>
    </form>
  );
};

export default ContactForm;
