import { useState, useEffect, useRef } from "react";

const COLORS = {
  orange: "#F97316",
  gold: "#FBBF24",
  brown: "#3E2723",
  cream: "#FFF8E7",
  red: "#B91C1C",
  softWhite: "#FAFAFA",
  darkBrown: "#1C0F0A",
};

// Unsplash food images mapped by keyword matching
const menuImages = {
  // Chicken Mandi variants
  "alfaham": "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=120&h=90&fit=crop",
  "chicken fry mandi": "https://images.unsplash.com/photo-1562967914-608f82629710?w=120&h=90&fit=crop",
  "broasted": "https://images.unsplash.com/photo-1626082927389-6cd097cee6a2?w=120&h=90&fit=crop",
  "juicy mandi": "https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=120&h=90&fit=crop",
  "wings": "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=120&h=90&fit=crop",
  "shawarma": "https://images.unsplash.com/photo-1561651188-d207bbec4ec3?w=120&h=90&fit=crop",
  // Mutton
  "mutton fry": "https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=120&h=90&fit=crop",
  "mutton juicy": "https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=120&h=90&fit=crop",
  "dum ka mutton": "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=120&h=90&fit=crop",
  // Combos
  "chicken + mutton": "https://images.unsplash.com/photo-1547592180-85f173990554?w=120&h=90&fit=crop",
  "chicken + fish": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=120&h=90&fit=crop",
  "chicken + prawns": "https://images.unsplash.com/photo-1625943553852-781c6dd46faa?w=120&h=90&fit=crop",
  "mutton + fish": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=120&h=90&fit=crop",
  "mutton + prawns": "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=120&h=90&fit=crop",
  "fish + prawns": "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=120&h=90&fit=crop",
  // Veg
  "paneer masala": "https://images.unsplash.com/photo-1631292784640-2b24be784d5d?w=120&h=90&fit=crop",
  "mushroom kaju": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=120&h=90&fit=crop",
  // Starters
  "french fries": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=120&h=90&fit=crop",
  "chilli paneer": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=120&h=90&fit=crop",
  "crispy corn": "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=120&h=90&fit=crop",
  "chicken majestic": "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=120&h=90&fit=crop",
  "chicken lollipop": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=120&h=90&fit=crop",
  "drumstick": "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=120&h=90&fit=crop",
  "chilli chicken": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=120&h=90&fit=crop",
  "crispy chicken": "https://images.unsplash.com/photo-1562967914-608f82629710?w=120&h=90&fit=crop",
  "crispy fish": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=120&h=90&fit=crop",
  "crispy prawns": "https://images.unsplash.com/photo-1625943553852-781c6dd46faa?w=120&h=90&fit=crop",
  "crispy mushroom": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=120&h=90&fit=crop",
  "creamy mushroom": "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=120&h=90&fit=crop",
  "paneer majestic": "https://images.unsplash.com/photo-1631292784640-2b24be784d5d?w=120&h=90&fit=crop",
  "chilli prawns": "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=120&h=90&fit=crop",
  "chilli fish": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=120&h=90&fit=crop",
  // Desserts
  "classic kunafa": "https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=120&h=90&fit=crop",
  "cream cheese kunafa": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=120&h=90&fit=crop",
  "nutella kunafa": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=120&h=90&fit=crop",
  "pista": "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=120&h=90&fit=crop",
  "apricot": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=120&h=90&fit=crop",
  "sweet pan": "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=120&h=90&fit=crop",
  // Beverages & Extras
  "soft drink": "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=120&h=90&fit=crop",
  "water bottle": "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=120&h=90&fit=crop",
  "soup": "https://images.unsplash.com/photo-1547592180-85f173990554?w=120&h=90&fit=crop",
  "extra rice": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=120&h=90&fit=crop",
  "curd": "https://images.unsplash.com/photo-1571212515416-fca988083f46?w=120&h=90&fit=crop",
  // fallback category images
  "_chicken": "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=120&h=90&fit=crop",
  "_mutton": "https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=120&h=90&fit=crop",
  "_combo": "https://images.unsplash.com/photo-1547592180-85f173990554?w=120&h=90&fit=crop",
  "_veg": "https://images.unsplash.com/photo-1631292784640-2b24be784d5d?w=120&h=90&fit=crop",
  "_default": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=120&h=90&fit=crop",
};

function getMenuImage(itemName, category) {
  const lower = itemName.toLowerCase();
  for (const [key, url] of Object.entries(menuImages)) {
    if (!key.startsWith("_") && lower.includes(key)) return url;
  }
  const catLower = (category || "").toLowerCase();
  if (catLower.includes("chicken")) return menuImages["_chicken"];
  if (catLower.includes("mutton")) return menuImages["_mutton"];
  if (catLower.includes("combo")) return menuImages["_combo"];
  if (catLower.includes("veg")) return menuImages["_veg"];
  return menuImages["_default"];
}

