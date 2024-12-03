import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import "../styles/toggle.css";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Loads saved preference from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedMode);
    if (savedMode) {
      document.body.classList.add("dark-mode");
    }
  }, []);

  // Toggles dark mode on and off
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
      localStorage.setItem("darkMode", newMode); // Save preference
      return newMode;
    });
  };

  return (
    <div className="dark-mode-toggle">
      <label className="switch">
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={toggleDarkMode}
          className="switch__input"
          aria-label={`Toggle dark mode ${isDarkMode ? "off" : "on"}`}
        />
        <span className="switch__circle">
          <FontAwesomeIcon
            icon={isDarkMode ? faSun : faMoon}
            className="switch__icon"
            aria-hidden="true"
          />
        </span>
        <span className="switch__background"></span>
      </label>
    </div>
  );
};

export default DarkModeToggle;
