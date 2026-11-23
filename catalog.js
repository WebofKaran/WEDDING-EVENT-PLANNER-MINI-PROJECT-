const CATALOG = [{"id": "planning-0", "group": "planning", "name": "Full Wedding Planning", "price": 150000}, 
    {"id": "planning-1", "group": "planning", "name": "Partial Planning", "price": 80000}, 
    {"id": "planning-2", "group": "planning", "name": "Day-of Coordination", "price": 40000}, 
    {"id": "planning-3", "group": "planning", "name": "Destination Wedding", "price": 250000}, 
    {"id": "style-0", "group": "style", "name": "Traditional Indian", "price": 25000}, 
    {"id": "style-1", "group": "style", "name": "Modern Minimal", "price": 20000}, 
    {"id": "style-2", "group": "style", "name": "Royal Heritage", "price": 65000}, 
    {"id": "style-3", "group": "style", "name": "Garden Romance", "price": 35000}, 
    {"id": "style-4", "group": "style", "name": "Contemporary Luxury", "price": 75000}, 
    {"id": "services-0", "group": "services", "name": "Décor & Styling", "price": 120000}, 
    {"id": "services-1", "group": "services", "name": "Entertainment & Sangeet", "price": 60000}, 
    {"id": "services-2", "group": "services", "name": "Haldi Coordination", "price": 25000}, 
    {"id": "services-3", "group": "services", "name": "Catering & Guest Experience", "price": 180000}, 
    {"id": "services-4", "group": "services", "name": "Photography & Videography", "price": 90000}, 
    {"id": "services-5", "group": "services", "name": "Venue Management", "price": 50000}, 
    {"id": "experience-0", "group": "experience", "name": "Intimate Celebration", "price": 20000}, 
    {"id": "experience-1", "group": "experience", "name": "Classic Celebration", "price": 50000}, 
    {"id": "experience-2", "group": "experience", "name": "Grand Celebration", "price": 100000},
    {"id": "experience-3", "group": "experience", "name": "Royal Destination", "price": 200000}
];

const money = (n) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
function download(name, content) {
  const a = document.createElement("a");
  const url = URL.createObjectURL(new Blob([content], { type: "text/plain;charset=utf-8" }));
  Object.assign(a, { href: url, download: name });
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
const catalog = CATALOG;
let selected = storage.get("elan-package", []);
if (!Array.isArray(selected)) selected = [];
selected = selected.filter((id, i, a) => typeof id === "string" && a.indexOf(id) === i && catalog.some((item) => item.id === id));
for (const group of ["planning", "style", "experience"]) {
  const ids = catalog.filter((item) => item.group === group && selected.includes(item.id)).map((item) => item.id);
  if (ids.length > 1) selected = selected.filter((id) => !ids.slice(1).includes(id));
}
const items = () => catalog.filter((item) => selected.includes(item.id));
const total = () => items().reduce((sum, item) => sum + item.price, 0);
function estimate() {
  return "ELAN WEDDINGS — MY PACKAGE\n\n" + items().map((item) => item.name + " — " + money(item.price)).join("\n") + "\n\nEstimated total: " + money(total()) +
    "\nIllustrative starting prices. Final vendor quotes, taxes, travel and accommodation are additional. No booking has been made.";
}