const menuData = {
  "Chicken Mandi": [
    { name: "Chicken Alfaham Mandi (Single)", price: 399 },
    { name: "Chicken Fry Mandi (Single)", price: 319 },
    { name: "Chicken Broasted Mandi (Single)", price: 339 },
    { name: "Chicken Juicy Mandi (Single)", price: 369 },
    { name: "Chicken Wings Mandi (Single)", price: 369 },
  ],
  "Chicken Platters": [
    { name: "Chicken Alfaham Mandi Half (2 Pc)", price: 649 },
    { name: "Chicken Alfaham Mandi Full (3 Pc)", price: 999 },
    { name: "Chicken Fry Mandi Half (2 Pc)", price: 539 },
    { name: "Chicken Fry Mandi Full (3 Pc)", price: 889 },
    { name: "Chicken Broasted Mandi Half (2 Pc)", price: 559 },
    { name: "Chicken Broasted Mandi Full (3 Pc)", price: 909 },
    { name: "Chicken Juicy Mandi Half (2 Pc)", price: 599 },
    { name: "Chicken Juicy Mandi Full (3 Pc)", price: 949 },
    { name: "Chicken Wings Mandi Half (2 Pc)", price: 599 },
    { name: "Chicken Wings Mandi Full (3 Pc)", price: 949 },
    { name: "Chicken Shawarma Mandi Full", price: 659 },
  ],
  "Mutton Mandi": [
    { name: "Mutton Fry Mandi Single", price: 369 },
    { name: "Mutton Juicy Mandi Single", price: 389 },
    { name: "Dum Ka Mutton Mandi Single", price: 399 },
    { name: "Mutton Fry Mandi Half", price: 699 },
    { name: "Mutton Fry Mandi Full", price: 1049 },
    { name: "Mutton Juicy Mandi Half", price: 729 },
    { name: "Mutton Juicy Mandi Full", price: 1099 },
    { name: "Dum Ka Mutton Mandi Half", price: 749 },
    { name: "Dum Ka Mutton Mandi Full", price: 1199 },
  ],
  "Combo Mandi": [
    { name: "Chicken + Mutton Combo", price: 699 },
    { name: "Chicken + Fish Combo", price: 659 },
    { name: "Chicken + Prawns Combo", price: 649 },
    { name: "Mutton + Fish Combo", price: 699 },
    { name: "Mutton + Prawns Combo", price: 699 },
    { name: "Fish + Prawns Combo", price: 669 },
  ],
  "Veg Mandi": [
    { name: "Paneer Masala Mandi Half", price: 599 },
    { name: "Paneer Masala Mandi Full", price: 899 },
    { name: "Mushroom Kaju Mandi Half", price: 629 },
    { name: "Mushroom Kaju Mandi Full", price: 939 },
  ],
  "Starters": [
    { name: "French Fries", price: 199 },
    { name: "Chilli Paneer", price: 259 },
    { name: "Crispy Corn", price: 259 },
    { name: "Chicken Majestic", price: 299 },
    { name: "Chicken Lollipop", price: 299 },
    { name: "Chicken Drumsticks", price: 299 },
    { name: "Chilli Chicken", price: 299 },
    { name: "Crispy Chicken", price: 299 },
    { name: "Crispy Fish", price: 329 },
    { name: "Crispy Prawns", price: 329 },
    { name: "Crispy Mushroom", price: 279 },
    { name: "Creamy Mushroom", price: 299 },
    { name: "Paneer Majestic", price: 299 },
    { name: "Chilli Prawns", price: 329 },
    { name: "Chilli Fish", price: 329 },
  ],
  "Desserts": [
    { name: "Classic Kunafa", price: 309 },
    { name: "Cream Cheese Kunafa", price: 329 },
    { name: "Nutella Kunafa", price: 329 },
    { name: "Pista Cheese Kunafa", price: 369 },
    { name: "Apricot Delight", price: 169 },
    { name: "Sweet Pan", price: 40 },
  ],
  "Beverages & Extras": [
    { name: "Soft Drink Can", price: 70 },
    { name: "Water Bottle", price: 30 },
    { name: "Chicken Piece", price: 199 },
    { name: "Alfaham Piece", price: 239 },
    { name: "Mutton Piece", price: 259 },
    { name: "Dum Ka Mutton Piece", price: 279 },
    { name: "Fish Piece", price: 249 },
    { name: "Special Soup", price: 179 },
    { name: "Extra Rice", price: 179 },
    { name: "Curd", price: 29 },
  ],
};

const signatureDishes = [
  { name: "Chicken Alfaham Mandi", price: 399, desc: "Aromatic saffron rice topped with perfectly roasted Alfaham chicken, slow-cooked in traditional mandi style", emoji: "🍗" },
  { name: "Chicken Juicy Mandi", price: 369, desc: "Tender, fall-off-the-bone chicken atop fragrant basmati rice with authentic Arabian spice blend", emoji: "🍚" },
  { name: "Dum Ka Mutton Mandi", price: 399, desc: "Slow-cooked dum-style mutton with rich mandi spices, served on a bed of golden saffron rice", emoji: "🥩" },
  { name: "Chicken Shawarma Mandi", price: 659, desc: "A fusion masterpiece — Levantine shawarma-style chicken layered on signature mandi rice", emoji: "🌯" },
  { name: "Chicken + Mutton Combo", price: 699, desc: "The royal feast — best of both worlds, Alfaham chicken and tender mutton on one grand platter", emoji: "👑" },
  { name: "Classic Kunafa", price: 309, desc: "Golden-crisp semolina pastry filled with stretchy cheese, drizzled with rose water sugar syrup", emoji: "🍮" },
];

const reviews = [
  { name: "Mohammed Raza", rating: 5, text: "Amazing Alfaham Mandi and great family atmosphere. Best mandi I've had in Hyderabad!", location: "Miyapur" },
  { name: "Priya Sharma", rating: 5, text: "Best Mandi in Miyapur, no contest. The Juicy Mandi is outstanding and portion sizes are generous.", location: "Kondapur" },
  { name: "Syed Irfan", rating: 5, text: "Kunafa was outstanding! Crispy, cheesy, perfectly sweet. This place deserves all the hype.", location: "Hafeezpet" },
  { name: "Fatima Begum", rating: 5, text: "Brought the whole family here for Eid. Perfect ambience, authentic flavors, will definitely return.", location: "Bachupally" },
  { name: "Rahul Verma", rating: 4, text: "The combo mandi platter is a must-try. Great value for the quality. Perfect for group dining.", location: "Kukatpally" },
];

const galleryItems = [
  { cat: "Mandi", emoji: "🍗", label: "Alfaham Mandi Platter" },
  { cat: "Mandi", emoji: "🍚", label: "Juicy Mandi" },
  { cat: "Desserts", emoji: "🍮", label: "Classic Kunafa" },
  { cat: "Seafood", emoji: "🦐", label: "Crispy Prawns" },
  { cat: "Mandi", emoji: "🥩", label: "Mutton Mandi Full" },
  { cat: "Desserts", emoji: "🫕", label: "Pista Kunafa" },
  { cat: "Starters", emoji: "🍗", label: "Chicken Lollipop" },
  { cat: "Interior", emoji: "🏮", label: "Dining Area" },
  { cat: "Starters", emoji: "🐟", label: "Crispy Fish" },
];

function StarRating({ rating = 5, size = 16 }) {
  return (
    <span style={{ color: COLORS.gold, fontSize: size }}>
      {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}
    </span>
  );
}

