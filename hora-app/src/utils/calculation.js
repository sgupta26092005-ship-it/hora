// ─── Month Number Tables ───────────────────────────────────────────────────
const MONTH_NUMBERS = {
  1: { normal: 1, leap: 0 },   // January
  2: { normal: 4, leap: 3 },   // February
  3: { normal: 4, leap: 4 },   // March
  4: { normal: 0, leap: 0 },   // April
  5: { normal: 2, leap: 2 },   // May
  6: { normal: 5, leap: 5 },   // June
  7: { normal: 0, leap: 0 },   // July
  8: { normal: 3, leap: 3 },   // August
  9: { normal: 6, leap: 6 },   // September
  10: { normal: 1, leap: 1 },  // October
  11: { normal: 4, leap: 4 },  // November
  12: { normal: 6, leap: 6 },  // December
}; 

// ─── ASCENDANT TABLE (PM) ───────────────────────────────────────────────── 
const ascendantPM = { 0: { SUN: 3, MON: 6, TUES: 8, WED: 1, THURS: 7, FRI: 9, SAT: 5 },
 1: { SUN: 9, MON: 5, TUES: 3, WED: 6, THURS: 8, FRI: 4, SAT: 2 },
 2: { SUN: 1, MON: 7, TUES: 9, WED: 5, THURS: 3, FRI: 6, SAT: 8 },
 3: { SUN: 6, MON: 8, TUES: 4, WED: 2, THURS: 9, FRI: 5, SAT: 3 }, 
 4: { SUN: 5, MON: 3, TUES: 6, WED: 8, THURS: 1, FRI: 7, SAT: 9 },
 5: { SUN: 2, MON: 9, TUES: 5, WED: 3, THURS: 6, FRI: 8, SAT: 4 },
 6: { SUN: 8, MON: 1, TUES: 7, WED: 9, THURS: 5, FRI: 3, SAT: 6 },
 7: { SUN: 3, MON: 6, TUES: 8, WED: 1, THURS: 2, FRI: 9, SAT: 5 },
 8: { SUN: 9, MON: 5, TUES: 3, WED: 6, THURS: 8, FRI: 1, SAT: 7 },
 9: { SUN: 4, MON: 2, TUES: 9, WED: 5, THURS: 3, FRI: 6, SAT: 8 },
 10:{ SUN: 6, MON: 8, TUES: 5, WED: 3, THURS: 9, FRI: 5, SAT: 3 },
 11:{ SUN: 5, MON: 3, TUES: 6, WED: 8, THURS: 4, FRI: 2, SAT: 9 }, 
};

// ─── ASCENDANT TABLE (AM) ───────────────────────────────────────────────── 
const ascendantAM = { 0: { SUN: 1, MON: 7, TUES: 9, WED: 5, THURS: 3, FRI: 6, SAT: 8 },
 1: { SUN: 6, MON: 8, TUES: 4, WED: 2, THURS: 9, FRI: 5, SAT: 3 },
  2: { SUN: 5, MON: 3, TUES: 6, WED: 8, THURS: 1, FRI: 7, SAT: 9 },
   3: { SUN: 2, MON: 9, TUES: 5, WED: 3, THURS: 6, FRI: 8, SAT: 4 }, 
   4: { SUN: 8, MON: 1, TUES: 7, WED: 9, THURS: 5, FRI: 3, SAT: 6 }, 
   5: { SUN: 3, MON: 6, TUES: 8, WED: 4, THURS: 2, FRI: 9, SAT: 5 }, 
   6: { SUN: 9, MON: 5, TUES: 3, WED: 6, THURS: 8, FRI: 1, SAT: 7 }, 
   7: { SUN: 4, MON: 2, TUES: 9, WED: 5, THURS: 3, FRI: 6, SAT: 8 }, 
   8: { SUN: 6, MON: 8, TUES: 1, WED: 7, THURS: 9, FRI: 5, SAT: 3 }, 
   9: { SUN: 5, MON: 3, TUES: 6, WED: 8, THURS: 4, FRI: 2, SAT: 9 }, 
   10:{ SUN: 7, MON: 9, TUES: 5, WED: 3, THURS: 6, FRI: 8, SAT: 1 }, 
  11:{ SUN: 8, MON: 4, TUES: 2, WED: 9, THURS: 5, FRI: 3, SAT: 6 },
 };





