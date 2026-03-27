import { useNavigate } from "react-router-dom";

export default function MoreInfo() {
  const navigate = useNavigate();

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <div className="header-glyph">☽ ☉ ♄</div>
        <h1 className="app-title">More Info on Hora</h1>
        <p className="app-subtitle">Learn about Vedic astrology and hora calculations</p>
      </header>

      <div className="card">
        <h2>What is Hora?</h2>
        <p>Hora is a fundamental concept in Vedic astrology, representing a division of time. Each hora is ruled by a planet and influences the characteristics and events associated with that period.</p>

        <h3>Planet Rulers:</h3>
        <ul>
          <li><strong>Sun (☀️):</strong> Leadership, vitality, authority</li>
          <li><strong>Moon (🌙):</strong> Emotions, intuition, nurturing</li>
          <li><strong>Mars (♂️):</strong> Energy, courage, action</li>
          <li><strong>Mercury (☿):</strong> Communication, intellect, adaptability</li>
          <li><strong>Jupiter (♃):</strong> Wisdom, expansion, spirituality</li>
          <li><strong>Venus (♀️):</strong> Love, beauty, harmony</li>
          <li><strong>Saturn (♄):</strong> Discipline, responsibility, karma</li>
        </ul>

        <h3>How Hora is Calculated:</h3>
        <p>The hora lord is determined by adding various numerical values from your birth date and time, then finding the remainder when divided by 7. Each remainder corresponds to a planet.</p>

        <button onClick={() => navigate('/')} className="back-btn">Back to Calculator</button>
      </div>

      <style>{`
        .card { background: #1a1530; border: 1px solid #2e2650; border-radius: 16px; padding: 2rem 1.75rem; box-shadow: 0 8px 40px rgba(99,60,180,0.15); }
        .card h2 { color: #f0eaff; font-size: 1.5rem; margin-bottom: 1rem; }
        .card h3 { color: #c4b5fd; font-size: 1.2rem; margin-top: 1.5rem; margin-bottom: 0.5rem; }
        .card p { color: #e2d9f3; line-height: 1.6; margin-bottom: 1rem; }
        .card ul { color: #e2d9f3; padding-left: 1.5rem; }
        .card li { margin-bottom: 0.5rem; }
        .back-btn { width: 100%; padding: 0.85rem; margin-top: 1.5rem; background: linear-gradient(135deg, #4c1d95, #7c3aed); color: #f0eaff; border: none; border-radius: 10px; font-size: 1rem; font-family: inherit; cursor: pointer; }
        .back-btn:hover { opacity: 0.9; }
      `}</style>
    </div>
  );
}