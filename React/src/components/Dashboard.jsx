import { useState, useMemo } from "react";
import "./Dashboard.css";

const INITIAL_PRODUCTS = [
  { id: 1, name: "Sierra Structured Tee", rating: 4.5, description: "Heavyweight organic cotton with a crisp shoulder line.", price: "$48", category: "Essentials", badge: "Bestseller", colors: ["Ivory", "Charcoal", "Olive"], sizes: ["XS", "S", "M", "L"], image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80" },
  { id: 2, name: "Monroe Tapered Denim", rating: 4.8, description: "Soft-stretch selvedge denim with a refined taper.", price: "$118", category: "Denim", badge: "New", colors: ["Indigo", "Jet Black"], sizes: ["28", "30", "32", "34"], image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80" },
  { id: 3, name: "Cloudline Oversized Hoodie", rating: 4.2, description: "Brushed fleece interior with dropped shoulder silhouette.", price: "$86", category: "Streetwear", badge: "Limited", colors: ["Sand", "Bone", "Slate"], sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=80" },
  { id: 4, name: "Noir Moto Jacket", rating: 4.9, description: "Supple vegan leather with polished gunmetal hardware.", price: "$220", category: "Outerwear", badge: "Top Rated", colors: ["Black"], sizes: ["S", "M", "L"], image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80" },
  { id: 5, name: "Rosette Midi Dress", rating: 4.4, description: "Airy chiffon drape with a hand-painted floral print.", price: "$132", category: "Dresses", badge: "Editor Pick", colors: ["Rose", "Sky"], sizes: ["XS", "S", "M", "L"], image: "https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&w=900&q=80" },
  { id: 6, name: "Transit Cargo Joggers", rating: 4.1, description: "Tapered utility pants with hidden zip pocket details.", price: "$94", category: "Athleisure", badge: "Popular", colors: ["Khaki", "Stone", "Ink"], sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80" },
  { id: 7, name: "Haven Wool Overcoat", rating: 4.7, description: "Tailored longline overcoat made for layered city looks.", price: "$259", category: "Outerwear", badge: "Premium", colors: ["Camel", "Graphite"], sizes: ["S", "M", "L"], image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&w=900&q=80" },
  { id: 8, name: "Pulse Graphic Shirt", rating: 4.3, description: "Dense combed cotton featuring seasonal artwork print.", price: "$62", category: "Streetwear", badge: "Drop 03", colors: ["Washed Black", "Off White"], sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1484515991647-c5760fcecfc7?auto=format&fit=crop&w=900&q=80" },
  { id: 9, name: "Marina Linen Shirt", rating: 4.6, description: "Breathable weave with a clean resort-inspired fit.", price: "$89", category: "Shirts", badge: "Summer", colors: ["White", "Sea Blue", "Sage"], sizes: ["S", "M", "L"], image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80" },
  { id: 10, name: "Arc High-Rise Leggings", rating: 4.9, description: "Sculpting knit with matte finish and sweat-wick comfort.", price: "$74", category: "Athleisure", badge: "Top Rated", colors: ["Ebony", "Cocoa", "Steel"], sizes: ["XS", "S", "M", "L"], image: "https://images.unsplash.com/photo-1506629905607-d405b7a6e716?auto=format&fit=crop&w=900&q=80" },
  { id: 11, name: "Ridge Trucker Jacket", rating: 4.5, description: "Classic denim shell with brushed interior lining.", price: "$145", category: "Outerwear", badge: "Classic", colors: ["Blue Wash", "Ecru"], sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&w=900&q=80" },
  { id: 12, name: "North Knit Turtleneck", rating: 4.2, description: "Soft rib-knit profile with warm neck wrap design.", price: "$98", category: "Knitwear", badge: "Cold Weather", colors: ["Charcoal", "Sand", "Berry"], sizes: ["S", "M", "L"], image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=80" },
];

const CATEGORIES = ["All", "Essentials", "Denim", "Streetwear", "Outerwear", "Dresses", "Athleisure", "Shirts", "Knitwear", "Accessories", "Bottoms", "Occasion"];
const BADGES = ["", "Bestseller", "New", "Limited", "Top Rated", "Premium", "Popular", "Editor Pick", "Classic", "Cold Weather"];

const PAGE_SIZE = 8;

// Badge class mapping
function getBadgeClass(badge) {
  const map = {
    "Bestseller": "bestseller",
    "New": "new",
    "Limited": "limited",
    "Top Rated": "toprated",
  };
  return map[badge] || "";
}

// Stars renderer
function renderStars(rating) {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  return (
    <span className="table-rating">
      <span className="star-icon">★</span>
      {rating.toFixed(1)}
    </span>
  );
}

// ─── Create/Edit Modal ────────────────────────────────────────────────
function ProductModal({ product, onSave, onClose }) {
  const isEdit = Boolean(product?.id);
  const [form, setForm] = useState(
    product || {
      name: "",
      category: "Essentials",
      price: "",
      rating: 4.0,
      badge: "",
      description: "",
      colors: [],
      sizes: [],
      image: "",
    }
  );
  const [colorInput, setColorInput] = useState("");
  const [sizeInput, setSizeInput] = useState("");

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const addColor = () => {
    const v = colorInput.trim();
    if (v && !form.colors.includes(v)) {
      setForm((f) => ({ ...f, colors: [...f.colors, v] }));
    }
    setColorInput("");
  };

  const addSize = () => {
    const v = sizeInput.trim();
    if (v && !form.sizes.includes(v)) {
      setForm((f) => ({ ...f, sizes: [...f.sizes, v] }));
    }
    setSizeInput("");
  };

  const removeColor = (c) => setForm((f) => ({ ...f, colors: f.colors.filter((x) => x !== c) }));
  const removeSize = (s) => setForm((f) => ({ ...f, sizes: f.sizes.filter((x) => x !== s) }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSave({ ...form, id: product?.id || Date.now() });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEdit ? "Edit Product" : "New Product"}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Product Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={set("name")}
                  placeholder="e.g. Sierra Structured Tee"
                  required
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select value={form.category} onChange={set("category")}>
                  {CATEGORIES.filter((c) => c !== "All").map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Price ($)</label>
                <input
                  type="text"
                  value={form.price}
                  onChange={set("price")}
                  placeholder="e.g. $48"
                />
              </div>

              <div className="form-group">
                <label>Badge</label>
                <select value={form.badge} onChange={set("badge")}>
                  {BADGES.map((b) => (
                    <option key={b} value={b}>{b || "None"}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Rating</label>
                <select value={form.rating} onChange={set("rating")}>
                  {[5.0, 4.9, 4.8, 4.7, 4.6, 4.5, 4.4, 4.3, 4.2, 4.1, 4.0, 3.9, 3.8].map((r) => (
                    <option key={r} value={r}>{r.toFixed(1)}</option>
                  ))}
                </select>
              </div>

              <div className="form-group full-width">
                <label>Image URL</label>
                <input
                  type="text"
                  value={form.image}
                  onChange={set("image")}
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="form-group full-width">
                <label>Description</label>
                <textarea
                  value={form.description}
                  onChange={set("description")}
                  placeholder="Brief product description..."
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label>Colors</label>
                <div className="form-row">
                  <input
                    type="text"
                    value={colorInput}
                    onChange={(e) => setColorInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addColor())}
                    placeholder="e.g. Ivory"
                  />
                  <button type="button" className="btn btn-secondary" onClick={addColor}>
                    Add
                  </button>
                </div>
                {form.colors.length > 0 && (
                  <div className="tag-list">
                    {form.colors.map((c) => (
                      <span key={c} className="tag">
                        {c}
                        <span className="tag-remove" onClick={() => removeColor(c)}>×</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Sizes</label>
                <div className="form-row">
                  <input
                    type="text"
                    value={sizeInput}
                    onChange={(e) => setSizeInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSize())}
                    placeholder="e.g. M"
                  />
                  <button type="button" className="btn btn-secondary" onClick={addSize}>
                    Add
                  </button>
                </div>
                {form.sizes.length > 0 && (
                  <div className="tag-list">
                    {form.sizes.map((s) => (
                      <span key={s} className="tag">
                        {s}
                        <span className="tag-remove" onClick={() => removeSize(s)}>×</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {isEdit ? "Save Changes" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Confirm Delete Modal ─────────────────────────────────────────────
function ConfirmModal({ product, onConfirm, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal confirm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-body">
          <div className="confirm-icon">🗑</div>
          <h3>Delete Product</h3>
          <p>Are you sure you want to delete</p>
          <p className="confirm-product-name">{product?.name}?</p>
          <p>This action cannot be undone.</p>
          <div className="confirm-actions">
            <button className="btn-cancel" onClick={onClose}>Cancel</button>
            <button className="btn-delete" onClick={() => onConfirm(product.id)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────
const Dashboard = () => {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortField, setSortField] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = useMemo(() => {
    let list = [...products];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    if (category !== "All") {
      list = list.filter((p) => p.category === category);
    }
    list.sort((a, b) => {
      let va = a[sortField];
      let vb = b[sortField];
      if (typeof va === "string") va = va.toLowerCase();
      if (typeof vb === "string") vb = vb.toLowerCase();
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return list;
  }, [products, search, category, sortField, sortDir]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const handleSave = (product) => {
    setProducts((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = product;
        return next;
      }
      return [product, ...prev];
    });
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleteTarget(null);
  };

  const handleNew = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  // Stats
  const total = products.length;
  const avgRating = (products.reduce((s, p) => s + p.rating, 0) / total).toFixed(1);
  const topRated = products.filter((p) => p.rating >= 4.8).length;
  const revenue = products.reduce((s, p) => {
    const n = parseFloat(p.price.replace(/[^0-9.]/g, ""));
    return s + (isNaN(n) ? 0 : n);
  }, 0);

  const sortIcon = (field) => {
    if (sortField !== field) return "↕";
    return sortDir === "asc" ? "↑" : "↓";
  };

  const thClass = (field) =>
    `sortable${sortField === field ? ` sort-${sortDir}` : ""}`;

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>Product Dashboard</h1>
          <p>Manage your clothing inventory</p>
        </div>
        <div className="dashboard-actions">
          <button className="btn btn-primary" onClick={handleNew}>
            + New Product
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total">📦</div>
          <div className="stat-body">
            <div className="label">Total Products</div>
            <div className="value">{total}</div>
            <div className="sub">In catalog</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon active">✓</div>
          <div className="stat-body">
            <div className="label">Top Rated</div>
            <div className="value">{topRated}</div>
            <div className="sub">4.8+ rating</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon rating">★</div>
          <div className="stat-body">
            <div className="label">Avg Rating</div>
            <div className="value">{avgRating}</div>
            <div className="sub">Out of 5.0</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon revenue">$</div>
          <div className="stat-body">
            <div className="label">Total Revenue</div>
            <div className="value">${revenue.toFixed(0)}</div>
            <div className="sub">Full catalog</div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="search-input-wrap">
          <input
            type="text"
            placeholder="Search by name, description, or category..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <select
          value={category}
          onChange={(e) => { setCategory(e.target.value); setPage(1); }}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <span className="filter-count">
          {filtered.length} {filtered.length === 1 ? "product" : "products"}
        </span>
      </div>

      {/* Table */}
      <div className="table-card">
        {paginated.length > 0 ? (
          <>
            <table className="data-table">
              <thead>
                <tr>
                  <th className={thClass("name")} onClick={() => handleSort("name")}>
                    Product <span className="sort-icon">{sortIcon("name")}</span>
                  </th>
                  <th>Category</th>
                  <th>Badge</th>
                  <th className={thClass("price")} onClick={() => handleSort("price")}>
                    Price <span className="sort-icon">{sortIcon("price")}</span>
                  </th>
                  <th className={thClass("rating")} onClick={() => handleSort("rating")}>
                    Rating <span className="sort-icon">{sortIcon("rating")}</span>
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="table-product-cell">
                        <img
                          className="table-product-thumb"
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                        />
                        <div>
                          <div className="table-product-name">{product.name}</div>
                          <div className="table-product-meta">
                            {product.sizes.slice(0, 3).join(", ")}
                            {product.sizes.length > 3 && ` +${product.sizes.length - 3}`}
                            {" · "}
                            {product.colors.length} colors
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{product.category}</td>
                    <td>
                      {product.badge && (
                        <span className={`table-badge ${getBadgeClass(product.badge)}`}>
                          {product.badge}
                        </span>
                      )}
                    </td>
                    <td className="table-price">{product.price}</td>
                    <td>{renderStars(product.rating)}</td>
                    <td>
                      <div className="table-actions">
                        <button
                          className="action-btn"
                          onClick={() => handleEdit(product)}
                          title="Edit"
                        >
                          ✎
                        </button>
                        <button
                          className="action-btn delete"
                          onClick={() => setDeleteTarget(product)}
                          title="Delete"
                        >
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <span className="pagination-info">
                  Page {page} of {totalPages} — {filtered.length} products
                </span>
                <div className="pagination-controls">
                  <button
                    className="page-btn"
                    onClick={() => setPage(1)}
                    disabled={page === 1}
                  >
                    «
                  </button>
                  <button
                    className="page-btn"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    ‹
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                    .reduce((acc, p, i, arr) => {
                      if (i > 0 && arr[i - 1] !== p - 1) acc.push("...");
                      acc.push(p);
                      return acc;
                    }, [])
                    .map((p, i) =>
                      p === "..." ? (
                        <span key={`ellipsis-${i}`} className="page-btn" style={{ cursor: "default" }}>
                          …
                        </span>
                      ) : (
                        <button
                          key={p}
                          className={`page-btn${page === p ? " active" : ""}`}
                          onClick={() => setPage(p)}
                        >
                          {p}
                        </button>
                      )
                    )}
                  <button
                    className="page-btn"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  >
                    ›
                  </button>
                  <button
                    className="page-btn"
                    onClick={() => setPage(totalPages)}
                    disabled={page === totalPages}
                  >
                    »
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3>No products found</h3>
            <p>
              {search
                ? `No results for "${search}" in ${category !== "All" ? category : "all categories"}.`
                : `No products in ${category !== "All" ? category : "the catalog"} yet.`}
            </p>
            <button className="btn btn-primary" onClick={handleNew}>
              + Add First Product
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {showModal && (
        <ProductModal
          product={editingProduct}
          onSave={handleSave}
          onClose={() => { setShowModal(false); setEditingProduct(null); }}
        />
      )}
      {deleteTarget && (
        <ConfirmModal
          product={deleteTarget}
          onConfirm={handleDelete}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
