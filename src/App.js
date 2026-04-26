import { useState } from "react";

// ─── données initiales ───────────────────────────────────────────────────────
const INITIAL_RECIPES = [
  {
    id: 1,
    name: "Hot Dog",
    unit: "pièce",
    ingredients: [
      { name: "Pains navettes", qty: 1, unit: "pièce", supplier: "Coup de Pâte" },
      { name: "Sauce ketchup", qty: 0.05, unit: "L", supplier: "Leclerc" },
      { name: "Sauce moutarde", qty: 0.05, unit: "L", supplier: "Leclerc" },
      { name: "Poche à douille", qty: 0.1, unit: "pièce", supplier: "Metro" },
      { name: "Oignons frits", qty: 0.05, unit: "pot", supplier: "Metro" },
    ],
  },
  {
    id: 2,
    name: "Tacos",
    unit: "pièce",
    ingredients: [
      { name: "Feuilles wraps", qty: 0.5, unit: "feuille", supplier: "Boucherie" },
      { name: "Poulet", qty: 16.67, unit: "g", supplier: "Boucherie" },
      { name: "Épices", qty: 1, unit: "pincée", supplier: "Metro" },
      { name: "Fromage hamburger", qty: 0.5, unit: "tranche", supplier: "Boucherie" },
    ],
  },
];

const SUPPLIER_COLORS = {
  "Coup de Pâte": "#e8d5b7",
  Leclerc: "#c8e6c9",
  Metro: "#bbdefb",
  Boucherie: "#f8bbd0",
};

function supplierColor(s) {
  return SUPPLIER_COLORS[s] || "#e0e0e0";
}

function formatQty(n) {
  if (n === 0) return "0";
  if (Number.isInteger(n)) return String(n);
  return parseFloat(n.toFixed(3)).toString();
}

