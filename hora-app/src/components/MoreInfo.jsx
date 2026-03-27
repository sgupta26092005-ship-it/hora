import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HOUSE_RESULTS from "../utils/houseresults";

const PLANET_ASCENDANT = {
  Sun: 1,
  Moon: 2,
  Jupiter: 3,
  Mercury: 4,
  RAHU: 5,
  Venus: 6,
  KETU: 7,
  Saturn: 8,
  Mars: 9,
};

const NUMBER_TO_PLANET = {};
for (let planet in PLANET_ASCENDANT) {
  NUMBER_TO_PLANET[PLANET_ASCENDANT[planet]] = planet;
}

function getHousePlanets(ascendant) {
  let houses = {};

  for (let i = 0; i < 9; i++) {
    let num = ((ascendant - 1 + i) % 9) + 1;
    houses[`House ${i + 1}`] = NUMBER_TO_PLANET[num];
  }

  return houses;
}

const MoreInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const ascendant = location.state?.ascendant || 1;
  const houses = getHousePlanets(ascendant);

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <div className="header-glyph">☽ ☉ ♄</div>
        <h1 className="app-title">House Details</h1>
        <p className="app-subtitle">Ascendant {ascendant} - {NUMBER_TO_PLANET[ascendant]}</p>
      </header>

      <div className="card">
        {Object.entries(houses).map(([house, planet], index) => {
          const houseNumber = index + 1;
          const result = HOUSE_RESULTS[planet]?.[houseNumber];

          return (
            <div key={house} className="house-item">
              <div className="house-header">
                <h3 className="house-title">{house}</h3>
                <span className="house-planet">{planet}</span>
              </div>
              <p className="house-result">{result || "No data available"}</p>
            </div>
          );
        })}

        <button className="back-btn" onClick={() => navigate("/")}>← Go Back</button>
      </div>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Georgia', serif;
          background: #0f0c1a;
          color: #e2d9f3;
          min-height: 100vh;
        }

        .app-wrapper {
          max-width: 540px;
          margin: 0 auto;
          padding: 2.5rem 1.25rem 4rem;
        }

        .app-header { text-align: center; margin-bottom: 2.5rem; }
        .header-glyph { font-size: 1.5rem; letter-spacing: 0.5rem; color: #a78bfa; margin-bottom: 0.75rem; opacity: 0.7; }
        .app-title { font-size: 2.2rem; font-weight: 700; color: #f0eaff; letter-spacing: 0.04em; }
        .app-subtitle { color: #9f8fc0; font-size: 0.95rem; margin-top: 0.35rem; font-style: italic; }

        .card {
          background: #1a1530;
          border: 1px solid #2e2650;
          border-radius: 16px;
          padding: 2rem 1.75rem;
          box-shadow: 0 8px 40px rgba(99,60,180,0.15);
        }

        .house-item {
          background: #120f22;
          border: 1px solid #2e2650;
          border-radius: 10px;
          padding: 1rem;
          margin-bottom: 1rem;
          transition: border-color 0.2s;
        }
        .house-item:hover { border-color: #7c3aed; }

        .house-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; }
        .house-title { font-size: 1rem; color: #f0eaff; font-weight: 600; margin: 0; }
        .house-planet { 
          background: #2e2650;
          color: #c4b5fd;
          padding: 0.3rem 0.8rem;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .house-result {
          font-size: 0.9rem;
          color: #d4c5f9;
          line-height: 1.5;
          margin: 0;
        }

        .back-btn {
          width: 100%; 
          padding: 0.85rem;
          margin-top: 1.5rem;
          background: linear-gradient(135deg, #4c1d95, #7c3aed);
          color: #f0eaff;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          font-family: inherit;
          letter-spacing: 0.06em;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.1s;
        }
        .back-btn:hover { opacity: 0.9; }
        .back-btn:active { transform: scale(0.98); }
      `}</style>  
    </div>
  );
};

export default MoreInfo;