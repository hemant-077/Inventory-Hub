import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Nav from "./Nav";
import { productContext } from "../Utils/Context";
import Loading from "./Loading";

const Home = () => {
  const [products] = useContext(productContext);
  const { search } = useLocation();

  const selectedCategory = useMemo(() => {
    const params = new URLSearchParams(search);
    return params.get("category") || "all";
  }, [search]);

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (!products) {
      return;
    }

    if (selectedCategory === "all") {
      setFilteredProducts(products);
      return;
    }

    setFilteredProducts(products.filter((product) => product.category === selectedCategory));
  }, [products, selectedCategory]);

  if (!products) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen w-full md:flex">
      <Nav />

      <section className="w-full px-5 pb-6 pt-5 md:w-[calc(100%-18rem)] md:px-8 md:pb-8 md:pt-7">
        <div className="surface-card mb-6 p-5 md:p-6">
          <h1 className="section-title">Inventory Dashboard</h1>
          <p className="section-copy">
            {selectedCategory === "all"
              ? "Tracking all products in your catalog."
              : `Showing items from the "${selectedCategory}" category.`}
          </p>
          <p className="mt-3 text-sm font-semibold text-sky-300">
            {filteredProducts.length} products visible
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/details/${product.id}`}
              className="group rounded-2xl border border-slate-800/90 bg-[rgba(11,19,33,0.9)] p-4 shadow-[0_18px_40px_-30px_rgba(8,47,73,0.9)] transition hover:-translate-y-0.5 hover:border-sky-400/40 hover:bg-[rgba(16,28,45,0.96)]"
            >
              <div className="mb-4 flex h-52 items-center justify-center rounded-xl border border-slate-700/50 bg-[rgba(9,15,28,0.95)] p-3">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.02]"
                />
              </div>

              <div className="space-y-2">
                <h2 className="min-h-[3.25rem] text-[0.95rem] font-semibold leading-snug text-slate-100">
                  {product.title}
                </h2>
                <p className="text-xs uppercase tracking-wider text-slate-500">{product.category}</p>
                <p className="text-lg font-bold text-emerald-400">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
