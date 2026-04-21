import { useContext, useMemo } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { productContext } from "../Utils/Context";

const getCategoryAccent = (category) => {
  const chars = [...category];
  const hash = chars.reduce((acc, char) => acc + char.charCodeAt(0) * 7, 0);
  return `hsl(${hash % 360} 76% 62%)`;
};

const Nav = () => {
  const [products] = useContext(productContext);
  const { search } = useLocation();

  const currentCategory = useMemo(() => {
    const params = new URLSearchParams(search);
    return params.get("category") || "all";
  }, [search]);

  const categories = useMemo(() => {
    if (!products) {
      return [];
    }

    return [...new Set(products.map((product) => product.category))];
  }, [products]);

  return (
    <aside className="w-full border-b border-slate-800/70 bg-[rgba(7,12,22,0.78)] p-5 backdrop-blur-xl md:min-h-screen md:w-72 md:border-b-0 md:border-r">
      <div className="mx-auto w-full max-w-5xl space-y-6 md:max-w-none">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight text-slate-100">Inventory Hub</h2>

          <NavLink
            to="/create"
            className={({ isActive }) =>
              `btn-primary w-full ${isActive ? "ring-2 ring-sky-300/40" : ""}`
            }
          >
            Add New Product
          </NavLink>
        </div>

        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Categories</p>

          <div className="max-h-[46vh] space-y-2 overflow-y-auto pr-1 md:max-h-[62vh]">
            <Link
              to="/"
              className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
                currentCategory === "all"
                  ? "border-sky-400/50 bg-sky-500/10 text-sky-100"
                  : "border-slate-700/60 bg-slate-900/35 text-slate-300 hover:border-slate-600 hover:bg-slate-800/45"
              }`}
            >
              <span className="h-2.5 w-2.5 rounded-full bg-slate-200/70"></span>
              All Products
            </Link>

            {categories.map((category) => (
              <Link
                key={category}
                to={`/?category=${encodeURIComponent(category)}`}
                className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
                  currentCategory === category
                    ? "border-sky-400/50 bg-sky-500/10 text-sky-100"
                    : "border-slate-700/60 bg-slate-900/35 text-slate-300 hover:border-slate-600 hover:bg-slate-800/45"
                }`}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: getCategoryAccent(category) }}
                ></span>
                <span className="truncate capitalize">{category}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Nav;
