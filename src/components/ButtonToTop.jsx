import { ArrowUp } from "lucide-react";
import React, { useEffect, useState } from "react";

function ButtonToTop() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <button
      onClick={scrollToTop}
      className={`button-to-top ${scrollY > 150 ? "visible" : ""}`}
    >
      <ArrowUp />
    </button>
  );
}

export default ButtonToTop;
