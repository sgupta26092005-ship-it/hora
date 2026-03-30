import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../moreinfo.css";
import HOUSE_RESULTS from "../utils/houseresults";
import { jsPDF } from "jspdf";
import { generatePDF } from "../utils/pdf";

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
        <button className="back-btn" onClick={() => generatePDF(ascendant)}>Download PDF</button>
        <button className="back-btn" onClick={() => navigate("/")}>← Go Back</button>
      </div>
    </div>
  );
};

export default MoreInfo;
      