function WhatsAppBtn({ text = "Order on WhatsApp", small = false, item = "" }) {
  const msg = item
    ? `Hi, I'd like to order ${item} from Mandi Bistro!`
    : "Hi, I'd like to place an order at Mandi Bistro!";
  const url = `https://wa.me/919999999999?text=${encodeURIComponent(msg)}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: "#25D366",
        color: "#fff",
        border: "none",
        borderRadius: 50,
        padding: small ? "7px 16px" : "12px 24px",
        fontWeight: 600,
        fontSize: small ? 13 : 15,
        textDecoration: "none",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
    >
      <span>💬</span> {text}
    </a>
  );
}

function NavBar({ activeSection, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["Home", "About", "Menu", "Gallery", "Order", "Contact"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: "rgba(62,39,35,0.97)", backdropFilter: "blur(8px)",
      borderBottom: `2px solid ${COLORS.orange}`,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 5vw", height: 60,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 26 }}>🥘</span>
        <span style={{ color: COLORS.gold, fontWeight: 800, fontSize: 20, letterSpacing: 0.5 }}>
          Mandi <span style={{ color: COLORS.orange }}>Bistro</span>
        </span>
      </div>
      <div style={{ display: "flex", gap: 4 }} className="nav-links">
        {links.map(l => (
          <button key={l} onClick={() => setPage(l.toLowerCase())} style={{
            background: "none", border: "none", color: COLORS.cream,
            fontWeight: 500, fontSize: 14, padding: "6px 12px",
            cursor: "pointer", borderRadius: 6,
            transition: "color 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.color = COLORS.gold}
            onMouseLeave={e => e.currentTarget.style.color = COLORS.cream}
          >{l}</button>
        ))}
      </div>
      <button onClick={() => setMenuOpen(!menuOpen)} style={{
        display: "none", background: "none", border: "none", color: COLORS.gold, fontSize: 26, cursor: "pointer"
      }} className="ham-btn">☰</button>
      <style>{`
        @media(max-width:700px){.nav-links{display:none!important}.ham-btn{display:block!important}}
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Inter',sans-serif;background:${COLORS.softWhite}}
        h1,h2,h3,h4{font-family:'Poppins',sans-serif}
      `}</style>
      {menuOpen && (
        <div style={{
          position: "fixed", top: 60, left: 0, right: 0,
          background: COLORS.brown, zIndex: 999, padding: "16px 0",
          borderBottom: `2px solid ${COLORS.orange}`,
        }}>
          {links.map(l => (
            <button key={l} onClick={() => { setPage(l.toLowerCase()); setMenuOpen(false); }} style={{
              display: "block", width: "100%", background: "none", border: "none",
              color: COLORS.cream, padding: "12px 24px", fontSize: 16, textAlign: "left", cursor: "pointer",
            }}>{l}</button>
          ))}
        </div>
      )}
    </nav>
  );
}

function HeroSection({ setPage }) {
  const [float, setFloat] = useState(0);
  useEffect(() => {
    let t = 0;
    const id = setInterval(() => { t += 0.05; setFloat(Math.sin(t) * 10); }, 50);
    return () => clearInterval(id);
  }, []);

  return (
    <section style={{
      minHeight: "100vh",
      background: `linear-gradient(135deg, ${COLORS.darkBrown} 0%, #2D1810 50%, ${COLORS.brown} 100%)`,
      display: "flex", flexDirection: "column", justifyContent: "center",
      alignItems: "center", textAlign: "center",
      padding: "100px 5vw 60px",
      position: "relative", overflow: "hidden",
    }}>
      {/* Decorative orbs */}
      <div style={{ position: "absolute", top: "10%", left: "5%", width: 200, height: 200, borderRadius: "50%", background: `${COLORS.orange}15`, filter: "blur(60px)" }} />
      <div style={{ position: "absolute", bottom: "15%", right: "5%", width: 250, height: 250, borderRadius: "50%", background: `${COLORS.gold}12`, filter: "blur(80px)" }} />

      {/* Floating food emojis */}
      {["🥘", "🍗", "🍮", "🦐", "🌿"].map((e, i) => (
        <div key={i} style={{
          position: "absolute",
          top: `${15 + i * 15}%`,
          left: i % 2 === 0 ? `${5 + i * 2}%` : undefined,
          right: i % 2 !== 0 ? `${5 + i * 2}%` : undefined,
          fontSize: 32 + i * 4,
          opacity: 0.25,
          transform: `translateY(${float * (i % 2 === 0 ? 1 : -1)}px)`,
          transition: "transform 0.1s ease",
          userSelect: "none",
        }}>{e}</div>
      ))}

      {/* Badges */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 28 }}>
        {[
          { icon: "⭐", text: "4.6 Rating" },
          { icon: "🕐", text: "12 PM – 1 AM" },
          { icon: "👨‍👩‍👧", text: "Family Dining" },
          { icon: "📦", text: "Pickup Available" },
        ].map(b => (
          <div key={b.text} style={{
            background: "rgba(255,255,255,0.1)", border: `1px solid ${COLORS.gold}40`,
            borderRadius: 50, padding: "5px 14px", color: COLORS.cream,
            fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 6,
          }}>
            <span>{b.icon}</span>{b.text}
          </div>
        ))}
      </div>

      <h1 style={{
        color: "#fff", fontFamily: "'Poppins', sans-serif",
        fontSize: "clamp(28px, 5vw, 58px)", fontWeight: 800,
        lineHeight: 1.15, marginBottom: 20, maxWidth: 800,
        textShadow: "0 2px 20px rgba(0,0,0,0.4)",
      }}>
        Authentic Arabian Mandi &{" "}
        <span style={{ color: COLORS.gold }}>Kabsa Experience</span>{" "}
        in Hyderabad
      </h1>

      <p style={{
        color: COLORS.cream, fontSize: "clamp(15px, 2vw, 19px)",
        maxWidth: 580, lineHeight: 1.6, marginBottom: 36, opacity: 0.9,
      }}>
        Freshly prepared Mandi, Kabsa, Seafood, Starters and Desserts served daily at Miyapur.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
        <WhatsAppBtn text="Order on WhatsApp" />
        <button onClick={() => setPage("menu")} style={{
          background: COLORS.orange, color: "#fff", border: "none",
          borderRadius: 50, padding: "12px 28px", fontWeight: 700,
          fontSize: 15, cursor: "pointer", transition: "transform 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >🍽 View Menu</button>
        <a href="https://wa.me/919999999999?text=I%20would%20like%20to%20reserve%20a%20table" target="_blank" rel="noopener noreferrer"
          style={{
            background: "transparent", color: COLORS.gold,
            border: `2px solid ${COLORS.gold}`, borderRadius: 50,
            padding: "12px 28px", fontWeight: 700, fontSize: 15,
            textDecoration: "none", transition: "background 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = `${COLORS.gold}20`; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
        >🪑 Reserve Table</a>
      </div>

      {/* Scroll hint */}
      <div style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", color: COLORS.gold, opacity: 0.6, fontSize: 13, animation: "bounce 2s infinite" }}>
        ↓ Scroll to explore
      </div>
      <style>{`@keyframes bounce{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(8px)}}`}</style>
    </section>
  );
}

function AboutSection() {
  return (
    <section style={{ padding: "80px 5vw", background: COLORS.cream }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <span style={{ color: COLORS.orange, fontWeight: 600, fontSize: 14, textTransform: "uppercase", letterSpacing: 2 }}>Our Story</span>
          <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(26px,4vw,42px)", fontWeight: 800, color: COLORS.brown, marginTop: 8 }}>
            Where Arabian Tradition Meets Hyderabadi Hospitality
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
          <div>
            <p style={{ color: "#5D4037", lineHeight: 1.8, fontSize: 16, marginBottom: 20 }}>
              Nestled in the heart of Miyapur, Mandi Bistro brings the rich, aromatic flavors of authentic Arabian cuisine to Hyderabad. Our master chefs have perfected the centuries-old art of Mandi preparation — slow-cooking meat over fragrant rice in traditional tandoors.
            </p>
            <p style={{ color: "#5D4037", lineHeight: 1.8, fontSize: 16, marginBottom: 28 }}>
              Every dish tells a story of heritage. We source only premium ingredients — aged basmati rice, hand-picked spices from the Arabian Peninsula, and the finest cuts of chicken and mutton — to ensure each bite transports you to the warm, welcoming tables of Riyadh and Jeddah.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { icon: "🏆", label: "4.6★ Rating", sub: "Loved by thousands" },
                { icon: "👨‍🍳", label: "Expert Chefs", sub: "Arabian cuisine masters" },
                { icon: "🌿", label: "Fresh Daily", sub: "No pre-made dishes" },
                { icon: "👨‍👩‍👧‍👦", label: "Family First", sub: "Comfortable for all" },
              ].map(f => (
                <div key={f.label} style={{
                  background: "#fff", borderRadius: 12, padding: "16px", border: `1px solid ${COLORS.orange}30`,
                }}>
                  <div style={{ fontSize: 28, marginBottom: 6 }}>{f.icon}</div>
                  <div style={{ fontWeight: 700, color: COLORS.brown, fontSize: 14 }}>{f.label}</div>
                  <div style={{ color: "#888", fontSize: 12 }}>{f.sub}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {["🍗 Alfaham Grill", "🥘 Mandi Platter", "🍮 Kunafa Station", "🏮 Dining Hall"].map((img, i) => (
              <div key={i} style={{
                background: `linear-gradient(135deg, ${COLORS.brown}dd, ${COLORS.orange}88)`,
                borderRadius: 16, aspectRatio: "1", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", fontSize: i === 0 ? 56 : 40,
                color: "#fff", fontFamily: "'Poppins',sans-serif", fontWeight: 600,
                gridRow: i === 0 ? "span 2" : "auto", minHeight: 120,
              }}>
                <span style={{ fontSize: i === 0 ? 64 : 40 }}>{img.split(" ")[0]}</span>
                <span style={{ fontSize: 12, opacity: 0.8, marginTop: 8, textAlign: "center", padding: "0 8px" }}>{img.split(" ").slice(1).join(" ")}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TodaySpecial() {
  const [special] = useState({ name: "Chicken Alfaham Mandi", price: 399, desc: "Our finest Alfaham chicken, roasted to golden perfection over fragrant saffron rice with our secret 11-spice blend. Today only at a special price!" });
  return (
    <section style={{
      padding: "60px 5vw",
      background: `linear-gradient(135deg, ${COLORS.brown} 0%, #1C0F0A 100%)`,
    }}>
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <span style={{
          background: COLORS.orange, color: "#fff", borderRadius: 50,
          padding: "4px 16px", fontSize: 12, fontWeight: 700, letterSpacing: 1,
          textTransform: "uppercase",
        }}>🌟 Today's Special</span>
        <div style={{
          marginTop: 28, background: "rgba(255,255,255,0.06)",
          border: `2px solid ${COLORS.gold}40`, borderRadius: 24,
          padding: "36px 40px", position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: -30, right: -30, fontSize: 120, opacity: 0.06 }}>🍗</div>
          <div style={{ fontSize: 64, marginBottom: 12 }}>🍗</div>
          <h3 style={{ fontFamily: "'Poppins',sans-serif", color: COLORS.gold, fontSize: 28, fontWeight: 800, marginBottom: 8 }}>{special.name}</h3>
          <p style={{ color: COLORS.cream, opacity: 0.85, lineHeight: 1.7, marginBottom: 20, fontSize: 15 }}>{special.desc}</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <span style={{ fontSize: 36, fontWeight: 800, color: COLORS.gold, fontFamily: "'Poppins',sans-serif" }}>₹{special.price}</span>
            <WhatsAppBtn text={`Order ${special.name}`} item={special.name} />
          </div>
        </div>
      </div>
    </section>
  );
}

function SignatureDishes() {
  return (
    <section style={{ padding: "80px 5vw", background: COLORS.softWhite }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{ color: COLORS.orange, fontWeight: 600, fontSize: 14, textTransform: "uppercase", letterSpacing: 2 }}>Chef's Picks</span>
          <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(24px,4vw,40px)", fontWeight: 800, color: COLORS.brown, marginTop: 8 }}>
            Signature Dishes
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 24 }}>
          {signatureDishes.map(dish => (
            <div key={dish.name} style={{
              background: "#fff", borderRadius: 20, overflow: "hidden",
              border: `1px solid ${COLORS.orange}20`,
              transition: "transform 0.2s, box-shadow 0.2s",
              boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 12px 32px ${COLORS.orange}25`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.06)"; }}
            >
              <div style={{
                background: `linear-gradient(135deg, ${COLORS.brown}ee, ${COLORS.orange}88)`,
                height: 160, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 72,
              }}>{dish.emoji}</div>
              <div style={{ padding: "20px 20px 24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <h3 style={{ fontFamily: "'Poppins',sans-serif", fontSize: 16, fontWeight: 700, color: COLORS.brown, flex: 1 }}>{dish.name}</h3>
                  <span style={{ color: COLORS.orange, fontWeight: 800, fontSize: 18, fontFamily: "'Poppins',sans-serif", marginLeft: 8 }}>₹{dish.price}</span>
                </div>
                <p style={{ color: "#777", fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>{dish.desc}</p>
                <WhatsAppBtn text="Order Now" small item={dish.name} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MenuSection() {
  const [activeTab, setActiveTab] = useState("Chicken Mandi");
  const [search, setSearch] = useState("");
  const cats = Object.keys(menuData);

  const filtered = (menuData[activeTab] || []).filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section style={{ padding: "80px 5vw", background: COLORS.cream }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span style={{ color: COLORS.orange, fontWeight: 600, fontSize: 14, textTransform: "uppercase", letterSpacing: 2 }}>Full Menu</span>
          <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(24px,4vw,40px)", fontWeight: 800, color: COLORS.brown, marginTop: 8 }}>
            Our Menu
          </h2>
        </div>

        {/* Search */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="🔍 Search dishes..."
            style={{
              padding: "12px 20px", borderRadius: 50, border: `1px solid ${COLORS.orange}40`,
              fontSize: 15, width: "100%", maxWidth: 400, outline: "none",
              background: "#fff", color: COLORS.brown,
            }}
          />
        </div>

        {/* Category tabs */}
        <div style={{
          display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center",
          marginBottom: 36,
        }}>
          {cats.map(cat => (
            <button key={cat} onClick={() => { setActiveTab(cat); setSearch(""); }} style={{
              padding: "8px 18px", borderRadius: 50, border: `1.5px solid ${activeTab === cat ? COLORS.orange : "#ddd"}`,
              background: activeTab === cat ? COLORS.orange : "#fff",
              color: activeTab === cat ? "#fff" : COLORS.brown,
              fontWeight: 600, fontSize: 13, cursor: "pointer",
              transition: "all 0.2s",
            }}>{cat}</button>
          ))}
        </div>

        {/* Menu grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {filtered.map(item => (
            <div key={item.name} style={{
              background: "#fff", borderRadius: 14, overflow: "hidden",
              border: `1px solid ${COLORS.orange}15`,
              transition: "border-color 0.2s, box-shadow 0.2s",
              display: "flex", alignItems: "center",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${COLORS.orange}60`; e.currentTarget.style.boxShadow = "0 4px 16px rgba(249,115,22,0.10)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = `${COLORS.orange}15`; e.currentTarget.style.boxShadow = "none"; }}
            >
              {/* Food image */}
              <div style={{ flexShrink: 0, width: 90, height: 80, overflow: "hidden" }}>
                <img
                  src={getMenuImage(item.name, activeTab)}
                  alt={item.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  onError={e => { e.currentTarget.style.display = "none"; e.currentTarget.parentElement.style.background = `linear-gradient(135deg,${COLORS.brown}cc,${COLORS.orange}88)`; e.currentTarget.parentElement.innerHTML = "<span style='font-size:28px;display:flex;align-items:center;justify-content:center;height:100%'>🍽</span>"; }}
                />
              </div>
              {/* Text + price */}
              <div style={{ flex: 1, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                <span style={{ color: COLORS.brown, fontWeight: 500, fontSize: 13, lineHeight: 1.35 }}>{item.name}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                  <span style={{ color: COLORS.orange, fontWeight: 700, fontSize: 14 }}>₹{item.price}</span>
                  <a href={`https://wa.me/919999999999?text=${encodeURIComponent("Hi, I'd like to order " + item.name + " - ₹" + item.price)}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{
                      background: "#25D366", color: "#fff", borderRadius: 8, padding: "5px 10px",
                      fontSize: 11, fontWeight: 700, textDecoration: "none",
                    }}>+</a>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p style={{ color: "#aaa", gridColumn: "1/-1", textAlign: "center", padding: 32 }}>No dishes found for "{search}"</p>
          )}
        </div>
      </div>
    </section>
  );
}

function OrderSection() {
  const [cart, setCart] = useState({});
  const [form, setForm] = useState({ name: "", phone: "", date: "", time: "" });
  const [sent, setSent] = useState(false);

  const addItem = (name, price) => setCart(c => ({ ...c, [name]: { qty: (c[name]?.qty || 0) + 1, price } }));
  const removeItem = (name) => setCart(c => {
    const n = { ...c };
    if (n[name]?.qty > 1) n[name] = { ...n[name], qty: n[name].qty - 1 };
    else delete n[name];
    return n;
  });

  const total = Object.values(cart).reduce((s, v) => s + v.qty * v.price, 0);

  const placeOrder = () => {
    if (!form.name || !form.phone) { alert("Please fill in your name and phone number."); return; }
    const items = Object.entries(cart).map(([n, v]) => `- ${n} x${v.qty} = ₹${v.qty * v.price}`).join("\n");
    const msg = `🛒 New Pickup Order from Mandi Bistro Website\n\nCustomer: ${form.name}\nPhone: ${form.phone}\nPickup Date: ${form.date}\nPickup Time: ${form.time}\n\nItems:\n${items}\n\n💰 Total: ₹${total}`;
    window.open(`https://wa.me/919999999999?text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
  };

  const quickItems = [
    { name: "Chicken Alfaham Mandi (Single)", price: 399 },
    { name: "Chicken Juicy Mandi (Single)", price: 369 },
    { name: "Dum Ka Mutton Mandi Single", price: 399 },
    { name: "Classic Kunafa", price: 309 },
    { name: "Chicken Majestic", price: 299 },
    { name: "Crispy Prawns", price: 329 },
  ];

  if (sent) return (
    <section style={{ padding: "80px 5vw", background: COLORS.softWhite, textAlign: "center" }}>
      <div style={{ maxWidth: 500, margin: "0 auto" }}>
        <div style={{ fontSize: 80, marginBottom: 20 }}>🎉</div>
        <h2 style={{ fontFamily: "'Poppins',sans-serif", color: COLORS.brown, marginBottom: 12 }}>Order Sent!</h2>
        <p style={{ color: "#666", marginBottom: 24 }}>Your pickup order has been sent via WhatsApp. Our team will confirm shortly.</p>
        <button onClick={() => { setSent(false); setCart({}); setForm({ name: "", phone: "", date: "", time: "" }); }}
          style={{ background: COLORS.orange, color: "#fff", border: "none", borderRadius: 50, padding: "12px 28px", fontWeight: 700, cursor: "pointer" }}>
          New Order
        </button>
      </div>
    </section>
  );

  return (
    <section style={{ padding: "80px 5vw", background: COLORS.softWhite }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span style={{ color: COLORS.orange, fontWeight: 600, fontSize: 14, textTransform: "uppercase", letterSpacing: 2 }}>Pre-Order</span>
          <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(24px,4vw,40px)", fontWeight: 800, color: COLORS.brown, marginTop: 8 }}>Online Pickup Order</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {/* Quick items */}
          <div>
            <h3 style={{ fontFamily: "'Poppins',sans-serif", color: COLORS.brown, marginBottom: 16 }}>Select Items</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {quickItems.map(item => (
                <div key={item.name} style={{
                  background: "#fff", borderRadius: 12, padding: "12px 16px",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  border: `1px solid ${COLORS.orange}20`,
                }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13, color: COLORS.brown }}>{item.name}</div>
                    <div style={{ color: COLORS.orange, fontWeight: 700, fontSize: 14 }}>₹{item.price}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button onClick={() => removeItem(item.name)} style={{ width: 28, height: 28, borderRadius: 50, background: "#f0f0f0", border: "none", fontSize: 18, cursor: "pointer" }}>−</button>
                    <span style={{ minWidth: 20, textAlign: "center", fontWeight: 700 }}>{cart[item.name]?.qty || 0}</span>
                    <button onClick={() => addItem(item.name, item.price)} style={{ width: 28, height: 28, borderRadius: 50, background: COLORS.orange, color: "#fff", border: "none", fontSize: 18, cursor: "pointer" }}>+</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order form */}
          <div>
            <h3 style={{ fontFamily: "'Poppins',sans-serif", color: COLORS.brown, marginBottom: 16 }}>Your Details</h3>
            <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: `1px solid ${COLORS.orange}20` }}>
              {["name", "phone", "date", "time"].map(f => (
                <div key={f} style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: COLORS.brown, display: "block", marginBottom: 5 }}>
                    {f === "name" ? "Your Name" : f === "phone" ? "Phone Number" : f === "date" ? "Pickup Date" : "Pickup Time"}
                  </label>
                  <input
                    type={f === "date" ? "date" : f === "time" ? "time" : f === "phone" ? "tel" : "text"}
                    value={form[f]}
                    onChange={e => setForm(x => ({ ...x, [f]: e.target.value }))}
                    style={{
                      width: "100%", padding: "10px 14px", borderRadius: 10,
                      border: `1px solid ${COLORS.orange}30`, fontSize: 14, outline: "none", color: COLORS.brown,
                    }}
                  />
                </div>
              ))}

              {/* Cart summary */}
              {Object.keys(cart).length > 0 && (
                <div style={{ background: COLORS.cream, borderRadius: 10, padding: "12px 16px", marginBottom: 16 }}>
                  <div style={{ fontWeight: 700, marginBottom: 8, color: COLORS.brown, fontSize: 13 }}>Order Summary</div>
                  {Object.entries(cart).map(([n, v]) => (
                    <div key={n} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#555", marginBottom: 4 }}>
                      <span>{n.length > 28 ? n.slice(0, 28) + "…" : n} ×{v.qty}</span>
                      <span>₹{v.qty * v.price}</span>
                    </div>
                  ))}
                  <div style={{ borderTop: `1px solid ${COLORS.orange}30`, marginTop: 8, paddingTop: 8, display: "flex", justifyContent: "space-between", fontWeight: 800, color: COLORS.brown }}>
                    <span>Total</span><span>₹{total}</span>
                  </div>
                </div>
              )}

              <button onClick={placeOrder} style={{
                width: "100%", background: "#25D366", color: "#fff",
                border: "none", borderRadius: 12, padding: "14px",
                fontWeight: 700, fontSize: 15, cursor: "pointer",
              }}>
                💬 Send Order via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  const [idx, setIdx] = useState(0);
  const [submitMode, setSubmitMode] = useState(false);
  const [newReview, setNewReview] = useState({ name: "", rating: 5, text: "" });
  const [submitted, setSubmitted] = useState(false);

  return (
    <section style={{ padding: "80px 5vw", background: COLORS.cream }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span style={{ color: COLORS.orange, fontWeight: 600, fontSize: 14, textTransform: "uppercase", letterSpacing: 2 }}>What Guests Say</span>
          <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(24px,4vw,40px)", fontWeight: 800, color: COLORS.brown, marginTop: 8 }}>
            Customer Reviews
          </h2>
        </div>

        {/* Reviews carousel */}
        <div style={{ position: "relative" }}>
          <div style={{
            background: "#fff", borderRadius: 24, padding: "40px 40px 32px",
            border: `1px solid ${COLORS.orange}20`,
            boxShadow: `0 8px 32px ${COLORS.orange}15`,
            textAlign: "center", maxWidth: 600, margin: "0 auto",
          }}>
            <StarRating rating={reviews[idx].rating} size={24} />
            <p style={{ color: "#444", fontSize: 17, lineHeight: 1.7, margin: "20px 0", fontStyle: "italic" }}>
              "{reviews[idx].text}"
            </p>
            <div style={{ fontWeight: 700, color: COLORS.brown }}>{reviews[idx].name}</div>
            <div style={{ color: "#aaa", fontSize: 13 }}>{reviews[idx].location}</div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 20 }}>
            {reviews.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} style={{
                width: i === idx ? 24 : 8, height: 8, borderRadius: 50,
                background: i === idx ? COLORS.orange : "#ddd", border: "none", cursor: "pointer",
                transition: "all 0.3s",
              }} />
            ))}
          </div>
        </div>

        {/* Submit review */}
        {!submitted ? (
          <div style={{ textAlign: "center", marginTop: 32 }}>
            {!submitMode ? (
              <button onClick={() => setSubmitMode(true)} style={{
                background: COLORS.orange, color: "#fff", border: "none",
                borderRadius: 50, padding: "10px 24px", fontWeight: 600, cursor: "pointer",
              }}>✍️ Write a Review</button>
            ) : (
              <div style={{ background: "#fff", borderRadius: 16, padding: 24, maxWidth: 500, margin: "0 auto", border: `1px solid ${COLORS.orange}20` }}>
                {[
                  { f: "name", label: "Your Name", type: "text" },
                  { f: "text", label: "Your Review", type: "textarea" },
                ].map(({ f, label, type }) => (
                  <div key={f} style={{ marginBottom: 14, textAlign: "left" }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: COLORS.brown, display: "block", marginBottom: 5 }}>{label}</label>
                    {type === "textarea" ? (
                      <textarea value={newReview[f]} onChange={e => setNewReview(x => ({ ...x, [f]: e.target.value }))}
                        rows={3} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: `1px solid ${COLORS.orange}30`, fontSize: 14, resize: "vertical" }} />
                    ) : (
                      <input value={newReview[f]} onChange={e => setNewReview(x => ({ ...x, [f]: e.target.value }))}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: `1px solid ${COLORS.orange}30`, fontSize: 14 }} />
                    )}
                  </div>
                ))}
                <button onClick={() => setSubmitted(true)} style={{
                  background: COLORS.orange, color: "#fff", border: "none", borderRadius: 50,
                  padding: "10px 24px", fontWeight: 600, cursor: "pointer",
                }}>Submit Review</button>
              </div>
            )}
          </div>
        ) : (
          <p style={{ textAlign: "center", color: "#25D366", fontWeight: 600, marginTop: 24 }}>✅ Thank you for your review!</p>
        )}
      </div>
    </section>
  );
}

function GallerySection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const cats = ["All", "Mandi", "Seafood", "Desserts", "Starters", "Interior"];
  const filtered = activeFilter === "All" ? galleryItems : galleryItems.filter(g => g.cat === activeFilter);

  return (
    <section style={{ padding: "80px 5vw", background: COLORS.softWhite }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span style={{ color: COLORS.orange, fontWeight: 600, fontSize: 14, textTransform: "uppercase", letterSpacing: 2 }}>Gallery</span>
          <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(24px,4vw,40px)", fontWeight: 800, color: COLORS.brown, marginTop: 8 }}>
            From Our Kitchen
          </h2>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 32 }}>
          {cats.map(c => (
            <button key={c} onClick={() => setActiveFilter(c)} style={{
              padding: "7px 18px", borderRadius: 50, border: `1.5px solid ${activeFilter === c ? COLORS.orange : "#ddd"}`,
              background: activeFilter === c ? COLORS.orange : "#fff",
              color: activeFilter === c ? "#fff" : COLORS.brown,
              fontWeight: 600, fontSize: 13, cursor: "pointer", transition: "all 0.2s",
            }}>{c}</button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
          {filtered.map((item, i) => (
            <div key={i} style={{
              background: `linear-gradient(135deg, ${COLORS.brown}ee, ${COLORS.orange}88)`,
              borderRadius: 16, aspectRatio: i % 3 === 0 ? "1/1.3" : "1",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "transform 0.2s",
              overflow: "hidden", position: "relative",
            }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              <span style={{ fontSize: 52 }}>{item.emoji}</span>
              <span style={{ color: COLORS.cream, fontSize: 12, fontWeight: 600, marginTop: 8, textAlign: "center", padding: "0 12px" }}>{item.label}</span>
              <span style={{
                position: "absolute", top: 10, right: 10,
                background: COLORS.orange, color: "#fff", fontSize: 10,
                padding: "2px 8px", borderRadius: 50, fontWeight: 700,
              }}>{item.cat}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LoyaltySection() {
  const [phone, setPhone] = useState("");
  const [joined, setJoined] = useState(false);

  return (
    <section style={{ padding: "80px 5vw", background: `linear-gradient(135deg, ${COLORS.brown}, #1C0F0A)` }}>
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <span style={{ background: COLORS.gold, color: COLORS.brown, borderRadius: 50, padding: "4px 16px", fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>
          👑 Loyalty Program
        </span>
        <h2 style={{ fontFamily: "'Poppins',sans-serif", color: COLORS.gold, fontSize: "clamp(24px,4vw,40px)", fontWeight: 800, margin: "16px 0 12px" }}>
          Every 10th Meal Free
        </h2>
        <p style={{ color: COLORS.cream, opacity: 0.85, fontSize: 16, lineHeight: 1.7, marginBottom: 36 }}>
          Join our loyalty club and get rewarded for dining with us. Earn points on every visit, enjoy birthday discounts, and get your 10th meal absolutely free!
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
          {[
            { icon: "🎁", title: "10th Meal Free", desc: "Dine 9 times, the 10th is on us" },
            { icon: "🎂", title: "Birthday Discount", desc: "10% off all of birthday month" },
            { icon: "🌙", title: "Festival Offers", desc: "Eid, Diwali & more special deals" },
          ].map(b => (
            <div key={b.title} style={{
              background: "rgba(255,255,255,0.08)", border: `1px solid ${COLORS.gold}30`,
              borderRadius: 16, padding: "24px 20px", maxWidth: 200, flex: "1 1 180px",
            }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>{b.icon}</div>
              <div style={{ color: COLORS.gold, fontWeight: 700, marginBottom: 6 }}>{b.title}</div>
              <div style={{ color: COLORS.cream, opacity: 0.7, fontSize: 13 }}>{b.desc}</div>
            </div>
          ))}
        </div>

        {!joined ? (
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <input
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="Enter your mobile number"
              type="tel"
              style={{
                padding: "12px 20px", borderRadius: 50, border: `1.5px solid ${COLORS.gold}50`,
                background: "rgba(255,255,255,0.1)", color: "#fff", fontSize: 15, minWidth: 240,
                outline: "none",
              }}
            />
            <button onClick={() => { if (phone.length >= 10) setJoined(true); }}
              style={{
                background: COLORS.gold, color: COLORS.brown, border: "none",
                borderRadius: 50, padding: "12px 28px", fontWeight: 800, fontSize: 15, cursor: "pointer",
              }}>
              Join Now
            </button>
          </div>
        ) : (
          <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 16, padding: "24px 32px", display: "inline-block" }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>🎉</div>
            <div style={{ color: COLORS.gold, fontWeight: 800, fontSize: 20 }}>Welcome to Mandi Bistro Loyalty!</div>
            <div style={{ color: COLORS.cream, marginTop: 8 }}>Your number {phone} has been registered. Start earning today!</div>
          </div>
        )}
      </div>
    </section>
  );
}

function ContactSection() {
  const [feedback, setFeedback] = useState({ name: "", phone: "", rating: 5, comments: "" });
  const [fbSent, setFbSent] = useState(false);

  return (
    <section style={{ padding: "80px 5vw", background: COLORS.cream }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{ color: COLORS.orange, fontWeight: 600, fontSize: 14, textTransform: "uppercase", letterSpacing: 2 }}>Find Us</span>
          <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(24px,4vw,40px)", fontWeight: 800, color: COLORS.brown, marginTop: 8 }}>
            Contact & Location
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
          {/* Contact info */}
          <div>
            <div style={{ background: "#fff", borderRadius: 20, padding: "28px 28px", border: `1px solid ${COLORS.orange}20`, marginBottom: 20 }}>
              <h3 style={{ fontFamily: "'Poppins',sans-serif", color: COLORS.brown, marginBottom: 20 }}>Contact Us</h3>
              {[
                { icon: "📍", label: "Address", value: "NH 65, Sri Durga Colony, Madeenaguda, Miyapur, Hyderabad – 500049" },
                { icon: "🕐", label: "Hours", value: "Daily: 12:00 PM – 1:00 AM" },
                { icon: "📞", label: "Phone", value: "+91 99999 99999" },
                { icon: "✉️", label: "Email", value: "info@mandibistro.in" },
              ].map(c => (
                <div key={c.label} style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize: 12, color: "#999", marginBottom: 2 }}>{c.label}</div>
                    <div style={{ color: COLORS.brown, fontSize: 14, fontWeight: 500 }}>{c.value}</div>
                  </div>
                </div>
              ))}
              <div style={{ display: "flex", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
                <WhatsAppBtn text="WhatsApp Us" small />
                <a href="https://maps.google.com/?q=Mandi+Bistro+Miyapur+Hyderabad" target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, background: COLORS.orange, color: "#fff", borderRadius: 50, padding: "7px 16px", textDecoration: "none", fontSize: 13, fontWeight: 600 }}>
                  🗺 Directions
                </a>
              </div>
            </div>

            {/* Map placeholder */}
            <div style={{
              background: `linear-gradient(135deg, ${COLORS.brown}dd, ${COLORS.orange}55)`,
              borderRadius: 16, height: 200, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", cursor: "pointer",
            }}
              onClick={() => window.open("https://maps.google.com/?q=Mandi+Bistro+Miyapur+Hyderabad", "_blank")}
            >
              <span style={{ fontSize: 48, marginBottom: 12 }}>📍</span>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>Mandi Bistro, Miyapur</span>
              <span style={{ color: COLORS.cream, opacity: 0.7, fontSize: 13, marginTop: 4 }}>Click to open in Google Maps</span>
            </div>
          </div>

          {/* Feedback form */}
          <div>
            <div style={{ background: "#fff", borderRadius: 20, padding: "28px 28px", border: `1px solid ${COLORS.orange}20` }}>
              <h3 style={{ fontFamily: "'Poppins',sans-serif", color: COLORS.brown, marginBottom: 20 }}>Share Feedback</h3>
              {!fbSent ? (
                <>
                  {["name", "phone"].map(f => (
                    <div key={f} style={{ marginBottom: 14 }}>
                      <label style={{ fontSize: 13, fontWeight: 600, color: COLORS.brown, display: "block", marginBottom: 5 }}>
                        {f === "name" ? "Your Name" : "Phone Number"}
                      </label>
                      <input value={feedback[f]} onChange={e => setFeedback(x => ({ ...x, [f]: e.target.value }))}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: `1px solid ${COLORS.orange}30`, fontSize: 14 }} />
                    </div>
                  ))}
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: COLORS.brown, display: "block", marginBottom: 5 }}>Rating</label>
                    <div style={{ display: "flex", gap: 8 }}>
                      {[1, 2, 3, 4, 5].map(r => (
                        <button key={r} onClick={() => setFeedback(x => ({ ...x, rating: r }))}
                          style={{ fontSize: 24, background: "none", border: "none", cursor: "pointer", opacity: r <= feedback.rating ? 1 : 0.3 }}>
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: COLORS.brown, display: "block", marginBottom: 5 }}>Comments</label>
                    <textarea value={feedback.comments} onChange={e => setFeedback(x => ({ ...x, comments: e.target.value }))}
                      rows={4} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: `1px solid ${COLORS.orange}30`, fontSize: 14, resize: "vertical" }} />
                  </div>
                  <button onClick={() => setFbSent(true)} style={{
                    width: "100%", background: COLORS.orange, color: "#fff",
                    border: "none", borderRadius: 12, padding: "14px", fontWeight: 700, cursor: "pointer",
                  }}>Submit Feedback</button>
                </>
              ) : (
                <div style={{ textAlign: "center", padding: "32px 0" }}>
                  <div style={{ fontSize: 56, marginBottom: 12 }}>🙏</div>
                  <div style={{ color: COLORS.brown, fontWeight: 700, fontSize: 18 }}>Thank you for your feedback!</div>
                  <p style={{ color: "#888", marginTop: 8 }}>We'll use it to serve you better.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={{ background: COLORS.darkBrown, padding: "48px 5vw 24px", borderTop: `3px solid ${COLORS.orange}` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32, marginBottom: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <span style={{ fontSize: 28 }}>🥘</span>
              <span style={{ color: COLORS.gold, fontWeight: 800, fontSize: 18 }}>Mandi Bistro</span>
            </div>
            <p style={{ color: COLORS.cream, opacity: 0.7, fontSize: 13, lineHeight: 1.7 }}>
              Authentic Arabian Mandi & Kabsa in the heart of Miyapur, Hyderabad. Open daily 12PM–1AM.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
              {["📘", "📸", "🐦", "▶️"].map((icon, i) => (
                <span key={i} style={{ fontSize: 20, cursor: "pointer", opacity: 0.7 }}>{icon}</span>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ color: COLORS.gold, fontFamily: "'Poppins',sans-serif", marginBottom: 16 }}>Quick Links</h4>
            {["Home", "About", "Menu", "Gallery", "Order", "Contact"].map(l => (
              <button key={l} onClick={() => setPage(l.toLowerCase())} style={{
                display: "block", background: "none", border: "none",
                color: COLORS.cream, opacity: 0.7, fontSize: 14, padding: "4px 0",
                cursor: "pointer", textAlign: "left",
              }}>{l}</button>
            ))}
          </div>

          <div>
            <h4 style={{ color: COLORS.gold, fontFamily: "'Poppins',sans-serif", marginBottom: 16 }}>Menu Categories</h4>
            {["Chicken Mandi", "Mutton Mandi", "Combo Mandi", "Veg Mandi", "Starters", "Desserts"].map(c => (
              <div key={c} style={{ color: COLORS.cream, opacity: 0.7, fontSize: 14, padding: "4px 0" }}>{c}</div>
            ))}
          </div>

          <div>
            <h4 style={{ color: COLORS.gold, fontFamily: "'Poppins',sans-serif", marginBottom: 16 }}>Visit Us</h4>
            <p style={{ color: COLORS.cream, opacity: 0.7, fontSize: 13, lineHeight: 1.8, marginBottom: 16 }}>
              NH 65, Sri Durga Colony,<br />Madeenaguda, Miyapur,<br />Hyderabad – 500049
            </p>
            <WhatsAppBtn text="Order Now" small />
          </div>
        </div>

        <div style={{ borderTop: `1px solid rgba(255,255,255,0.1)`, paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ color: COLORS.cream, opacity: 0.5, fontSize: 13 }}>© 2025 Mandi Bistro. All rights reserved.</p>
          <p style={{ color: COLORS.cream, opacity: 0.5, fontSize: 12 }}>Best Mandi in Miyapur | Arabian Restaurant Hyderabad</p>
        </div>
      </div>
    </footer>
  );
}

function LeadPopup({ onClose }) {
  const [form, setForm] = useState({ name: "", phone: "", birthday: "" });
  const [done, setDone] = useState(false);

  if (done) return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#fff", borderRadius: 24, padding: "40px 36px", maxWidth: 380, textAlign: "center" }}>
        <div style={{ fontSize: 64, marginBottom: 12 }}>🎉</div>
        <h3 style={{ fontFamily: "'Poppins',sans-serif", color: COLORS.brown }}>You're on the list!</h3>
        <p style={{ color: "#777", margin: "12px 0 20px" }}>Get ready for exclusive Mandi Bistro offers and birthday surprises!</p>
        <button onClick={onClose} style={{ background: COLORS.orange, color: "#fff", border: "none", borderRadius: 50, padding: "10px 24px", fontWeight: 700, cursor: "pointer" }}>
          Let's Eat!
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: "#fff", borderRadius: 24, padding: "36px 32px", maxWidth: 400, width: "100%", position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#aaa" }}>✕</button>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <span style={{ fontSize: 48 }}>🎁</span>
          <h3 style={{ fontFamily: "'Poppins',sans-serif", color: COLORS.brown, marginTop: 12, marginBottom: 8 }}>Get Exclusive Offers</h3>
          <p style={{ color: "#888", fontSize: 14 }}>Sign up for birthday discounts, festival offers, and loyalty rewards from Mandi Bistro!</p>
        </div>
        {[
          { f: "name", label: "Your Name", type: "text" },
          { f: "phone", label: "Mobile Number", type: "tel" },
          { f: "birthday", label: "Birthday (Optional)", type: "date" },
        ].map(({ f, label, type }) => (
          <div key={f} style={{ marginBottom: 14 }}>
            <input type={type} placeholder={label} value={form[f]}
              onChange={e => setForm(x => ({ ...x, [f]: e.target.value }))}
              style={{ width: "100%", padding: "11px 16px", borderRadius: 10, border: `1px solid ${COLORS.orange}30`, fontSize: 14, outline: "none" }} />
          </div>
        ))}
        <button onClick={() => { if (form.name && form.phone) setDone(true); }}
          style={{ width: "100%", background: COLORS.orange, color: "#fff", border: "none", borderRadius: 50, padding: "13px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
          🎉 Claim My Offers
        </button>
      </div>
    </div>
  );
}

export default function MandiBistro() {
  const [page, setPage] = useState("home");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowPopup(true), 15000);
    return () => clearTimeout(t);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    scrollToTop();
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case "home": return (
        <>
          <HeroSection setPage={setPage} />
          <AboutSection />
          <TodaySpecial />
          <SignatureDishes />
          <ReviewsSection />
          <LoyaltySection />
          <GallerySection />
          <ContactSection />
        </>
      );
      case "about": return <AboutSection />;
      case "menu": return <MenuSection />;
      case "gallery": return <GallerySection />;
      case "order": return <OrderSection />;
      case "contact": return <ContactSection />;
      default: return <HeroSection setPage={setPage} />;
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: COLORS.softWhite, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        input, textarea, select { font-family: 'Inter', sans-serif; }
        h1,h2,h3,h4,h5 { font-family: 'Poppins', sans-serif; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.orange}; border-radius: 3px; }
      `}</style>

      <NavBar activeSection={page} setPage={setPage} />
      <div style={{ paddingTop: 60 }}>
        {renderPage()}
      </div>
      <Footer setPage={setPage} />

      {showPopup && <LeadPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
}