// ─── Century Number Table ──────────────────────────────────────────────────
const CENTURY_NUMBERS = {
  1900: 0,
  2000: 6,
};

// ─── Day Mapping (remainder → day) ────────────────────────────────────────
const DAY_MAP = {
  1: "Sunday",
  2: "Monday",
  3: "Tuesday",
  4: "Wednesday",
  5: "Thursday",
  6: "Friday",
  0: "Saturday", // remainder 0 = 7 = Saturday
};

// ─── Hora Table ────────────────────────────────────────────────────────────
// Each row: [startHour (0-23), endHour (exclusive), lord]
// 24 Horas in a day, ruled by planets in Chaldean order
// Chaldean order: Sun, Venus, Mercury, Moon, Saturn, Jupiter, Mars
const CHALDEAN_ORDER = ["Sun", "Venus", "Mercury", "Moon", "Saturn", "Jupiter", "Mars","RAHU","KETU"];

// Day rulers (Sunday=Sun, Monday=Moon, Tuesday=Mars, Wednesday=Mercury,
//             Thursday=Jupiter, Friday=Venus, Saturday=Saturn)
const DAY_RULERS = {
  Sunday: "Sun",
  Monday: "Moon",
  Tuesday: "Mars",
  Wednesday: "Mercury",
  Thursday: "Jupiter",
  Friday: "Venus",
  Saturday: "Saturn",
};

// Ascendant (Lagna) number by planet lord
const PLANET_ASCENDANT = {
  Sun: 1,
  Moon: 2,
  Jupiter: 3,
  Mercury: 4,
  RAHU: 5,
  Venus: 6,
  KETU : 7,
  Saturn: 8,
  Mars: 9,
};

// ─── Helpers ───────────────────────────────────────────────────────────────
export function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function getCenturyNumber(year) {
  const century = Math.floor(year / 100) * 100;
  return CENTURY_NUMBERS[century] ?? 0;
}

function getYearLastTwo(year) {
  return year % 100;
}

function getLeapValue(year) {
  const lastTwo = getYearLastTwo(year);
  return Math.floor(lastTwo / 4);
}

// ─── Main Calculation ──────────────────────────────────────────────────────
export function calculateHora({ day, month, year, hour ,ampm}) {
  // Step 1: Parse inputs
  const leap = isLeapYear(year);

  // Step 2: Century number
  const centuryNum = getCenturyNumber(year);

  // Step 3: Last two digits of year / 4
  const yearLastTwo = getYearLastTwo(year);
  const leapVal = getLeapValue(year);

  // Step 4: Month number
  const monthNum = MONTH_NUMBERS[month]?.[leap ? "leap" : "normal"] ?? 0;

  // Step 5: Total
  const total = centuryNum + yearLastTwo + leapVal + monthNum + day;

  // Step 6: Divide by 7, get remainder → Day number
  let remainder = total % 7;
  const dayName = DAY_MAP[remainder] ?? DAY_MAP[remainder === 0 ? 0 : remainder];

  // Ascendant calculation
  const period = ampm.toUpperCase();
  let hourKey = hour === 12 ? 0 : hour;
  const table = period === "PM" ? ascendantPM : ascendantAM;
  
  const DAY_SHORT_MAP = {
    Sunday: "SUN",
    Monday: "MON",
    Tuesday: "TUES",
    Wednesday: "WED",
    Thursday: "THURS",
    Friday: "FRI",
    Saturday: "SAT"
  };
  const ascendant = table[hourKey][DAY_SHORT_MAP[dayName]];

  // Step 7: Hora (planetary hour) calculation
  // Find the ruling planet for the birth hour
  const dayRuler = DAY_RULERS[dayName];
  const rulerIndex = CHALDEAN_ORDER.indexOf(dayRuler);

  let hour24 = hour;
  if (period === "PM" && hour !== 12) hour24 += 12;
  else if (period === "AM" && hour === 12) hour24 = 0;

  // Each hora is 1 hour long (simplified model: 24 equal horas)
  const horaIndex = (rulerIndex + hour24) % 7;
  const horaLord = CHALDEAN_ORDER[horaIndex];
  const ascendantNumber = ascendant;

  return {
    total,
    remainder,
    dayName,
    centuryNum,
    yearLastTwo,
    leapVal,
    monthNum,
    isLeap: leap,
    horaLord,
    ascendantNumber,
  };
}

export { DAY_RULERS, PLANET_ASCENDANT };
