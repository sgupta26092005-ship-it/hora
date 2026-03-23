import { useState } from "react";
import { calculateHora } from "../utils/calculation";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const PLANET_ICONS = {
  Sun: "☀️", Moon: "🌙", Mars: "♂️", Mercury: "☿",
  Jupiter: "♃", Venus: "♀️", Saturn: "♄",
};

const PLANET_COLORS = {
  Sun: "#f59e0b", Moon: "#818cf8", Mars: "#ef4444",
  Mercury: "#10b981", Jupiter: "#f97316", Venus: "#ec4899", Saturn: "#6366f1",
};

export default function Form() {
  const [dob, setDob] = useState({ day: "", month: "", year: "" });
  const [hour, setHour] = useState("");
  const [ampm, setAmpm] = useState("AM");
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    const d = parseInt(dob.day), m = parseInt(dob.month), y = parseInt(dob.year);
    if (!dob.day || isNaN(d) || d < 1 || d > 31) e.day = "Enter a valid day (1–31)";
    if (!dob.month) e.month = "Select a month";
    if (!dob.year || isNaN(y) || y < 1800 || y > 2099) e.year = "Enter a year (1800–2099)";
    if (!hour || isNaN(parseInt(hour)) || parseInt(hour) < 1 || parseInt(hour) > 12)
      e.hour = "Enter hour (1–12)";
    return e;
  }

  function handleCalculate() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

 const res = calculateHora({ 
  day: parseInt(dob.day),
   month: parseInt(dob.month),
    year: parseInt(dob.year),
     hour: parseInt(hour), 
    ampm: ampm,
    });
    setResult(res);
  }

  const accentColor = result ? PLANET_COLORS[result.horaLord] : "#6366f1";

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <div className="header-glyph">☽ ☉ ♄</div>
        <h1 className="app-title">Hora Prediction</h1>
        <p className="app-subtitle">Discover your birth hora & ascendant</p>
      </header>

      <div className="card">
        <section className="form-section">
          <h2 className="section-label">Date of Birth</h2>
          <div className="dob-row">
            <div className="field">
              <label>Day</label>
              <input
                type="number" min="1" max="31" placeholder="DD"
                value={dob.day}
                onChange={e => setDob({ ...dob, day: e.target.value })}
                className={errors.day ? "error" : ""}
              />
              {errors.day && <span className="err-msg">{errors.day}</span>}
            </div>

            <div className="field">
              <label>Month</label>
              <select
                value={dob.month}
                onChange={e => setDob({ ...dob, month: e.target.value })}
                className={errors.month ? "error" : ""}
              >
                <option value="">Month</option>
                {MONTHS.map((m, i) => (
                  <option key={m} value={i + 1}>{m}</option>
                ))}
              </select>
              {errors.month && <span className="err-msg">{errors.month}</span>}
            </div>

            <div className="field">
              <label>Year</label>
              <input
                type="number" placeholder="YYYY"
                value={dob.year}
                onChange={e => setDob({ ...dob, year: e.target.value })}
                className={errors.year ? "error" : ""}
              />
              {errors.year && <span className="err-msg">{errors.year}</span>}
            </div>
          </div>
        </section>

        <section className="form-section">
          <h2 className="section-label">Time of Birth</h2>
          <div className="time-row">
            <div className="field">
              <label>Hour</label>
              <input
                type="number" min="1" max="12" placeholder="1–12"
                value={hour}
                onChange={e => setHour(e.target.value)}
                className={errors.hour ? "error" : ""}
              />
              {errors.hour && <span className="err-msg">{errors.hour}</span>}
            </div>
            <div className="field ampm-field">
              <label>AM / PM</label>
              <div className="ampm-toggle">
                {["AM", "PM"].map(v => (
                  <button
                    key={v}
                    className={`ampm-btn ${ampm === v ? "active" : ""}`}
                    onClick={() => setAmpm(v)}
                    type="button"
                  >{v}</button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <button className="calc-btn" onClick={handleCalculate} type="button">
          <span className="btn-glyph">✦</span> Calculate Hora
        </button>
      </div>

      {result && (
        <div className="result-card" style={{ "--accent": accentColor }}>
          <div className="result-header">
            <span className="planet-icon">{PLANET_ICONS[result.horaLord]}</span>
            <h2 className="hora-lord">{result.horaLord} Hora</h2>
          </div>

          <div className="result-grid">
            <div className="result-item highlight">
              <span className="res-label">Day of Birth</span>
              <span className="res-value">{result.dayName}</span>
            </div>
            <div className="result-item highlight">
              <span className="res-label">Ascendant Number</span>
              <span className="res-value res-number">{result.ascendantNumber}</span>
            </div>
            <div className="result-item">
              <span className="res-label">Hora Lord</span>
              <span className="res-value">{result.horaLord}</span>
            </div>
            <div className="result-item">
              <span className="res-label">Leap Year</span>
              <span className="res-value">{result.isLeap ? "Yes" : "No"}</span>
            </div>
          </div>

          <details className="calc-steps">
            <summary>Show Calculation Steps</summary>
            <table className="steps-table">
              <tbody>
                <tr><td>Century Number</td><td>{result.centuryNum}</td></tr>
                <tr><td>Year (last 2 digits)</td><td>{result.yearLastTwo}</td></tr>
                <tr><td>Leap Value (YY ÷ 4)</td><td>{result.leapVal}</td></tr>
                <tr><td>Month Number</td><td>{result.monthNum}</td></tr>
                <tr><td>Date</td><td>{dob.day}</td></tr>
                <tr className="total-row"><td>Total</td><td>{result.total}</td></tr>
                <tr><td>Total ÷ 7 Remainder</td><td>{result.remainder}</td></tr>
              </tbody>
            </table>
          </details>
        </div>
      )}

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

        .form-section { margin-bottom: 1.75rem; }
        .section-label { font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; color: #7c6fa0; margin-bottom: 0.85rem; }

        .dob-row, .time-row {
          display: grid;
          grid-template-columns: 1fr 2fr 1.5fr;
          gap: 0.75rem;
        }
        .time-row { grid-template-columns: 1fr 1fr; }

        .field { display: flex; flex-direction: column; gap: 0.35rem; }
        .field label { font-size: 0.78rem; color: #9585b8; letter-spacing: 0.05em; }

        input, select {
          background: #120f22;
          border: 1px solid #2e2650;
          border-radius: 8px;
          color: #e2d9f3;
          padding: 0.6rem 0.75rem;
          font-size: 0.95rem;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s;
          width: 100%;
        }
        input:focus, select:focus { border-color: #7c3aed; }
        input.error, select.error { border-color: #ef4444; }
        .err-msg { font-size: 0.7rem; color: #f87171; }

        .ampm-toggle { display: flex; gap: 0; border-radius: 8px; overflow: hidden; border: 1px solid #2e2650; }
        .ampm-btn {
          flex: 1; padding: 0.6rem; background: #120f22; color: #9585b8;
          border: none; cursor: pointer; font-family: inherit; font-size: 0.9rem;
          transition: background 0.2s, color 0.2s;
        }
        .ampm-btn.active { background: #4c1d95; color: #f0eaff; }

        .calc-btn {
          width: 100%; padding: 0.85rem; margin-top: 0.5rem;
          background: linear-gradient(135deg, #4c1d95, #7c3aed);
          color: #f0eaff; border: none; border-radius: 10px;
          font-size: 1rem; font-family: inherit; letter-spacing: 0.06em;
          cursor: pointer; transition: opacity 0.2s, transform 0.1s;
          display: flex; align-items: center; justify-content: center; gap: 0.5rem;
        }
        .calc-btn:hover { opacity: 0.9; }
        .calc-btn:active { transform: scale(0.98); }
        .btn-glyph { font-size: 0.8rem; }

        .result-card {
          margin-top: 1.75rem;
          background: #1a1530;
          border: 1px solid var(--accent, #6366f1);
          border-radius: 16px;
          padding: 1.75rem;
          box-shadow: 0 0 30px color-mix(in srgb, var(--accent) 20%, transparent);
          animation: fadeUp 0.4s ease;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .result-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem; }
        .planet-icon { font-size: 2rem; }
        .hora-lord { font-size: 1.5rem; color: var(--accent); font-weight: 700; }

        .result-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1.25rem; }
        .result-item {
          background: #120f22; border-radius: 10px; padding: 0.85rem 1rem;
          border: 1px solid #2e2650;
        }
        .result-item.highlight { border-color: var(--accent); }
        .res-label { display: block; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; color: #7c6fa0; margin-bottom: 0.3rem; }
        .res-value { font-size: 1.1rem; color: #f0eaff; font-weight: 600; }
        .res-number { font-size: 1.8rem; color: var(--accent); }

        .calc-steps { margin-top: 0.5rem; }
        .calc-steps summary { cursor: pointer; font-size: 0.8rem; color: #7c6fa0; letter-spacing: 0.05em; padding: 0.4rem 0; }
        .steps-table { width: 100%; margin-top: 0.75rem; border-collapse: collapse; font-size: 0.85rem; }
        .steps-table td { padding: 0.4rem 0.5rem; border-bottom: 1px solid #2e2650; }
        .steps-table td:last-child { text-align: right; color: #c4b5fd; }
        .total-row td { color: #f0eaff; font-weight: 600; border-top: 1px solid #4c1d95; }
      `}</style>
    </div>
  );
}
