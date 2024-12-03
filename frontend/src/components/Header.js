import React, { useState, useEffect } from "react";
import DarkModeToggle from "./DarkModeToggle";

const Header = () => {
  const [currentDate, setCurrentDate] = useState("");

  // Gets current date
  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    setCurrentDate(formattedDate);
  }, []);

  return (
    <header>
      <h1>MY DASHBOARD</h1>
      <nav aria-label="Dashboard navigation">
        <div className="header__right">
          <DarkModeToggle />
          <p className="header__right-text" aria-live="polite">
            {currentDate}
          </p>
        </div>
      </nav>
    </header>
  );
};

export default Header;