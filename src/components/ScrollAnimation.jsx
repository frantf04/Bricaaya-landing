"use client"

import { useEffect } from "react"

const ScrollAnimation = () => {
  useEffect(() => {
    const fadeElements = document.querySelectorAll(".fade-in-scroll")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1 },
    )

    fadeElements.forEach((element) => {
      observer.observe(element)
    })

    return () => {
      fadeElements.forEach((element) => {
        observer.unobserve(element)
      })
    }
  }, [])

  return null
}

export default ScrollAnimation