// ─── Onboarding ───────────────────────────────────────────────────────────────
function OnboardingScreen({ onStart }) {
  const steps = [
    {
      num: "01",
      icon: "📖",
      title: "Créez votre catalogue de mignardises",
      desc: "Dans l'onglet Recettes, ajoutez chaque pièce que vous proposez. Pour chacune, renseignez les ingrédients par unité avec la quantité exacte.",
      example: "Ex : 1 Hot Dog = 1 pain navette + 0,05 L ketchup + …",
    },
    {
      num: "02",
      icon: "🏪",
      title: "Associez chaque ingrédient à son fournisseur",
      desc: "Pour chaque ingrédient, indiquez le fournisseur. L'app regroupera automatiquement les courses par fournisseur.",
      example: "Ex : Pains navettes → Coup de Pâte · Ketchup → Leclerc",
    },
    {
      num: "03",
      icon: "📋",
      title: "Composez votre buffet avant chaque événement",
      desc: "Dans l'onglet Événement, saisissez le nombre de pièces par mignardise. Les quantités se calculent instantanément.",
      example: "Ex : 20 Hot Dogs + 30 Tacos = liste complète en 1 clic",
    },
    {
      num: "04",
      icon: "🛒",
      title: "Générez et imprimez la liste de courses",
      desc: "La liste est triée par fournisseur, avec quantités exactes et cases à cocher. Imprimez ou utilisez sur téléphone.",
      example: "→ Coup de Pâte · → Leclerc · → Metro · → Boucherie",
    },
  ];

  return (
    <div style={{ fontFamily: "'Playfair Display', Georgia, serif", minHeight: "100vh", background: "#faf8f5" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; } body { margin: 0; }
        .step-card { transition: transform .2s, box-shadow .2s; }
        .step-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.10) !important; }
        .start-btn:hover { background: #2d1f0a !important; transform: scale(1.02); }
        @media (max-width: 600px) { .steps-grid { grid-template-columns: 1fr !important; } .hero-title { font-size: 32px !important; } }
      `}</style>

      <div style={{ background: "#1a1208", color: "#f5e9c9", padding: "60px 32px 50px", textAlign: "center" }}>
        <div style={{ fontSize: 52, marginBottom: 16 }}>🍽️</div>
        <h1 style={{ fontFamily: "'Playfair Display'", fontSize: 42, fontWeight: 900, margin: "0 0 12px", letterSpacing: -1 }} className="hero-title">
          ListeChef
        </h1>
        <p style={{ fontFamily: "'DM Sans'", fontSize: 18, color: "#c9b97a", margin: "0 0 8px" }}>
          Générateur de listes de courses pour traiteurs événementiels
        </p>
        <p style={{ fontFamily: "'DM Sans'", fontSize: 15, color: "#a89060", maxWidth: 520, margin: "0 auto" }}>
          Fini les listes fastidieuses avant chaque buffet. Paramétrez vos recettes une fois, générez votre liste en quelques secondes.
        </p>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px" }}>
        <h2 style={{ fontFamily: "'Playfair Display'", fontSize: 26, textAlign: "center", marginBottom: 8 }}>
          Comment paramétrer l'application ?
        </h2>
        <p style={{ fontFamily: "'DM Sans'", fontSize: 15, color: "#888", textAlign: "center", marginBottom: 40 }}>
          Suivez ces 4 étapes simples pour être opérationnel en moins de 10 minutes.
        </p>

        <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 40 }}>
          {steps.map((s, i) => (
            <div key={i} className="step-card" style={{ background: "#fff", border: "1.5px solid #e8e0d0", borderRadius: 14, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{ background: "#1a1208", color: "#c9b97a", borderRadius: 8, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
                  {s.num}
                </div>
                <span style={{ fontSize: 22 }}>{s.icon}</span>
                <h3 style={{ margin: 0, fontFamily: "'Playfair Display'", fontSize: 15, lineHeight: 1.3 }}>{s.title}</h3>
              </div>
              <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: "#555", lineHeight: 1.6, margin: "0 0 10px" }}>{s.desc}</p>
              <div style={{ background: "#faf8f5", borderLeft: "3px solid #c9b97a", padding: "8px 12px", borderRadius: "0 6px 6px 0", fontFamily: "'DM Sans'", fontSize: 12, color: "#7a6a40", fontStyle: "italic" }}>
                {s.example}
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "#fffbf0", border: "1.5px solid #e8d5a0", borderRadius: 12, padding: "18px 24px", marginBottom: 40, display: "flex", gap: 14, alignItems: "flex-start" }}>
          <span style={{ fontSize: 24, flexShrink: 0 }}>💡</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Astuce de démarrage</div>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: "#555", margin: 0, lineHeight: 1.6 }}>
              L'application est pré-chargée avec deux exemples (<b>Hot Dog</b> et <b>Tacos</b>). Explorez-les dans l'onglet <b>Recettes</b> pour comprendre la structure, puis modifiez-les ou ajoutez vos propres mignardises.
            </p>
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <button className="start-btn" onClick={onStart} style={{ background: "#1a1208", color: "#f5e9c9", border: "none", borderRadius: 12, padding: "18px 52px", fontSize: 18, fontWeight: 700, fontFamily: "'DM Sans'", cursor: "pointer", boxShadow: "0 4px 16px rgba(26,18,8,0.25)", transition: "all .2s" }}>
            Commencer à paramétrer →
          </button>
          <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: "#aaa", marginTop: 12 }}>
            Aucune inscription requise · Tout reste sur votre appareil
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Badge fournisseur ────────────────────────────────────────────────────────
function Badge({ supplier }) {
  return (
    <span style={{ background: supplierColor(supplier), color: "#333", borderRadius: 4, padding: "2px 8px", fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase" }}>
      {supplier}
    </span>
  );
}

// ─── Formulaire recette ───────────────────────────────────────────────────────
function RecipeForm({ recipe, onSave, onCancel }) {
  const [form, setForm] = useState(JSON.parse(JSON.stringify(recipe)));

  function updateIngredient(i, field, value) {
    const ings = [...form.ingredients];
    ings[i] = { ...ings[i], [field]: field === "qty" ? parseFloat(value) || 0 : value };
    setForm({ ...form, ingredients: ings });
  }

  return (
    <div style={{ background: "#fff", border: "2px solid #c9b97a", borderRadius: 12, padding: 24, marginBottom: 24 }}>
      <h3 style={{ margin: "0 0 16px", fontFamily: "'Playfair Display'", fontSize: 18 }}>
        {form.id ? "Modifier" : "Nouvelle"} recette
      </h3>
      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nom du plat"
          style={{ flex: 2, minWidth: 160, padding: "10px 14px", border: "1.5px solid #e8e0d0", borderRadius: 8, fontSize: 15 }} />
        <input value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} placeholder="Unité (ex: pièce)"
          style={{ flex: 1, minWidth: 100, padding: "10px 14px", border: "1.5px solid #e8e0d0", borderRadius: 8, fontSize: 15 }} />
      </div>

      <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 14 }}>Ingrédients (par unité de plat)</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
        {form.ingredients.map((ing, i) => (
          <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <input value={ing.name} onChange={(e) => updateIngredient(i, "name", e.target.value)} placeholder="Ingrédient"
              style={{ flex: 2, minWidth: 120, padding: "8px 12px", border: "1.5px solid #e8e0d0", borderRadius: 8, fontSize: 14 }} />
            <input type="number" value={ing.qty} onChange={(e) => updateIngredient(i, "qty", e.target.value)} placeholder="Qté"
              style={{ width: 70, padding: "8px 10px", border: "1.5px solid #e8e0d0", borderRadius: 8, fontSize: 14, textAlign: "center" }} />
            <input value={ing.unit} onChange={(e) => updateIngredient(i, "unit", e.target.value)} placeholder="Unité"
              style={{ width: 80, padding: "8px 10px", border: "1.5px solid #e8e0d0", borderRadius: 8, fontSize: 14 }} />
            <input value={ing.supplier} onChange={(e) => updateIngredient(i, "supplier", e.target.value)} placeholder="Fournisseur"
              style={{ flex: 1, minWidth: 100, padding: "8px 12px", border: "1.5px solid #e8e0d0", borderRadius: 8, fontSize: 14 }} />
            <button onClick={() => setForm({ ...form, ingredients: form.ingredients.filter((_, idx) => idx !== i) })}
              style={{ background: "#fdecea", border: "none", borderRadius: 6, padding: "8px 12px", color: "#c62828", fontWeight: 700, cursor: "pointer" }}>✕</button>
          </div>
        ))}
      </div>
      <button onClick={() => setForm({ ...form, ingredients: [...form.ingredients, { name: "", qty: 1, unit: "pièce", supplier: "" }] })}
        style={{ background: "#f5f0e8", border: "1.5px dashed #c9b97a", borderRadius: 8, padding: "8px 18px", fontSize: 14, fontWeight: 600, marginBottom: 16, cursor: "pointer" }}>
        + Ajouter un ingrédient
      </button>

      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={() => onSave(form)} style={{ background: "#1a1208", color: "#f5e9c9", border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
          💾 Sauvegarder
        </button>
        <button onClick={onCancel} style={{ background: "#f5f0e8", border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 600, fontSize: 15, cursor: "pointer" }}>
          Annuler
        </button>
      </div>
    </div>
  );
}

// ─── App principale ───────────────────────────────────────────────────────────
export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [recipes, setRecipes] = useState(INITIAL_RECIPES);
  const [event, setEvent] = useState([]);
  const [view, setView] = useState("recipes");
  const [newRecipe, setNewRecipe] = useState(null);
  const [editRecipeId, setEditRecipeId] = useState(null);

  if (showOnboarding) return <OnboardingScreen onStart={() => setShowOnboarding(false)} />;

  function computeList() {
    const map = {};
    for (const item of event) {
      const recipe = recipes.find((r) => r.id === item.recipeId);
      if (!recipe || !item.qty) continue;
      for (const ing of recipe.ingredients) {
        const key = `${ing.name}|${ing.unit}|${ing.supplier}`;
        if (!map[key]) map[key] = { name: ing.name, unit: ing.unit, supplier: ing.supplier, qty: 0 };
        map[key].qty += ing.qty * item.qty;
      }
    }
    const bySupplier = {};
    for (const v of Object.values(map)) {
      if (!bySupplier[v.supplier]) bySupplier[v.supplier] = [];
      bySupplier[v.supplier].push(v);
    }
    return bySupplier;
  }

  function saveRecipe(r) {
    if (r.id) setRecipes((prev) => prev.map((x) => (x.id === r.id ? r : x)));
    else setRecipes((prev) => [...prev, { ...r, id: Date.now() }]);
    setNewRecipe(null);
    setEditRecipeId(null);
  }

  function deleteRecipe(id) {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
    setEvent((prev) => prev.filter((e) => e.recipeId !== id));
  }

  const shoppingList = computeList();
  const suppliers = Object.keys(shoppingList);
  const totalItems = event.reduce((s, e) => s + (e.qty || 0), 0);

  return (
    <div style={{ fontFamily: "'Playfair Display', Georgia, serif", minHeight: "100vh", background: "#faf8f5" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; } body { margin: 0; }
        button { cursor: pointer; font-family: 'DM Sans', sans-serif; }
        input { font-family: 'DM Sans', sans-serif; }
        .tab-btn:hover { opacity: .8; }
        .row-hover:hover { background: #f5f0e8 !important; }
        @media print { .no-print { display: none !important; } }
        @media (max-width: 600px) { .main-pad { padding: 20px 16px !important; } .header-pad { padding: 20px 16px 0 !important; } }
      `}</style>

      {/* Header */}
      <header style={{ background: "#1a1208", color: "#f5e9c9", padding: "28px 40px 0" }} className="header-pad">
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 16, marginBottom: 24 }}>
            <span style={{ fontSize: 38 }}>🍽️</span>
            <div>
              <div style={{ fontFamily: "'Playfair Display'", fontSize: 28, fontWeight: 900, lineHeight: 1 }}>ListeChef</div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: "#c9b97a", marginTop: 4 }}>Générateur de listes de courses traiteur</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {[
              { id: "event", label: "Événement", icon: "📋" },
              { id: "recipes", label: "Recettes", icon: "📖" },
              { id: "list", label: `Liste${suppliers.length ? ` (${suppliers.length})` : ""}`, icon: "🛒" },
            ].map((t) => (
              <button key={t.id} className="tab-btn" onClick={() => setView(t.id)} style={{ background: view === t.id ? "#f5e9c9" : "transparent", color: view === t.id ? "#1a1208" : "#c9b97a", border: "none", padding: "10px 20px", borderRadius: "8px 8px 0 0", fontWeight: 600, fontSize: 14, transition: "all .2s" }}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "32px 40px" }} className="main-pad">

        {/* ── ÉVÉNEMENT ── */}
        {view === "event" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2 style={{ margin: 0, fontFamily: "'Playfair Display'", fontSize: 22 }}>Composition du buffet</h2>
              {totalItems > 0 && (
                <div style={{ background: "#1a1208", color: "#f5e9c9", borderRadius: 20, padding: "6px 16px", fontSize: 14, fontFamily: "'DM Sans'" }}>
                  {totalItems} mignardises
                </div>
              )}
            </div>
            {recipes.length === 0 ? (
              <div style={{ textAlign: "center", padding: 40, color: "#999", fontFamily: "'DM Sans'" }}>
                Aucune recette. <button onClick={() => setView("recipes")} style={{ background: "none", border: "none", color: "#c9b97a", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>Créez vos recettes d'abord →</button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                {recipes.map((recipe) => {
                  const existing = event.find((e) => e.recipeId === recipe.id);
                  return (
                    <div key={recipe.id} className="row-hover" style={{ display: "flex", alignItems: "center", background: "#fff", border: "1.5px solid", borderColor: existing?.qty ? "#c9b97a" : "#e8e0d0", borderRadius: 10, padding: "14px 20px", gap: 16 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: 16 }}>{recipe.name}</div>
                        <div style={{ fontSize: 12, color: "#888", fontFamily: "'DM Sans'", marginTop: 2 }}>
                          {recipe.ingredients.length} ingrédient{recipe.ingredients.length > 1 ? "s" : ""} · {[...new Set(recipe.ingredients.map((i) => i.supplier))].join(", ")}
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <button onClick={() => { const qty = (existing?.qty || 0) - 1; if (qty <= 0) setEvent((p) => p.filter((e) => e.recipeId !== recipe.id)); else setEvent((p) => p.map((e) => e.recipeId === recipe.id ? { ...e, qty } : e)); }}
                          style={{ width: 32, height: 32, borderRadius: "50%", border: "1.5px solid #ddd", background: "#f5f0e8", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                        <input type="number" min="0" value={existing?.qty || ""} placeholder="0"
                          onChange={(e) => { const qty = parseInt(e.target.value) || 0; if (qty <= 0) setEvent((p) => p.filter((x) => x.recipeId !== recipe.id)); else if (existing) setEvent((p) => p.map((x) => x.recipeId === recipe.id ? { ...x, qty } : x)); else setEvent((p) => [...p, { recipeId: recipe.id, qty }]); }}
                          style={{ width: 56, textAlign: "center", border: "1.5px solid #ddd", borderRadius: 8, padding: "6px 4px", fontSize: 16, fontWeight: 700 }} />
                        <button onClick={() => { const qty = (existing?.qty || 0) + 1; if (existing) setEvent((p) => p.map((e) => e.recipeId === recipe.id ? { ...e, qty } : e)); else setEvent((p) => [...p, { recipeId: recipe.id, qty }]); }}
                          style={{ width: 32, height: 32, borderRadius: "50%", border: "1.5px solid #ddd", background: "#f5f0e8", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {event.length > 0 && (
              <button onClick={() => setView("list")} style={{ background: "#1a1208", color: "#f5e9c9", border: "none", borderRadius: 10, padding: "14px 32px", fontSize: 16, fontWeight: 700, width: "100%" }}>
                🛒 Générer la liste de courses →
              </button>
            )}
          </div>
        )}

        {/* ── RECETTES ── */}
        {view === "recipes" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2 style={{ margin: 0, fontFamily: "'Playfair Display'", fontSize: 22 }}>Bibliothèque de recettes</h2>
              <button onClick={() => { setNewRecipe({ id: null, name: "", unit: "pièce", ingredients: [] }); setEditRecipeId(null); }}
                style={{ background: "#1a1208", color: "#f5e9c9", border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 600, fontSize: 14 }}>
                + Nouvelle recette
              </button>
            </div>

            {(newRecipe !== null || editRecipeId !== null) && (
              <RecipeForm recipe={newRecipe || recipes.find((r) => r.id === editRecipeId)} onSave={saveRecipe} onCancel={() => { setNewRecipe(null); setEditRecipeId(null); }} />
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {recipes.map((recipe) => (
                <div key={recipe.id} style={{ background: "#fff", border: "1.5px solid #e8e0d0", borderRadius: 10, overflow: "hidden" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px" }}>
                    <div>
                      <span style={{ fontWeight: 700, fontSize: 16 }}>{recipe.name}</span>
                      <span style={{ color: "#999", fontSize: 13, marginLeft: 8, fontFamily: "'DM Sans'" }}>/ {recipe.unit}</span>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => { setEditRecipeId(recipe.id); setNewRecipe(null); }} style={{ background: "#f5f0e8", border: "none", borderRadius: 6, padding: "6px 14px", fontSize: 13, fontWeight: 600 }}>✏️ Modifier</button>
                      <button onClick={() => deleteRecipe(recipe.id)} style={{ background: "#fdecea", border: "none", borderRadius: 6, padding: "6px 14px", fontSize: 13, fontWeight: 600, color: "#c62828" }}>🗑 Suppr.</button>
                    </div>
                  </div>
                  <div style={{ padding: "0 20px 14px", display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {recipe.ingredients.map((ing, i) => (
                      <div key={i} style={{ background: "#faf8f5", border: "1px solid #e8e0d0", borderRadius: 6, padding: "4px 10px", fontSize: 12, fontFamily: "'DM Sans'" }}>
                        <b>{formatQty(ing.qty)} {ing.unit}</b> {ing.name} · <Badge supplier={ing.supplier} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── LISTE DE COURSES ── */}
        {view === "list" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h2 style={{ margin: 0, fontFamily: "'Playfair Display'", fontSize: 22 }}>Liste de courses</h2>
              <button className="no-print" onClick={() => window.print()} style={{ background: "#1a1208", color: "#f5e9c9", border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 600, fontSize: 14 }}>
                🖨️ Imprimer
              </button>
            </div>

            {event.length > 0 && (
              <div style={{ background: "#1a1208", color: "#f5e9c9", borderRadius: 10, padding: "14px 20px", marginBottom: 24, fontFamily: "'DM Sans'", fontSize: 14 }}>
                <b>Buffet :</b> {event.map((e) => { const r = recipes.find((x) => x.id === e.recipeId); return r ? `${e.qty} ${r.name}` : null; }).filter(Boolean).join(" · ")} · <b>{totalItems} mignardises</b>
              </div>
            )}

            {suppliers.length === 0 ? (
              <div style={{ textAlign: "center", color: "#999", fontFamily: "'DM Sans'", padding: 40 }}>
                Aucun plat sélectionné. <button onClick={() => setView("event")} style={{ background: "none", border: "none", color: "#c9b97a", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>Composez votre buffet →</button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {suppliers.map((supplier) => (
                  <div key={supplier} style={{ borderRadius: 10, overflow: "hidden", border: "1.5px solid #e8e0d0" }}>
                    <div style={{ background: supplierColor(supplier), padding: "12px 20px", fontWeight: 700, fontSize: 16, display: "flex", alignItems: "center", gap: 8 }}>
                      🏪 {supplier}
                      <span style={{ fontSize: 13, fontWeight: 400, color: "#555", fontFamily: "'DM Sans'" }}>— {shoppingList[supplier].length} article{shoppingList[supplier].length > 1 ? "s" : ""}</span>
                    </div>
                    <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", fontFamily: "'DM Sans'", fontSize: 14 }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid #e8e0d0" }}>
                          <th style={{ textAlign: "left", padding: "8px 20px", color: "#999", fontWeight: 600 }}>Ingrédient</th>
                          <th style={{ textAlign: "right", padding: "8px 20px", color: "#999", fontWeight: 600 }}>Quantité</th>
                          <th style={{ textAlign: "right", padding: "8px 20px", color: "#999", fontWeight: 600 }}>✓</th>
                        </tr>
                      </thead>
                      <tbody>
                        {shoppingList[supplier].map((ing, i) => (
                          <tr key={i} className="row-hover" style={{ borderBottom: i < shoppingList[supplier].length - 1 ? "1px solid #f0ebe0" : "none" }}>
                            <td style={{ padding: "10px 20px", fontWeight: 500 }}>{ing.name}</td>
                            <td style={{ padding: "10px 20px", textAlign: "right", fontWeight: 700, color: "#1a1208" }}>{formatQty(ing.qty)} {ing.unit}</td>
                            <td style={{ padding: "10px 20px", textAlign: "right" }}>
                              <input type="checkbox" style={{ width: 18, height: 18, accentColor: "#1a1208" }} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
