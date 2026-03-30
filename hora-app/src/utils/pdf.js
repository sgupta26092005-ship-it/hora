import { jsPDF } from "jspdf";
import { astroData } from "../data/astroData";

// SAME mapping
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

// reverse mapping
const NUMBER_TO_PLANET = {};
for (let planet in PLANET_ASCENDANT) {
  NUMBER_TO_PLANET[PLANET_ASCENDANT[planet]] = planet;
}

// get houses from ascendant
function getHousePlanets(ascendant) {
  let houses = {};

  for (let i = 0; i < 9; i++) {
    let num = ((ascendant - 1 + i) % 9) + 1;
    houses[`House ${i + 1}`] = NUMBER_TO_PLANET[num];
  }

  return houses;
}

// MAIN PDF FUNCTION
export const generatePDF = (ascendant) => {
  const doc = new jsPDF();

  const houses = getHousePlanets(ascendant);

  let y = 20;

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Astrology Report", 20, y);
  y += 10;

  // Subtitle
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(
    `Ascendant ${ascendant} - ${NUMBER_TO_PLANET[ascendant]}`,
    20,
    y
  );
  y += 15;

  // LOOP
  Object.entries(houses).forEach(([house, planet], index) => {
    const houseNumber = index + 1;

    const planetData = astroData[planet];
    const houseData = planetData?.houses?.[houseNumber];

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(`${planet} - ${house}`, 20, y);
    y += 8;

    // Planet Description
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    doc.text(planetData?.description || "", 20, y, {
      maxWidth: 170,
    });
    y += 12;

    // House Result
    doc.text(houseData?.result || "No data available", 20, y, {
      maxWidth: 170,
    });
    y += 18;

    // Page break
    if (y > 280) {
      doc.addPage();
      y = 20;
    }
  });

  doc.save("astro-report.pdf");
};